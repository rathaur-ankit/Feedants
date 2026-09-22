import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { Submission } from "../models/submission.model.js";
import { Competition } from "../models/competition.model.js";
import { Registration } from "../models/registration.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { clearCache } from "../middlewares/cache.middleware.js";

// @desc    Upload & submit new performance / video / artwork
// @route   POST /api/v1/submissions
// @access  Public
export const createSubmission = asyncHandler(async (req, res) => {
  const {
    contestId,
    userId,
    title,
    description,
    mediaType = "video",
    performerName,
    mediaUrl: directMediaUrl,
  } = req.body;

  if (!title || !title.trim()) {
    throw new ApiError(400, "Submission title is required");
  }

  let finalMediaUrl = directMediaUrl;

  // If a file was uploaded via multer, send to Cloudinary
  if (req.file) {
    const cloudinaryResult = await uploadOnCloudinary(req.file.path);
    if (!cloudinaryResult) {
      throw new ApiError(500, "Failed to upload media file to Cloudinary");
    }
    finalMediaUrl = cloudinaryResult.secure_url;
  }

  if (!finalMediaUrl) {
    throw new ApiError(400, "Media file or mediaUrl is required");
  }

  // Verify contest exists
  let targetContest = null;
  if (contestId && contestId.match(/^[0-9a-fA-F]{24}$/)) {
    targetContest = await Competition.findById(contestId).lean();
  } else if (contestId) {
    targetContest = await Competition.findOne({ title: contestId }).lean();
  }

  const submission = await Submission.create({
    contestId: targetContest ? targetContest._id : "65f000000000000000000001",
    userId: userId || null,
    title: title.trim(),
    description: description || "",
    mediaUrl: finalMediaUrl,
    mediaType: mediaType || "video",
    thumbnailUrl:
      mediaType === "video"
        ? finalMediaUrl.replace(/\.[^/.]+$/, ".jpg")
        : finalMediaUrl,
    duration: "02:30",
    views: 1,
    votes: 0,
    judgeScore: "0.0",
    performer: {
      name: performerName || "Aryan Sharma",
      contest: targetContest ? targetContest.title : "Feedants Competition",
      avatarUrl:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuCPyEghipDY2H3PU-RCFSh1KfCnHFGT1-hM6DKy-TFJ6d2qKYKN9zzz2nm9b9kJ8aUnAZONCk8hP6W6dLsryZwvrGeSCeuof8u54w0cOFgid5EfpXUaAW3wrLyIXrVE1ijTAEujE90IX77BhqkqagFO7q3I68uEWiVCIOy-mPdCFV-OJprz0Ha_5TfD5KYlglLJwaD6K_WZKnpdnAZD08CSNIoUqsPzuVKa7tNJpDwTGy3pjbevtVY0",
    },
    status: "approved",
  });

  // Update registration status if user had registered
  if (userId && targetContest) {
    await Registration.findOneAndUpdate(
      { userId, contestId: targetContest._id },
      { status: "Submitted" }
    );
  }

  clearCache("submissions");
  clearCache("explore");

  return res.status(201).json(
    new ApiResponse(201, "Submission uploaded successfully", submission)
  );
});

// @desc    Get trending submissions (videos/artwork) for Explore & Spotlight
// @route   GET /api/v1/submissions/trending
// @access  Public
export const getTrendingSubmissions = asyncHandler(async (req, res) => {
  const { limit = 10 } = req.query;
  const limitNum = Math.min(50, Math.max(1, parseInt(limit, 10)));

  const trending = await Submission.find({ status: "approved" })
    .sort({ votes: -1, views: -1, createdAt: -1 })
    .limit(limitNum)
    .lean()
    .exec();

  return res.status(200).json(
    new ApiResponse(200, "Trending submissions fetched successfully", trending)
  );
});

// @desc    Get submissions for a specific contest
// @route   GET /api/v1/submissions/contest/:contestId
// @access  Public
export const getSubmissionsByContest = asyncHandler(async (req, res) => {
  const { contestId } = req.params;
  const { page = 1, limit = 20 } = req.query;

  const pageNum = Math.max(1, parseInt(page, 10));
  const limitNum = Math.min(50, Math.max(1, parseInt(limit, 10)));
  const skip = (pageNum - 1) * limitNum;

  const [submissions, total] = await Promise.all([
    Submission.find({ contestId, status: "approved" })
      .sort("-votes")
      .skip(skip)
      .limit(limitNum)
      .lean()
      .exec(),
    Submission.countDocuments({ contestId, status: "approved" }),
  ]);

  return res.status(200).json(
    new ApiResponse(200, "Contest submissions fetched successfully", {
      submissions,
      pagination: {
        page: pageNum,
        limit: limitNum,
        total,
        totalPages: Math.ceil(total / limitNum),
      },
    })
  );
});

// @desc    Live vote for a submission
// @route   POST /api/v1/submissions/:id/vote
// @access  Public
export const voteSubmission = asyncHandler(async (req, res) => {
  const { id } = req.params;

  // High-throughput atomic vote increment
  const updatedSubmission = await Submission.findByIdAndUpdate(
    id,
    { $inc: { votes: 1 } },
    { new: true }
  )
    .select("title votes performer")
    .lean();

  if (!updatedSubmission) {
    throw new ApiError(404, "Submission not found");
  }

  return res.status(200).json(
    new ApiResponse(200, "Vote recorded successfully", {
      id: updatedSubmission._id,
      votes: updatedSubmission.votes,
    })
  );
});
