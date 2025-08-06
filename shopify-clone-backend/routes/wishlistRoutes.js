import express from "express";
import {
  addToWishlist,
  removeFromWishlist,
  getWishlist,
} from "../controllers/wishlistController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.route("/").get(protect, getWishlist).post(protect, addToWishlist);
router.route("/:productId").delete(protect, removeFromWishlist);

export default router;
