const { createServer } = require("http"); // createServer is the funtion used to create a HTTP server instance
const app = require("express"); // requestListener
const server = createServer(app); // HTTP server instance
const io = require("socket.io")(server); // socket.io server object
const PORT = 8000;

const eventHandlers = require("./eventHandlers")(io);
io.on("connection", eventHandlers);

server.listen(PORT, () => {
  // This is a callback funtion, which will be fired once the server starts listening
  console.log("server listening on port:", PORT);
});
