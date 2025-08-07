// utils/socket.js
import { Server } from "socket.io";
import Chat from "../models/Cart.js";

let io;

export const initSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: "http://localhost:5173",
      methods: ["GET", "POST"],
      credentials: true
    },
  });

  global.io = io;

  io.on("connection", (socket) => {
    console.log("📲 New user connected:", socket.id);

    socket.on("joinRoom", ({ role, userId }) => {
      if (role === "admin") {
        socket.join("admin");
        console.log("👮 Admin joined room: admin");
      } else {
        socket.join(userId);
        console.log(`👤 User ${userId} joined their room`);
      }
    });

    socket.on("sendMessage", async ({ sender, receiver, message, orderId }) => {
      try {
        const chat = await Chat.create({ sender, receiver, message, orderId });
        io.to(receiver).emit("receiveMessage", chat);
      } catch (err) {
        console.error("❌ Error sending message:", err.message);
      }
    });

    socket.on("disconnect", () => {
      console.log("🚪 User disconnected:", socket.id);
    });
  });

  return io;
};

export const getIO = () => {
  if (!io) throw new Error("Socket.io not initialized");
  return io;
};
