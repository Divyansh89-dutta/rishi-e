import { Server } from "socket.io";
import Chat from "../models/Cart.js"
let io;

export const initSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: "*", // You can restrict this to your frontend URL
      methods: ["GET", "POST"],
    },
  });

  global.io = io; // make it globally accessible

  io.on("connection", (socket) => {
    console.log("🟢 New user connected:", socket.id);

    socket.on("join", (userId) => {
      socket.join(userId);
      console.log(`User ${userId} joined room`);
    });

    socket.on("sendMessage", async ({ sender, receiver, message, orderId }) => {
      const chat = await Chat.create({ sender, receiver, message, orderId });
      io.to(receiver).emit("receiveMessage", chat); // Real-time delivery
    });

    socket.on("disconnect", () => {
      console.log("🔴 User disconnected:", socket.id);
    });
  });

  return io;
};

export const getIO = () => {
  if (!io) throw new Error("Socket.io not initialized");
  return io;
};
