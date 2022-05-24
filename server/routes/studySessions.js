import {Router} from "express";
import { Session } from "../models/studySession.js";

export function StudySessionApi(){
  const router = new Router()

  router.post("/", async (req, res) => {
    try {
      await new Session(req.body).save();
      res.status(201).send({ message: "Session created successfully" });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });

  return router;
}