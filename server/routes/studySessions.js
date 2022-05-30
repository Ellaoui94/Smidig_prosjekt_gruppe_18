import { Router } from "express";
import { Session, updateValidateStudySession } from "../models/studySession.js";
import * as parse from "nodemon";

export function StudySessionApi() {
  const router = new Router();

  router.post("/:email", async (req, res) => {
    try {
      //Here we save the values in the right schema.
      await new Session(req.body).save();
      res.status(201).send({ message: "Session created successfully" });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });

  /*
    Here we update the schema. But we need to find the right schema to update.
   */
  router.post("/update/:email", async (req, res) => {
    try {
      //We need to know if there is some problems. Maybe a value is not set, that we said need to be required
      const { error } = updateValidateStudySession(req.body);
      if (error)
        return res.status(400).send({ message: error.details[0].message });

      // We need to find the right data. We use the email to find the right one.
      const { email } = req.params;
      //Here we look for the right data, the one containing the email we sent with
      const studySession = await Session.findOne({ email: `${email}` });
      Object.assign(studySession, req.body);
      studySession.save();
      res.send({ data: studySession });
    } catch {
      res.status(404).send({ error: "User is not found" });
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
