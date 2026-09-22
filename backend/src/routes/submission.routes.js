import { Router } from "express";
import {
  createSubmission,
  getTrendingSubmissions,
  getSubmissionsByContest,
  voteSubmission,
} from "../controllers/submission.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { cacheMiddleware } from "../middlewares/cache.middleware.js";
import { uploadLimiter } from "../middlewares/rateLimiter.middleware.js";

const router = Router();

// Read routes (cached)
router.route("/trending").get(cacheMiddleware(15), getTrendingSubmissions);
router.route("/contest/:contestId").get(cacheMiddleware(15), getSubmissionsByContest);

// Upload submission (multer file upload + rate limiter)
router.route("/").post(
  uploadLimiter,
  upload.single("media"),
  createSubmission
);

// High-speed atomic voting
router.route("/:id/vote").post(voteSubmission);

export default router;
