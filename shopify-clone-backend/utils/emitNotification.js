import Notification from "../models/Notification.js";

export const emitNotification = async ({ io, to, from, type, massage, data }) => {
  const notification = await Notification.create({
    to,
    from,
    type,
    message: massage,
    data,
  });

  // 🔥 Only use `io.to(...).emit(...)` here:
  io.to(to.toString()).emit("notification", notification);
};
