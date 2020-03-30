const socketio = require("socket.io");

let io;
const connections = [];

exports.setupWebsocket = server => {
  io = socketio(server);

  io.on("connection", socket => {
    connections.push({
      id: socket.id
    });
    io.on("disconnect", () => {
      delete connections[socket.id];
    });
  });
};
