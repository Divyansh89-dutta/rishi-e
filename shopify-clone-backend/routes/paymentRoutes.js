// routes/paymentRoutes.js
import express from "express";
import { protect } from "../middlewares/authMiddleware.js";
import {
  createPayPalOrder,
  executePayPalPayment,
} from "../controllers/paymentController.js";

const router = express.Router();

router.post("/create", protect, createPayPalOrder);
router.get("/execute", executePayPalPayment);

export default router;
