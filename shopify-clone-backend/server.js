import http from "http";
import { Server } from "socket.io";
import app from "./app.js";

const PORT = process.env.PORT || 5000;

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: process.env.CLIENT_URL,
        methods: ["GET", "POST"],
    },
});

global.io = io; // so that you can import use it from any file

io.on("connection", (socket) => {
    console.log("User connected", socket.id);

    socket.on("join", (userId) => {
        socket.join(userId); // join user personal room
    });

    socket.on("disconnected", () => {
        console.log("User disconnected:", socket.id);
    });
});

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})