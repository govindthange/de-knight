import { createServer } from "http";
import { Server } from "socket.io";
// import { readFileSync } from "fs";

// Ref: https://socket.io/docs/v4/client-options/

const games = new Map();

const httpServer = createServer({
  // Test following w/ a self-signed certificate
  // cert: readFileSync("./cert.pem"),
  // key: readFileSync("./key.pem")
  // For working w/ client-certificate authentication
  // cert: readFileSync("./server-cert.pem"),
  // key: readFileSync("./server-key.pem"),
  // requestCert: true,
  // ca: [readFileSync("client-cert.pem")],
});
const io = new Server(httpServer, {
  path: "/de-chess/multiplayer/",
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
    // For production use following values
    // origin: "https://de-chess-production-server.com",
    // credentials: true
  },
});

httpServer.listen(process.env.WS_PORT);

io.on("connection", (socket) => {
  console.log(`Connected: ${socket.id}`);

  // Capture and print protocol version here.
  console.log(socket.protocol);

  // EIO: the version of the protocol (currently, "4")
  // transport: the transport name ("polling" or "websocket")
  // sid: the session ID
  // j: if the transport is polling but a JSONP response is required
  // t: a hashed-timestamp used for cache-busting
  console.log("socket.handshake.query: %o", socket.handshake.query);
  // Above line prints { x: "42", EIO: "4", transport: "polling" }

  // Capture an object containing any extra headers.
  // Example: 'de-chess-extra-header-comes-here': 'some-dummy-value'
  console.log(socket.handshake.headers);

  socket.on("reconnect_attempt", () => {
    socket.io.opts.query.x++;
    console.log(`reconnect_attempt ${socket.io.opts.query.x}`);
  });

  socket.on("disconnect", () => {
    console.log(`Disconnected: ${socket.id}`);
  });

  socket.on("connect_error", (err) => {
    console.log(`connect_error due to ${err.message}`);

    if (err.message === "invalid credentials") {
      socket.auth.token = "efgh";
      // socket.connect();

      // manually force the Socket instance to reconnect:
      socket.disconnect().connect();
    }
  });

  socket.on("*", (obj) => {
    console.log(`Socket ${socket.id} received w/ ${JSON.stringify(room)}`);
    console.log(obj);
  });

  socket.on("join", (room) => {
    console.log(`Socket ${socket.id} joining ${room}`);
    socket.join(room);
    console.log("Total Games: ", games.size);
  });

  socket.on("chat", (obj) => {
    const { message, room } = obj;
    console.log(`msg: ${message}, room: ${room}`);
    io.to(room).emit("chat", message);
    console.log("Total Games: ", games.size);
  });

  socket.on("play", (obj) => {
    const { move, room } = obj;

    const moveObj = JSON.parse(move);
    if (moveObj) {
      console.log(`Updating ${JSON.stringify(moveObj)} under room '${room}'`);
      games.set(room, moveObj);
    }

    console.log(`move: ${move}, room: ${room}`);
    io.to(room).emit("play", move);
    console.log("Total Games: ", games.size);
  });

  socket.on("command", (obj) => {
    const { command, room } = obj;
    const cmdObj = JSON.parse(command);
    io.to(room).emit("command", command);

    switch (cmdObj.type) {
      case "save":
        console.log(
          `Saving ${JSON.stringify(cmdObj.game)} under room '${room}'`
        );
        games.set(room, cmdObj.game);
        console.log("Total Games: ", games.size);
        break;
      case "delete":
        console.log(
          `Deleting ${JSON.stringify(cmdObj.game)} for room '${room}'`
        );
        games.delete(room);
        break;
      case "query":
        let game = JSON.stringify(games.get(room));
        if (!game) {
          game = { error: `No game found w/ id = ${room}` };
        }

        console.log(`Sending ${JSON.stringify(game)} to room '${room}'`);
        io.to(room).emit("game", game);
        // io.to(room).emit("chat", "command");
        break;
      default:
        console.log(`Command type '${command}' not supported`);
    }
    console.log("Total Games: ", games.size);
  });
});
