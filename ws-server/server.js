const http = require("http");
const server = http.createServer();
const sio = require("socket.io");

const io = sio(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

server.listen(process.env.WS_PORT);

io.on("connection", (socket) => {
  console.log(`Connected: ${socket.id}`);

  socket.on("disconnect", () => {
    console.log(`Disconnected: ${socket.id}`);
  });

  socket.on("connect_error", (err) => {
    console.log(`connect_error due to ${err.message}`);
  });

  socket.on("join", (room) => {
    console.log(`Socket ${socket.id} joining ${room}`);
    socket.join(room);
  });

  socket.on("chat", (data) => {
    const { message, room } = data;
    console.log(`msg: ${message}, room: ${room}`);
    io.to(room).emit("chat", message);
  });
});
