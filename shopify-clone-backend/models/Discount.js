import mongoose from "mongoose";

const discountSchema = new mongoose.Schema({
    code: { type: String, required: true, unique: true },
    discountPercent: { type: Number, required: true },
    expiresAt: Date,
    usageLimit: Number,
    usedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
})

export default mongoose.model("Discount", discountSchema);