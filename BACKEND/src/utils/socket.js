let io = null;

module.exports = {
  init: (server, opts) => {
    let Server;
    try {
      Server = require("socket.io").Server;
    } catch (e) {
      console.warn("socket.io not installed — realtime features disabled.");
      return null;
    }
    io = new Server(server, opts);
    io.on("connection", (socket) => {
      console.log("Socket connected:", socket.id);
      socket.on("disconnect", () =>
        console.log("Socket disconnected:", socket.id)
      );
    });
    return io;
  },
  getIO: () => io,
};
