import express from "express";
import { applyDiscountCode } from "../controllers/discountController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/apply", protect, applyDiscountCode);

export default router;
