import mongoose from "mongoose";

const registrationSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    contestId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Competition",
      required: true,
      index: true,
    },
    status: {
      type: String,
      enum: ["Registered", "Upcoming", "Submitted", "Completed"],
      default: "Registered",
    },
    slotNumber: {
      type: Number,
      default: 1,
    },
    registeredAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

// Prevent duplicate registration and speed up lookups
registrationSchema.index({ userId: 1, contestId: 1 }, { unique: true });

export const Registration = mongoose.model("Registration", registrationSchema);
