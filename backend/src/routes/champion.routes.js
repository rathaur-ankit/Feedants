import { Router } from "express";
import { getChampions } from "../controllers/champion.controller.js";
import { cacheMiddleware } from "../middlewares/cache.middleware.js";

const router = Router();

router.route("/").get(cacheMiddleware(60), getChampions);

export default router;
