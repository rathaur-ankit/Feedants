import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { Champion } from "../models/champion.model.js";

// @desc    Get Hall of Champions list
// @route   GET /api/v1/champions
// @access  Public
export const getChampions = asyncHandler(async (req, res) => {
  const champions = await Champion.find()
    .sort("rank")
    .lean()
    .exec();

  const fallbackChampions = champions.length > 0 ? champions : [
    {
      id: "1",
      name: "Riya Shah",
      prize: "Won ₹15,000",
      place: "🥇 1st Place",
      imageUrl:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuCCjzeGz7hsLd3IItk15TSREWuhzah2tRvJRP2I54h_AhDIwQ70fu5Tdzh1VRiQS6FatDd5-FbY4DinO1ZbLsEJbOW9DfcEJ0cMi6OR-jH76QS4vh9tzi0AelZ--PMZvwYqdqKXaY1YVfIW5WvIug9eAtwCHuGbQ2ZxX6_103rkQLwaAGs8utuR332W-JbTf4722d986rPyP2VYRJ47zRepVrtfEZk3E4EmdNtn4S-zuhWnc39Kt859",
    },
    {
      id: "2",
      name: "Aarav Mehta",
      prize: "Won ₹8,000",
      place: "🥈 2nd Place",
      imageUrl:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuCjhSeupYfyq1KYlfubPfNh1I4Xsu-qAGaIUShZrrGAP6D1u9wNRf2BS2JtBUxrz26eXfmgx0Xy4yv00BJ0u8KqAT1MhLlNjz4kPuDXw1lLQeMnnfP9C-n1d57kpw9Nfve4pR_ZJXkYEz8IMzKzFOnzUKoX9Tp6LRfzd4HZBAc_CJWex4EgbDGhB-NaSo3B8ek3nBI7-vHU3K6QPVJCp7ALSZVu8HPVgdUeQ3iVaE6uFmlD148JMEIc",
    },
    {
      id: "3",
      name: "Neha Verma",
      prize: "Won ₹5,000",
      place: "🥉 3rd Place",
      imageUrl:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuAORSgx45RDgyfd6aI5bOFMst-4DAQVH3gWab6QKYw0_xHAHiWZEhr4zATotRert1I_mmhL2PCy_GQM2tEWmrzCXMpKysBDEh-Nq9hGKexdC6eQeAtlHhTUqro3YEz7GYc6lAnCgnYaeB0CHHEgAk5cARh2el0ojWz96vjPMkxPdsRe_yxBjAkrt1dRWv6_cvq6vCxnB6gXGHIZgMpP_cVwZHW2BD_00uZixI7zwiqRjQUMKV_scQVY",
    },
  ];

  return res.status(200).json(
    new ApiResponse(200, "Champions fetched successfully", fallbackChampions)
  );
});
