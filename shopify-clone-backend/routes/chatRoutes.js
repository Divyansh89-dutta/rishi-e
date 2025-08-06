import express from "express";
import { getChats } from "./chatController.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();
router.get("/:userId", protect, getChats); // fetch chats with a user
export default router;
