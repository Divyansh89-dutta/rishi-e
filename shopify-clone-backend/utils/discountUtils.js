import Discount from "../models/Discount.js";

export const applyDiscountCodeInternally = async (code, userId) => {
    const discount = await Discount.findOne({ code });

    if (!discount) return { error: "Invalid discount code" };

    if (discount.expiresAt && new Date(discount.expiresAt) < new Date()) {
        return { error: "Discount code has expired" };
    }

    if (discount.usageLimit && discount.usedBy.length >= discount.usageLimit) {
        return { error: "Discount usage limit reached" };
    }

    if (discount.usedBy.includes(usedId)) {
        return { error: "Your already used this code" };
    }

    return { discountPercent: discount.discountPercent }
}

export const markCodeUsed = async (code, userId) => {
    await Discount.updateOne({ code }, { $addToSet: { usedBy: userId } });
}