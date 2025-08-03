import express from "express";
import { getUserProfile, updateAddress, updateProfile, toggleWishlist, getWishlist } from "../controllers/userController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();
// Add these routes
router.get('/profile', protect, getUserProfile);
router.put('/profile', protect, updateProfile);
router.post("/wishlist", protect, toggleWishlist);
router.get("/wishlist", protect, getWishlist);
router.put('/address', protect, updateAddress);

export default router;
