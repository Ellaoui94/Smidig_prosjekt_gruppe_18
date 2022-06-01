import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import * as path from "path";
import cookieParser from "cookie-parser";
import cors from "cors";
import { connection } from "./db.js";
import { WebSocketServer } from "ws";

import { AuthRoutes } from "./routes/auth.js";
import { UsersRoutes } from "./routes/users.js";
import { StudySessionApi } from "./routes/studySessions.js";
import { CourseRoutes } from "./routes/course.js";
import { ContactInfoApi } from "./routes/contactInfo.js";
import { fileURLToPath } from "url";

dotenv.config();

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.resolve(__dirname, "..", "client", "dist")));
app.use(bodyParser.json());
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(cors());

const sockets = [];
const wsServer = new WebSocketServer({ noServer: true });
wsServer.on("connection", (socket) => {
  sockets.push(socket);
  socket.on("message", (data) => {
    const { subjectName } = JSON.parse(data);
    const { todo, checked } = JSON.parse(data);
    for (const recipient of sockets) {
      if (!subjectName) {
        recipient.send(JSON.stringify({ todo, checked }));
      } else {
        recipient.send(JSON.stringify({ subjectName }));
      }
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
