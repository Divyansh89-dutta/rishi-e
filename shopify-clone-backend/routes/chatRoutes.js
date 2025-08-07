import express from "express";
import { getChats } from "../controllers/chatController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/:userId", protect, getChats);

export default router;