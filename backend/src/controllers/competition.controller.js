import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { Competition } from "../models/competition.model.js";
import { Category } from "../models/category.model.js";
import { Registration } from "../models/registration.model.js";
import { clearCache } from "../middlewares/cache.middleware.js";

// @desc    Get all competitions with filtering, search, and pagination
// @route   GET /api/v1/competitions
// @access  Public
export const getCompetitions = asyncHandler(async (req, res) => {
  const {
    category,
    status,
    search,
    page = 1,
    limit = 20,
    sort = "-createdAt",
  } = req.query;

  const query = {};

  // Category filter
  if (category && category !== "All") {
    query.category = { $regex: new RegExp(category, "i") };
  }

  // Status filter (live, upcoming, registered, ended)
  if (status && status !== "all") {
    if (status === "live") {
      query.spotsLeft = { $lte: 30 };
    } else if (status === "upcoming") {
      query.spotsLeft = { $gt: 30 };
    } else {
      query.status = status;
    }
  }

  // Text search on title, tags, or judge name
  if (search) {
    query.$or = [
      { title: { $regex: search, $options: "i" } },
      { "judge.name": { $regex: search, $options: "i" } },
      { "tags.label": { $regex: search, $options: "i" } },
    ];
  }

  const pageNum = Math.max(1, parseInt(page, 10));
  const limitNum = Math.min(100, Math.max(1, parseInt(limit, 10)));
  const skip = (pageNum - 1) * limitNum;

  // High-performance lean query for 10k concurrency
  const [competitions, total] = await Promise.all([
    Competition.find(query)
      .sort(sort)
      .skip(skip)
      .limit(limitNum)
      .lean()
      .exec(),
    Competition.countDocuments(query),
  ]);

  return res.status(200).json(
    new ApiResponse(200, "Competitions fetched successfully", {
      competitions,
      pagination: {
        page: pageNum,
        limit: limitNum,
        total,
        totalPages: Math.ceil(total / limitNum),
      },
    })
  );
});

// @desc    Get Mega Contest banner data
// @route   GET /api/v1/competitions/mega
// @access  Public
export const getMegaContest = asyncHandler(async (req, res) => {
  const megaContest = await Competition.findOne({ isMegaContest: true })
    .lean()
    .exec();

  if (!megaContest) {
    // Fallback default mega contest if not in DB yet
    return res.status(200).json(
      new ApiResponse(200, "Mega contest retrieved", {
        title: "Feedants Classical Dance Championship 2026",
        description:
          "National jury adjudication, verified certificates & live grand finale showcase.",
        prizePool: "₹50,000",
        endsIn: "2 days",
      })
    );
  }

  return res.status(200).json(
    new ApiResponse(200, "Mega contest fetched successfully", {
      id: megaContest._id,
      title: megaContest.title,
      description: megaContest.description,
      prizePool: megaContest.prizePool,
      endsIn: "2 days",
      entryFee: megaContest.entryFee,
      judge: megaContest.judge,
    })
  );
});

// @desc    Get all categories with active status and liveCount
// @route   GET /api/v1/competitions/categories
// @access  Public
export const getCategories = asyncHandler(async (req, res) => {
  const categories = await Category.find()
    .sort("order")
    .lean()
    .exec();

  return res.status(200).json(
    new ApiResponse(200, "Categories fetched successfully", categories)
  );
});

// @desc    Get single competition by ID
// @route   GET /api/v1/competitions/:id
// @access  Public
export const getCompetitionById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  let competition = null;
  // Support either ObjectId or search by title
  if (id.match(/^[0-9a-fA-F]{24}$/)) {
    competition = await Competition.findById(id).lean().exec();
  } else {
    competition = await Competition.findOne({
      title: { $regex: new RegExp(id, "i") },
    })
      .lean()
      .exec();
  }

  if (!competition) {
    throw new ApiError(404, `Competition with id '${id}' not found`);
  }

  return res.status(200).json(
    new ApiResponse(200, "Competition details fetched successfully", competition)
  );
});

// @desc    Join / Register for a competition
// @route   POST /api/v1/competitions/:id/join
// @access  Public (or Protected)
export const joinCompetition = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { userId } = req.body;

  const competition = await Competition.findById(id);
  if (!competition) {
    throw new ApiError(404, "Competition not found");
  }

  if (competition.spotsLeft <= 0) {
    throw new ApiError(400, "Contest is already full! No spots left.");
  }

  // Atomic spot reduction to handle race conditions under 10k concurrent registrations
  const updatedComp = await Competition.findOneAndUpdate(
    { _id: id, spotsLeft: { $gt: 0 } },
    {
      $inc: { spotsLeft: -1, enrolled: 1 },
      $set: {
        urgency: competition.spotsLeft - 1 <= 5 ? "critical" : competition.urgency,
      },
    },
    { new: true }
  );

  if (!updatedComp) {
    throw new ApiError(400, "Sorry, someone just took the last spot!");
  }

  // Record registration if userId provided
  let registration = null;
  if (userId) {
    registration = await Registration.findOneAndUpdate(
      { userId, contestId: id },
      {
        userId,
        contestId: id,
        status: "Registered",
        slotNumber: updatedComp.enrolled,
        registeredAt: new Date(),
      },
      { upsert: true, new: true }
    );
  }

  clearCache("competitions");

  return res.status(200).json(
    new ApiResponse(200, "Successfully joined competition!", {
      competition: updatedComp,
      registration,
    })
  );
});

// @desc    Create a new competition (Host/Admin)
// @route   POST /api/v1/competitions
// @access  Public / Admin
export const createCompetition = asyncHandler(async (req, res) => {
  const {
    title,
    description,
    category,
    tags,
    prizePool,
    entryFee,
    totalSpots,
    judge,
    dates,
    rewards,
    aboutText,
    rules,
    isMegaContest,
  } = req.body;

  if (!title || !category || !prizePool) {
    throw new ApiError(400, "Title, category, and prize pool are required");
  }

  const spots = totalSpots || 20;

  const competition = await Competition.create({
    title,
    description: description || "",
    category,
    tags: tags || [{ label: "New", type: "default" }],
    prizePool,
    entryFee: entryFee || "₹99",
    totalSpots: spots,
    spotsLeft: spots,
    enrolled: 0,
    judge: judge || { name: "Guest Judge", role: "Adjudicator" },
    dates: dates || [],
    rewards: rewards || [],
    aboutText: aboutText || "",
    rules: rules || [],
    isMegaContest: Boolean(isMegaContest),
  });

  clearCache("competitions");

  return res.status(201).json(
    new ApiResponse(201, "Competition created successfully", competition)
  );
});
