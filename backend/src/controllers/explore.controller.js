import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { Judge } from "../models/judge.model.js";
import { Category } from "../models/category.model.js";
import { Submission } from "../models/submission.model.js";
import { Leaderboard } from "../models/leaderboard.model.js";

// @desc    Get aggregated Explore screen data directly from MongoDB
// @route   GET /api/v1/explore
// @access  Public
export const getExploreData = asyncHandler(async (req, res) => {
  const [judges, categories, trendingSubmissions, leaderboard] = await Promise.all([
    Judge.find().lean().exec(),
    Category.find().sort("order").lean().exec(),
    Submission.find({ status: "approved" })
      .sort({ votes: -1 })
      .limit(6)
      .lean()
      .exec(),
    Leaderboard.find().sort("rank").lean().exec(),
  ]);

  const exploreFilters = [
    { id: "1", label: "All Talents", isActive: true },
    { id: "2", label: "Trending Videos", isActive: false },
    { id: "3", label: "Top Judges", isActive: false },
    { id: "4", label: "Rising Stars", isActive: false },
    { id: "5", label: "Workshops", isActive: false },
  ];

  return res.status(200).json(
    new ApiResponse(200, "Explore data fetched from database", {
      filters: exploreFilters,
      judgesMasterclass: judges,
      popularCategories: categories,
      leaderboard,
      trendingSubmissions,
    })
  );
});

// @desc    Get Judges Masterclass list from database
// @route   GET /api/v1/explore/judges
// @access  Public
export const getJudges = asyncHandler(async (req, res) => {
  const judges = await Judge.find().lean().exec();
  return res.status(200).json(
    new ApiResponse(200, "Judges fetched from database", judges)
  );
});

// @desc    Get Monthly Leaderboard from database
// @route   GET /api/v1/explore/leaderboard
// @access  Public
export const getLeaderboard = asyncHandler(async (req, res) => {
  const leaderboard = await Leaderboard.find().sort("rank").lean().exec();

  return res.status(200).json(
    new ApiResponse(200, "Leaderboard fetched from database", leaderboard)
  );
});
