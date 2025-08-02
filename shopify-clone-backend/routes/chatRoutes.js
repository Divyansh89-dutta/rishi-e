import express from "express";
import { getChats } from "./chatController.js";
import { isAuthenticated } from "../middleware/auth.js";

const router = express.Router();
router.get("/:userId", isAuthenticated, getChats); // fetch chats with a user
export default router;
