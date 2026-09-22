import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      index: true,
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      sparse: true,
      index: true,
    },
    password: {
      type: String,
    },
    avatarUrl: {
      type: String,
      default:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuCPyEghipDY2H3PU-RCFSh1KfCnHFGT1-hM6DKy-TFJ6d2qKYKN9zzz2nm9b9kJ8aUnAZONCk8hP6W6dLsryZwvrGeSCeuof8u54w0cOFgid5EfpXUaAW3wrLyIXrVE1ijTAEujE90IX77BhqkqagFO7q3I68uEWiVCIOy-mPdCFV-OJprz0Ha_5TfD5KYlglLJwaD6K_WZKnpdnAZD08CSNIoUqsPzuVKa7tNJpDwTGy3pjbevtVY0",
    },
    isVerified: {
      type: Boolean,
      default: true,
    },
    tags: {
      type: [String],
      default: ["Verified Creator", "Kathak Enthusiast"],
    },
    stats: {
      contestsJoined: { type: Number, default: 12 },
      podiumsWon: { type: Number, default: 3 },
      totalEarnings: { type: String, default: "₹4,850" },
    },
    wallet: {
      balance: { type: String, default: "₹1,250" },
      status: { type: String, default: "Available" },
    },
    referralLink: {
      type: String,
      default: "feedants.com/r/aryan921",
    },
    referralFullLink: {
      type: String,
      default: "https://feedants.com/r/referral123",
    },
    refreshToken: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export const User = mongoose.model("User", userSchema);
