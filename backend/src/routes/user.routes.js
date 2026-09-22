import { Router } from "express";
import {
  getUserProfile,
  updateUserProfile,
  getUserCompetitions,
  getUserAchievements,
  getUserWallet,
  getActiveRegistration,
} from "../controllers/user.controller.js";

const router = Router();

router.route("/profile").get(getUserProfile).put(updateUserProfile);
router.route("/active-registration").get(getActiveRegistration);
router.route("/my-competitions").get(getUserCompetitions);
router.route("/achievements").get(getUserAchievements);
router.route("/wallet").get(getUserWallet);

export default router;
