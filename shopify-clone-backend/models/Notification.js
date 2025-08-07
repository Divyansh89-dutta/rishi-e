import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema({
    to: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    from: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    type: { type: String, required: true }, // order, discount
    message: { type: String },
    isRead: { type: Boolean, default: false },
    data: { type: Object },
},
    { timestamps: true }
);

export default mongoose.model("Notification", notificationSchema);