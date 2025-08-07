import Chat from "../models/Chat.js";

export const getChats = async (req, res) => {
    const chats = await Chat.find({
        $or: [
            { sander: req.user._id, receiver: req.params.userId },
            { sender: req.params.userId, receiver: req.user._id },
        ],
    }).sort({ cresatedAt: 1 });

    res.status(200).json(chats);
}