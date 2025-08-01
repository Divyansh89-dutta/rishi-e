import Notification from "../models/Notification.js";

export const getNotifications = async (req, res) => {
  const notifications = await Notification.find({ to: req.user._id })
    .sort({ createdAt: -1 })
    .limit(50);
  res.json(notifications);
};

export const markAsRead = async (req, res) => {
  await Notification.updateMany({ to: req.user._id, isRead: false }, { isRead: true });
  res.json({ message: "All marked as read" });
};