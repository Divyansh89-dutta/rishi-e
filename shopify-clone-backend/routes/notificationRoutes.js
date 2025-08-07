import express from "express";
import { getNotifications, markAsRead } from "../controllers/notificationController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/" ,protect, getNotifications);
router.put("/mark-as-read", protect, markAsRead);

export default router;