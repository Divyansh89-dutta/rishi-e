import mongoose from "mongoose";

const chatSchema = new mongoose.Schema({
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    receiver: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    message: {
        type: String,
        required: true,
    },
    orderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Order",
    },
    isRead: {
        type: Boolean,
        default: false,
    },
},
    { timestamps: true },
);

export default mongoose.model("Chat", chatSchema);