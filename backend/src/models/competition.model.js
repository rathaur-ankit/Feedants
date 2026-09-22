import mongoose from "mongoose";

const tagSchema = new mongoose.Schema(
  {
    label: { type: String, required: true },
    type: {
      type: String,
      enum: ["hot", "fast", "default"],
      default: "default",
    },
  },
  { _id: false }
);

const judgeSubSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    role: { type: String, default: "Head Adjudicator" },
    title: { type: String, default: "Professional Artist" },
    experience: { type: String, default: "10+ Years of Experience" },
    avatarUrl: { type: String },
    introVideoUrl: { type: String, default: "" },
  },
  { _id: false }
);

const dateItemSchema = new mongoose.Schema(
  {
    label: { type: String, required: true },
    date: { type: String, required: true },
    time: { type: String, required: true },
  },
  { _id: false }
);

const rewardSchema = new mongoose.Schema(
  {
    position: { type: String, required: true },
    emoji: { type: String, default: "🏆" },
    amount: { type: String, required: true },
  },
  { _id: false }
);

const winnerSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    position: { type: String, required: true },
    imageUrl: { type: String, required: true },
  },
  { _id: false }
);

const competitionSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    description: {
      type: String,
      default: "",
    },
    category: {
      type: String,
      required: true,
      index: true,
    },
    tags: [tagSchema],
    prizePool: {
      type: String,
      required: true,
      default: "₹25,000",
    },
    entryFee: {
      type: String,
      required: true,
      default: "₹99",
    },
    spotsLeft: {
      type: Number,
      required: true,
      default: 20,
    },
    totalSpots: {
      type: Number,
      required: true,
      default: 20,
    },
    enrolled: {
      type: Number,
      default: 0,
    },
    urgency: {
      type: String,
      enum: ["normal", "critical"],
      default: "normal",
    },
    isMegaContest: {
      type: Boolean,
      default: false,
      index: true,
    },
    status: {
      type: String,
      enum: ["upcoming", "live", "registered", "ended"],
      default: "live",
      index: true,
    },
    judge: judgeSubSchema,
    countdown: {
      type: String,
      default: "01d : 06h : 28m : 32s",
    },
    certificateNote: {
      type: String,
      default: "Winners get certificate",
    },
    dates: [dateItemSchema],
    previousWinners: [winnerSchema],
    aboutText: {
      type: String,
      default:
        "This is an online competition open for all age groups. Participate from anywhere and showcase your talent.",
    },
    rules: {
      type: [String],
      default: [
        "Video length should be between 1 to 5 minutes.",
        "Clear audio and video resolution required.",
        "Original performance without copyright issues.",
      ],
    },
    rewards: [rewardSchema],
  },
  {
    timestamps: true,
  }
);

// High-speed compound indexes for 10k concurrent queries
competitionSchema.index({ status: 1, category: 1 });
competitionSchema.index({ title: "text", category: "text" });

export const Competition = mongoose.model("Competition", competitionSchema);
