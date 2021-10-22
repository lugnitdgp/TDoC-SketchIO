const { addUser } = require("./users");

module.exports = (io) => {
  function eventHandlers(socket) {
    /*Handle various events here*/
    console.log("Connected to the client");

    socket.on("user-name", (name) => {
      io.emit("user-name", name);
      console.log(name);
    });

    socket.on("disconnect", () => {
      console.log("Client Disconnected");
    });
  }
  return eventHandlers;
};
