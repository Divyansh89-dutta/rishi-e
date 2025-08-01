// routes/discountRoutes.js
import express from "express";
import { protect, adminOnly } from "../middlewares/authMiddleware.js";
import Discount from "../models/Discount.js";

const router = express.Router();

router.post("/create", protect, adminOnly, async (req, res) => {
  const { code, discountPercent, expiresAt, usageLimit } = req.body;

  if (!code || !discountPercent) {
    return res.status(400).json({ message: "Code and discount percent are required" });
  }

  const exists = await Discount.findOne({ code });
  if (exists) {
    return res.status(400).json({ message: "Code already exists" });
  }

  const discount = new Discount({ code, discountPercent, expiresAt, usageLimit });
  await discount.save();

  res.status(201).json(discount);
});

export default router;
