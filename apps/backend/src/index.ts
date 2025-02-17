import express from "express";
import { Server, Socket } from "socket.io";
import http from "http";

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const userSocketMap: { [key: string]: string } = {};
io.on("connection", (socket: Socket) => {
  console.log(socket.id);
  const userId = socket.handshake.query.userId as string;
  if (userId) {
    userSocketMap[userId] = socket.id;
  }
  io.emit("getOnlineUsers", Object.keys(userSocketMap));
  socket.on("sendMessage", (data) => {
    socket
      .to(data.recieverId)
      .emit("recieveMessage", { message: data.message });
  });
  socket.on("disconnect", () => {
    delete userSocketMap[userId];
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});

server.listen(5000, () => {
  console.log("Server running on port 3000");
});
