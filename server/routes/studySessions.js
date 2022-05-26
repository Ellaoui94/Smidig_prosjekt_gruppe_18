import { Router } from "express";
import { Session } from "../models/studySession.js";

export function StudySessionApi() {
  const router = new Router();

  router.post("/", async (req, res) => {
    try {
      await new Session(req.body).save();
      res.status(201).send({ message: "Session created successfully" });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });

  router.get("/planned-session/", async (req, res) => {
    const today = new Date();
    let todaysDate = today.getDate() + "/" + (today.getMonth() + 1);
    let tomorrowsDate = today.getDate() + 1 + "/" + (today.getMonth() + 1);

    const plannedSessions = [
      {
        sessionId: "1",
        day: "Mandag",
        date: todaysDate,
        courseTitle: "Filosofi",
        location: "Cafe",
        address: "Torshovgata 33",
        todos: ["Gjøre ferdig rapport", "Lese kapittel 5"],
      },
      {
        sessionId: "2",
        day: "Tirsdag",
        date: tomorrowsDate,
        courseTitle: "Smidig Prosjekt",
        location: "Cafe",
        address: "Majorstua 1",
        todos: ["Planlegge sprint", "Lese kapittel 5"],
      },
      {
        sessionId: "3",
        day: "Onsdag",
        date: tomorrowsDate,
        courseTitle: "Design",
        location: "Cafe",
        address: "Kampengata 43",
        todos: ["Starte på moodboard", "Lese kapittel 5"],
      },
    ];

    const { sessionId } = req.query;
    let queryResult = "";
    console.log("id " + sessionId);

    if (sessionId) {
      queryResult = plannedSessions.filter(
        (sessions) => sessions.sessionId === sessionId
      );
    } else {
      queryResult = plannedSessions;
    }

    res.json(queryResult);
  });

  return router;
}
