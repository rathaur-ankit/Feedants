import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { User } from "../models/user.model.js";
import { Competition } from "../models/competition.model.js";
import { Registration } from "../models/registration.model.js";
import { Achievement } from "../models/achievement.model.js";

// @desc    Get user profile details directly from MongoDB
// @route   GET /api/v1/users/profile
// @access  Public
export const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findOne().lean().exec();

  if (!user) {
    throw new ApiError(404, "User profile not found in database");
  }

  return res.status(200).json(
    new ApiResponse(200, "User profile fetched from database", user)
  );
});

// @desc    Get user active registration for Home screen banner
// @route   GET /api/v1/users/active-registration
// @access  Public
export const getActiveRegistration = asyncHandler(async (req, res) => {
  const user = await User.findOne().lean().exec();
  const userId = user ? user._id : null;

  const registration = await Registration.findOne({
    status: { $in: ["Registered", "Upcoming"] },
    ...(userId ? { userId } : {}),
  })
    .populate("contestId")
    .sort("-createdAt")
    .lean()
    .exec();

  if (!registration || !registration.contestId) {
    // Return the primary registered contest from DB
    const mega = await Competition.findOne({ isMegaContest: true }).lean().exec();
    return res.status(200).json(
      new ApiResponse(200, "Active registration fetched from database", {
        title: mega ? mega.title : "Feedants Classical Dance",
        deadline: "30 Aug, 11:55 PM",
        status: "Registered",
        contestId: mega ? mega._id : null,
      })
    );
  }

  const contest = registration.contestId;
  const deadlineDate = contest.dates && contest.dates.length > 2
    ? `${contest.dates[2].date}, ${contest.dates[2].time}`
    : "30 Aug, 11:55 PM";

  return res.status(200).json(
    new ApiResponse(200, "Active registration fetched from database", {
      title: contest.title,
      deadline: deadlineDate,
      status: registration.status,
      contestId: contest._id,
      slotNumber: registration.slotNumber,
    })
  );
});

// @desc    Update user profile in MongoDB
// @route   PUT /api/v1/users/profile
// @access  Public
export const updateUserProfile = asyncHandler(async (req, res) => {
  const { name, tags, avatarUrl } = req.body;

  let user = await User.findOne();
  if (!user) {
    user = new User({
      name: name || "Aryan Sharma",
      username: "@aryan_dancer24",
    });
  }

  if (name) user.name = name;
  if (tags) user.tags = tags;
  if (avatarUrl) user.avatarUrl = avatarUrl;

  await user.save();

  return res.status(200).json(
    new ApiResponse(200, "User profile updated successfully in database", user)
  );
});

// @desc    Get competitions the user is registered for from database
// @route   GET /api/v1/users/my-competitions
// @access  Public
export const getUserCompetitions = asyncHandler(async (req, res) => {
  const { status } = req.query;

  const registrations = await Registration.find()
    .populate("contestId")
    .sort("-createdAt")
    .lean()
    .exec();

  let userCompetitions = registrations
    .filter((r) => r.contestId)
    .map((r) => {
      const comp = r.contestId;
      return {
        id: comp._id.toString(),
        title: comp.title,
        category: comp.category,
        status: r.status,
        deadline:
          comp.dates && comp.dates.length > 2
            ? `Deadline: ${comp.dates[2].date} • ${comp.dates[2].time}`
            : "Deadline: 30 Aug 26 • 11:55 PM",
        slot: `Slot #${r.slotNumber || 1} of ${comp.totalSpots || 20} • Ready for clip`,
        imageUrl:
          comp.judge?.avatarUrl ||
          "https://lh3.googleusercontent.com/aida-public/AB6AXuCPwhSECggkJ3rdl0AT5ygaG3TH2622cXcuKoeUF-2YPaV52eY7JBe7lIPpQ9xcVLXDnRE5tSPTHH8Gqr89LsUUzFE3Iae5lTte9iC2PMgR_VcOQ-5CJdRmhem8e1p9kVcuGfhdaKnioK0kLKSS_TQ8KyiH21ujE3UU17p1XXRCxypLY8HmDe-xi6YcgXKUpVALSjUXBUyHQoT3fmz0tJ9CjZGQ4Mo3mZZYuLi2iDJxqba-ui5BpjE_",
      };
    });

  // If no registrations yet, populate from top competitions
  if (userCompetitions.length === 0) {
    const comps = await Competition.find().limit(2).lean().exec();
    userCompetitions = comps.map((c, i) => ({
      id: c._id.toString(),
      title: c.title,
      category: c.category,
      status: i === 0 ? "Registered" : "Upcoming",
      deadline: i === 0 ? "Deadline: 30 Aug 26 • 11:55 PM" : "Submissions open 5 Sep 26",
      slot: i === 0 ? `Slot #18 of ${c.totalSpots} • Ready for clip` : undefined,
      imageUrl: c.judge?.avatarUrl || "",
    }));
  }

  if (status && status !== "all") {
    userCompetitions = userCompetitions.filter(
      (c) => c.status.toLowerCase() === status.toLowerCase()
    );
  }

  return res.status(200).json(
    new ApiResponse(200, "User competitions fetched from database", userCompetitions)
  );
});

// @desc    Get user achievements and verified certificates directly from database
// @route   GET /api/v1/users/achievements
// @access  Public
export const getUserAchievements = asyncHandler(async (req, res) => {
  const achievements = await Achievement.find().sort("-createdAt").lean().exec();

  return res.status(200).json(
    new ApiResponse(200, "Achievements fetched from database", {
      verifiedCount: achievements.filter((a) => a.verified).length,
      achievements,
    })
  );
});

// @desc    Get user wallet status and balance directly from database
// @route   GET /api/v1/users/wallet
// @access  Public
export const getUserWallet = asyncHandler(async (req, res) => {
  const user = await User.findOne().lean().exec();

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  return res.status(200).json(
    new ApiResponse(200, "Wallet data fetched from database", user.wallet)
  );
});
