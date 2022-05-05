const express = require("express");
const app = express();
const bodyParser = require("body-parser");

const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");

const createServer = http.createServer;
const httpServer = createServer();
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:3000",
    allowedHeaders: ["my-custom-header"],
    credentials: true,
  },
});

require("dotenv").config();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", function (req, res) {
  res.send("everything is good...");
});

io.on("connection", (socket) => {
  console.log("a user connected");
});

const port = process.env.PORT || 5000;
app.listen(port);
