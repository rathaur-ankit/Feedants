import { Router } from "express";
import {
  getCompetitions,
  getMegaContest,
  getCategories,
  getCompetitionById,
  joinCompetition,
  createCompetition,
} from "../controllers/competition.controller.js";
import { cacheMiddleware } from "../middlewares/cache.middleware.js";

const router = Router();

// Public read routes with in-memory caching for 10k concurrency
router.route("/").get(cacheMiddleware(15), getCompetitions);
router.route("/mega").get(cacheMiddleware(30), getMegaContest);
router.route("/categories").get(cacheMiddleware(60), getCategories);
router.route("/:id").get(cacheMiddleware(15), getCompetitionById);

// Write actions
router.route("/:id/join").post(joinCompetition);
router.route("/").post(createCompetition);

export default router;
