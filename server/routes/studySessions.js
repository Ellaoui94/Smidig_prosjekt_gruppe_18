import { Router } from "express";
import {
  Session,
  todoValidate,
  updateStageValidate,
  updateValidateStudySession,
} from "../models/studySession.js";

export function StudySessionApi() {
  const router = new Router();

  //Saving data to session collection in the database
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

  router.post("/set-session-to-active/:id", async (req, res) => {
    try {
      const { error } = updateStageValidate(req.body);
      if (error)
        return res.status(400).send({ message: error.details[0].message });

      const { id } = req.params;
      const session = await Session.findOne({ _id: { $eq: id } });
      Object.assign(session, req.body);
      res.send({ data: session });
      session.save();
    } catch {
      res.status(404).send({ error: "Session is not found" });
    }
  });

  router.post("/set-session-to-finished/:id", async (req, res) => {
    try {
      const { error } = updateStageValidate(req.body);
      if (error)
        return res.status(400).send({ message: error.details[0].message });

      const { id } = req.params;
      const session = await Session.findOne({ _id: { $eq: id } });
      Object.assign(session, req.body);
      res.send({ data: session });
      session.save();
    } catch {
      res.status(404).send({ error: "Session is not found" });
    }
  });

  router.get("/planned-session", async (req, res) => {
    try {
      const { sessionId } = req.query;
      const emailCookie = req.signedCookies.jwt.email;
      let queryResult = "";

      if (sessionId) {
        await Session.find({
          _id: { $eq: sessionId },
        }).then((result) => {
          queryResult = result;
        });
      } else {
        await Session.find({
          stage: "planned",
          $or: [{ email: "mock@data.no" }, { email: `${emailCookie}` }],
        }).then((result) => {
          queryResult = result;
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
      const emailCookie = req.signedCookies.jwt.email;

      let queryResult = "";
      if (sessionId) {
        await Session.find({ _id: { $eq: sessionId } }).then((result) => {
          queryResult = result;
        });
      } else {
        await Session.find({
          stage: "finished",
          $or: [{ email: "mock@data.no" }, { email: emailCookie }],
        }).then((result) => {
          queryResult = result;
        });
      }

      res.json(queryResult);
    } catch {
      res.status(404).send({ error: "Session not found" });
    }
  });

  router.get("/active-session/", async (req, res) => {
    try {
      const emailCookie = req.signedCookies.jwt.email;
      let queryResult = "";

      await Session.find({
        $and: [{ stage: "active" }, { email: emailCookie }],
      }).then((result) => {
        queryResult = result;
      });

      res.json(queryResult);
    } catch {
      res.status(404).send({ error: "Session not found" });
    }
  });

  router.get("/active-session/:email", async (req, res) => {
    try {
      await Session.find({ stage: "active" }).then((result) => {
        res.json(result);
      });
    } catch {
      res.status(404).send({ error: "Session not found" });
    }
  });

  router.get("/new-session/", async (req, res) => {
    try {
      const { sessionId } = req.query;
      const emailCookie = req.signedCookies.jwt.email;
      console.log("sessionid " + sessionId);
      let queryResult = "";
      if (sessionId) {
        await Session.find({ _id: { $eq: sessionId } }).then((result) => {
          console.log(result);
          queryResult = result;
        });
      } else {
        await Session.find({ email: emailCookie })
          .sort({ createdAt: -1 })
          .limit(1)
          .then((result) => {
            queryResult = result;
          });
      }
      res.json(queryResult);
    } catch {
      res.status(404).send({ error: "Session not found" });
    }
  });

  router.post("/new-todo/:id/:todo", (req, res) => {
    try {
      const { error } = todoValidate(req.body);
      if (error)
        return res.status(400).send({ message: error.details[0].message });

      const { id } = req.params;
      const newTodo = JSON.parse(req.params.todo);

      Session.findOne({ _id: { $eq: id } }).then((record) => {
        record.todos.push(newTodo);
        record.save();
      });
    } catch {
      res.status(404).send({ error: "User is not found" });
    }
  });

  //Here we tried to delete a session that already existed, but this we failed.
  //We chose not to delete this if some of us found a way to fix it
  router.delete("/delete/:id", async (req, res) => {
    try {
      const { sessionId } = req.params;
      const session = await Session.findOne({ _id: { $eq: sessionId } });

      await session.remove();
      res.send({ data: true });
    } catch (error) {
      console.log(error);
      res.status(404).send({ error: "Session is not found" });
    }
  });

  return router;
}
