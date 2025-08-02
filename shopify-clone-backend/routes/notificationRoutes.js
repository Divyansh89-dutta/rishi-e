import express from "express";
import {
  createNotification,
  getNotifications,
  markNotificationRead,
  markAllAsRead,
} from "../controllers/notificationController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/", protect, getNotifications);
router.post("/", protect, createNotification);
router.patch("/:id/read", protect, markNotificationRead);
router.patch("/read-all", protect, markAllAsRead);

export default router;
