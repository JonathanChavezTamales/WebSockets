//App config
const express = require("express");
const app = express();
const socket = require("socket.io");

//Static files
app.use("/", express.static("public"));

//Server config
const server = app.listen(4000, () => {
  console.log(`listening to requests on port 4000`);
});

//Socket setup
const io = socket(server);

io.on("connection", socket => {
  socket.on("chat", data => {
    io.emit("chat", data);
  });
  socket.on("typing", data => {
    socket.broadcast.emit("typing", data);
  });
});
