module.exports = (io) => {
  function eventHandlers(socket) {
    /*Handle various events here*/
    console.log("Connected to the client");

    socket.on("disconnect", () => {
      console.log("Client Disconnected");
    });
  }
  return eventHandlers;
};
