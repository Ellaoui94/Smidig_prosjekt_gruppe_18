import { Router } from "express";
import { ContactDetails } from "../models/contactDetails.js";

export function ContactInfoApi() {
  const router = new Router();

  router.post("/", async (req, res) => {
    try {
      await new ContactDetails(req.body).save();
      res.status(201).send({ message: "Session created successfully" });
    } catch (error) {
      res.status(400).json({ message: "Du har allerede lagt til informasjon" });
    }
  });

  router.get("/userInfo/:id", async (req, res) => {
    try {
      const { id } = req.params;
      if (id !== `${undefined}`) {
        await ContactDetails.find({ _id: { $eq: id } }).then((result) => {
          res.json(result);
        });
      } else {
        console.log("subjectId", id);
      }


    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });

  return router;
}