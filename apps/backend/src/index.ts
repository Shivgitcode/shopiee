import express from "express";
import { Server, Socket } from "socket.io";
import http from "http";

const app = express();
const server = http.createServer(app);
const io = new Server(server);

io.on("connection", (socket: Socket) => {
  console.log(socket.id);
  socket.on("user-message", (data) => {
    console.log(data);
  });
});

server.listen(3000, () => {
  console.log("Server running on port 3000");
});
