const path = require("path");
const usernameGen = require("username-generator");
const express = require("express");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http, {
  cors: {
    origin: "*",
  },
});

const SOCKET_EVENT = {
  CONNECTED: "connected",
  DISCONNECTED: "disconnect",
  HAS_SENT_FILES: "sent_files",
  // todo: add a "downloaded" event
};

// console log with timestamp
function Log(message, data) {
  console.log(new Date().toISOString(), message, data);
}

io.on("connection", (socket) => {
  //generate username against a socket connection and store it
  Log("new socket connected ");

});

socket.on(SOCKET_EVENT.SEND_REQUEST, ({ room_id, signal }) => {
  // tell user that a request has been sent
  io.of(room_id).emit(SOCKET_EVENT.HAS_SENT_FILES, {
    signal,
  });
});

const port = 7093;
http.listen(port);
Log("server listening on port", port);
