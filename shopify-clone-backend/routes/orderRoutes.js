// routes/orderRoutes.js
import express from "express";
import {
  getAllOrders,
  getUserOrders,
  getOrderById,
  markDeliversed,
  createOrder // ✅ Make sure this is imported
} from "../controllers/orderController.js";

import { protect, adminOnly } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/", protect, createOrder); // ✅ <-- ADD THIS LINE
router.get("/my-orders", protect, getUserOrders);
router.get("/", protect, adminOnly, getAllOrders);
router.get("/:id", protect, getOrderById);
router.put("/:id/deliver", protect, adminOnly, markDeliversed);

export default router;
