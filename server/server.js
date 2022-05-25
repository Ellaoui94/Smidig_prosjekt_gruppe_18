import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import * as path from "path";
import cookieParser from "cookie-parser";
import { MongoClient } from "mongodb";
import { UserApi } from "./userApi.js";
import cors from "cors";
import { connection } from "./db.js";

import { AuthRoutes } from "./routes/auth.js";
import { UsersRoutes } from "./routes/users.js";
import { StudySessionApi } from "./routes/studySessions.js";
import { CourseRoutes } from "./routes/course.js";

dotenv.config();

const app = express();

app.use(express.static("../client/dist"));
app.use(bodyParser.json());
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(cors());

connection();

app.use("/api/users", UsersRoutes());
app.use("/api/auth", AuthRoutes());
app.use("/api/session", StudySessionApi());
app.use("/api/course", CourseRoutes());

app.use((req, res, next) => {
  if (req.method === "GET" && !req.path.startsWith("/api")) {
    res.sendFile(path.resolve("../client/dist/index.html"));
  } else {
    next();
  }
});

const server = app.listen(process.env.PORT || 3000, () => {
  console.log(`Started on http://localhost:${server.address().port}`);
});
