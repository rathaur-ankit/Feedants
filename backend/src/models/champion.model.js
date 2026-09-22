import mongoose from "mongoose";

const championSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    prize: {
      type: String,
      required: true,
    },
    place: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
      required: true,
    },
    rank: {
      type: Number,
      default: 1,
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Champion = mongoose.model("Champion", championSchema);
