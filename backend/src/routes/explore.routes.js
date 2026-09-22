import { Router } from "express";
import {
  getExploreData,
  getJudges,
  getLeaderboard,
} from "../controllers/explore.controller.js";
import { cacheMiddleware } from "../middlewares/cache.middleware.js";

const router = Router();

router.route("/").get(cacheMiddleware(20), getExploreData);
router.route("/judges").get(cacheMiddleware(60), getJudges);
router.route("/leaderboard").get(cacheMiddleware(30), getLeaderboard);

export default router;
