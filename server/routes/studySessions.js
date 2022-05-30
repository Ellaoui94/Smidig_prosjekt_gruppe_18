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
    try {
      const { sessionId } = req.query;
      console.log("sessionId is " + sessionId);
      let queryResult = "";
      if (sessionId) {
        await Session.find({ _id: { $eq: sessionId } }).then((result) => {
          queryResult = result;
        });
      } else {
        await Session.find({ stage: "planned" }).then((result) => {
          queryResult = result;
          // console.log(
          //   "inside router planned session: " + JSON.stringify(result)
          // );
        });
      }
      res.json(queryResult);
    } catch {
      res.status(404).send({ error: "Session not found" });
    }
  });

  router.get("/finished-session/", async (req, res) => {
    try {
      const { sessionId } = req.query;
      let queryResult = "";
      if (sessionId) {
        await Session.find({ _id: { $eq: sessionId } }).then((result) => {
          queryResult = result;
        });
      } else {
        await Session.find({ stage: "finished" }).then((result) => {
          queryResult = result;
        });
      }
      res.json(queryResult);
    } catch {
      res.status(404).send({ error: "Session not found" });
    }
  });

  router.post("/new-todo/", async (req, res) => {
    try {
      const { todo, checked } = req.body;
      const { sessionId } = req.query;
      console.log("inside new todo " + sessionId);

      await Session.findOne({ _id: { $eq: sessionId } }).then((session) => {
        console.log("INSIDE ROUTER NEW TODO" + JSON.stringify(session));
        session.todos.todo.push(todo);
        session.todos.checked.push(checked);
        session.save();
        res.sendStatus(200);
      });
    } catch {
      res.status(404).send({ error: "Session not found" });
    }
  });

  return router;
}
