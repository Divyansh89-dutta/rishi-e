import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema(
  {
    to: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    from: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    type: {
      type: String,
      required: true,
      enum: ["order", "message", "promo", "system"], // ✅ Add valid types here
    },
    message: { type: String, required: true },
    data: { type: Object }, // optional payload
    isRead: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.model("Notification", notificationSchema);
