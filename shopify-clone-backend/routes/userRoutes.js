import express from "express";
import { toggleWishlist, getWishlist } from "../controllers/userController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();
// Add these routes
router.post("/wishlist", protect, toggleWishlist);
router.get("/wishlist", protect, getWishlist);

export default router;
