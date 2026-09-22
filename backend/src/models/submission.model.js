import mongoose from "mongoose";

const submissionSchema = new mongoose.Schema(
  {
    contestId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Competition",
      required: true,
      index: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      index: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    subtitle: {
      type: String,
      default: "",
    },
    description: {
      type: String,
      default: "",
    },
    mediaUrl: {
      type: String,
      required: true,
    },
    mediaType: {
      type: String,
      enum: ["image", "video"],
      default: "video",
    },
    thumbnailUrl: {
      type: String,
      default: "",
    },
    duration: {
      type: String,
      default: "02:30",
    },
    views: {
      type: Number,
      default: 0,
    },
    votes: {
      type: Number,
      default: 0,
      index: true,
    },
    judgeScore: {
      type: String,
      default: "4.5",
    },
    performer: {
      name: { type: String, required: true },
      contest: { type: String, default: "" },
      avatarUrl: { type: String, default: "" },
    },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "approved",
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

// High-speed compound index for trending queries
submissionSchema.index({ status: 1, votes: -1 });
submissionSchema.index({ contestId: 1, createdAt: -1 });

export const Submission = mongoose.model("Submission", submissionSchema);
