import { createServer } from "http";
import { Server } from "socket.io";
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import IpfsUtil from "./ipfs-util.js";
import multer from "multer";

const ALLOWED_DEFAULT_ORIGIN = process.env.CORS_ALLOWED_DOMAIN;
const ALLOWED_ORIGINS = [
  "http://localhost:3000",
  "http://127.0.0.1:3000",
  "http://localhost:3001",
  "http://127.0.0.1:3001",
  "http://localhost:3456",
  "http://127.0.0.1:3456",
];

const NFT_UPLOAD_DIRECTORY = "uploads/";

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(
  cors({
    origin: ALLOWED_ORIGINS,
    default: ALLOWED_DEFAULT_ORIGIN,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  })
);

console.log(`Allowed domain: ${process.env.CORS_ALLOWED_DOMAIN}`);

/*
// Ref: https://socket.io/docs/v4/client-options/

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
*/

const httpServer = createServer(app);

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

// You may specify os.tmpdir()
const upload = multer({ dest: NFT_UPLOAD_DIRECTORY });

app.post("/nft/upload", upload.single("file"), async function (req, res) {
  const name = req.body.name;
  const description = req.body.description;
  console.log({ name, description });

  let result = await IpfsUtil.pushFileToIpfs(
    `${NFT_UPLOAD_DIRECTORY}${req.file?.filename}`
  );

  res.writeHead(200, { "Content-Type": "application/json" });
  let data = JSON.stringify(result);
  res.write(data);
  res.end();
});

// nft/test router for adding a local file to the IPFS network w/o a local node
app.get("/nft/test", async function (req, res) {
  let result = await IpfsUtil.pushSampleFileToIpfs();
  res.writeHead(200, { "Content-Type": "application/json" });
  let data = JSON.stringify(result);
  res.write(data);
  res.end();
});

const games = new Map();

app.get("/game/:room", function (req, res) {
  const room = req.params.room;
  console.log(`Get game for room ${room} room`);

  let result = { error: "No data to process!" };
  if (room) {
    result = games.get(room);
    if (!result) {
      result = { error: `No game found w/ id = ${room}` };
    }
  } else {
    result = { error: `No game-id/room passed!` };
  }

  console.log(`Sending ${JSON.stringify(result)} to room '${room}'`);

  res.writeHead(200, { "Content-Type": "application/json" });
  res.write(JSON.stringify(result));
  res.end();
});

app.post("/game/:room", function (req, res) {
  const room = req.params.room;
  console.log(`Save game for room ${room} room`);
  games.set(room, req.body);
  res.send("{status: success, code: 200}");
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
