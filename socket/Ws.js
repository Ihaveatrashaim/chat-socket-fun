"use strict";

module.exports = (io) => {
  var clients = {};
  io.on("connection", function (client) {
    client.on("join", function (name) {
      clients[client.id] = name;
      client.emit("update", "You connect to the server");
      client.broadcast.emit("update", name + " connected to the server");
    });

    client.on("send", function (msg) {
      client.broadcast.emit("chat", clients[client.id], msg);
    });

    client.on("disconnect", function () {
      io.emit("update", clients[client.id] + "Leave the server");
      delete clients[client.id];
    });
  });
};
