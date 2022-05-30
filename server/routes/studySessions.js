import { Router } from "express";
import { Session } from "../models/studySession.js";
import * as parse from "nodemon";

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

  const today = new Date();
  let yesterdaysDate = today.getDate() - 1 + "/" + (today.getMonth() + 1);
  const finishedSessions = [
    {
      sessionId: "1",
      day: "Mandag",
      date: yesterdaysDate,
      courseTitle: "Filosofi",
      location: "Cafe",
      todos: [
        {
          todo: "Gjøre ferdig rapport",
          checked: false,
        },
        {
          todo: "Lese kapittel 5",
          checked: true,
        },
      ],
    },
    {
      sessionId: "2",
      day: "Tirsdag",
      date: yesterdaysDate,
      courseTitle: "Smidig Prosjekt",
      location: "Cafe",
      todos: [
        {
          todo: "Planlegge sprint",
          checked: true,
        },
        {
          todo: "Lese kapittel 5",
          checked: false,
        },
      ],
    },
    {
      sessionId: "3",
      day: "Onsdag",
      date: yesterdaysDate,
      courseTitle: "Design",
      location: "Cafe",
      todos: [
        {
          todo: "Starte på moodboard",
          checked: true,
        },
        {
          todo: "Lese kapittel 5",
          checked: true,
        },
      ],
    },
  ];

  router.get("/finished-session/", async (req, res) => {
    const { sessionId } = req.query;
    let queryResult = "";
    console.log("id " + sessionId);

    if (sessionId) {
      queryResult = finishedSessions.filter(
        (sessions) => sessions.sessionId === sessionId
      );
    } else {
      queryResult = finishedSessions;
    }

    res.json(queryResult);
  });

  router.post("/new-todo/", async (req, res) => {
    const { todo, checked } = req.body;
    const { sessionId } = req.query;

    finishedSessions.map((session, i) => {
      if (session.sessionId === sessionId) {
        finishedSessions[i].todos.push({
          todo: todo,
          checked: checked,
        });
      }
    });

    res.sendStatus(200);
  });

  return router;
}
