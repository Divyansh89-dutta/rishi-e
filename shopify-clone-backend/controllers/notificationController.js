import Notification from "../models/Notification.js";

// 🔔 Create Notification
export const createNotification = async (req, res) => {
  try {
    const { to, type, message, data } = req.body;

    const notification = await Notification.create({
      to,
      type,
      message,
      data,
      from: req.user?._id || null, // optional
    });

    // Emit real-time notification (if using socket.io and user is connected)
    if (global.io) {
      global.io.to(to.toString()).emit("notification", notification);
    }

    res.status(201).json(notification);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 📥 Get User's Notifications
export const getNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({ to: req.user._id })
      .sort({ createdAt: -1 })
      .limit(50);

    res.status(200).json(notifications);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ Mark Single Notification as Read
export const markNotificationRead = async (req, res) => {
  try {
    const notification = await Notification.findById(req.params.id);

    if (!notification || notification.to.toString() !== req.user._id.toString()) {
      return res.status(404).json({ message: "Notification not found or unauthorized" });
    }

    notification.isRead = true;
    await notification.save();

    res.status(200).json(notification);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ Mark All as Read
export const markAllAsRead = async (req, res) => {
  try {
    if (req.user.role === "admin") {
      // Mark all admin notifications as read
      await Notification.updateMany({ to: "admin", isRead: false }, { $set: { isRead: true } });
    } else {
      // Mark all user-specific notifications as read
      await Notification.updateMany({ to: req.user._id, isRead: false }, { $set: { isRead: true } });
    }

    res.status(200).json({ message: "All notifications marked as read" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
