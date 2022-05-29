import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import * as path from "path";
import cookieParser from "cookie-parser";
import { MongoClient } from "mongodb";
import { UserApi } from "./userApi.js";
import cors from "cors";
import { connection } from "./db.js";
import { WebSocketServer } from "ws";

import { AuthRoutes } from "./routes/auth.js";
import { UsersRoutes } from "./routes/users.js";
import { StudySessionApi } from "./routes/studySessions.js";
import { CourseRoutes } from "./routes/course.js";
import { ContactInfoApi } from "./routes/contactInfo.js";

dotenv.config();

const app = express();

app.use(express.static("../client/dist"));
app.use(bodyParser.json());
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(cors());

const sockets = [];
const wsServer = new WebSocketServer({ noServer: true });
wsServer.on("connection", (socket) => {
  sockets.push(socket);

  socket.on("subject", (subject) => {
    console.log("Article: " + subject);
    for (const recipient of sockets) {
      recipient.send(subject.toString());
    }
  });

  socket.on("message", (data) => {
    const { todo, checked } = JSON.parse(data);
    for (const recipient of sockets) {
      recipient.send(JSON.stringify({ todo, checked }));
    }
  });
});

connection();

app.use("/api/users", UsersRoutes());
app.use("/api/auth", AuthRoutes());
app.use("/api/session", StudySessionApi());
app.use("/api/course", CourseRoutes());
app.use("/api/contactInfo", ContactInfoApi());

app.use((req, res, next) => {
  if (req.method === "GET" && !req.path.startsWith("/api")) {
    res.sendFile(path.resolve("../client/dist/index.html"));
  } else {
    next();
  }
});

const server = app.listen(process.env.PORT || 3000, () => {
  console.log(`Started on http://localhost:${server.address().port}`);
  server.on("upgrade", (req, socket, head) => {
    wsServer.handleUpgrade(req, socket, head, (socket) => {
      console.log("Connected");
      wsServer.emit("connection", socket, req);
    });
  });
});
