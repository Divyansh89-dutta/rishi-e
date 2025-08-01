import Discount from "../models/Discount.js";
import User from "../models/User.js";

export const applyDiscountCode = async (req, res) => {
  const { code } = req.body;
  const userId = req.user._id;

  const discount = await Discount.findOne({ code: code.toUpperCase() });
  if (!discount)
    return res.status(404).json({ error: "Invalid discount code." });

  if (new Date(discount.expiresAt) < new Date())
    return res.status(400).json({ error: "Discount code expired." });

  if (discount.usedBy.includes(userId))
    return res.status(400).json({ error: "Already used this code." });

  if (discount.usageLimit <= discount.usedBy.length)
    return res.status(400).json({ error: "Code usage limit exceeded." });

  res.status(200).json({ discountPercent: discount.discountPercent });
};

export const markCodeUsed = async (code, userId) => {
  await Discount.findOneAndUpdate(
    { code: code.toUpperCase() },
    { $push: { usedBy: userId } }
  );
};
