const express = require("express");
const cors = require("cors");
const http = require("http");

const routes = require("./routes");
const { BroadcastService } = require("./services/BroadcastService");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);

const socketio = new Server(server, {
  cors: { origin: "*" },
  transports: ["websocket"],
});

BroadcastService.setup(socketio);

app.use(cors());
app.use(express.json());
app.use(routes);

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
