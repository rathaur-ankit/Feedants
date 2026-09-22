import mongoose from "mongoose";

const leaderboardSchema = new mongoose.Schema(
  {
    rank: {
      type: Number,
      required: true,
      unique: true,
      index: true,
    },
    name: {
      type: String,
      required: true,
    },
    points: {
      type: String,
      required: true,
    },
    wins: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const Leaderboard = mongoose.model("Leaderboard", leaderboardSchema);
