import mongoose from "mongoose";

const judgeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    specialty: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      default: 5.0,
    },
    reviews: {
      type: String,
      default: "100+",
    },
    nextClass: {
      type: String,
      default: "",
    },
    price: {
      type: String,
      default: "₹ 299",
    },
    imageUrl: {
      type: String,
      default: "",
    },
    bio: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

export const Judge = mongoose.model("Judge", judgeSchema);
