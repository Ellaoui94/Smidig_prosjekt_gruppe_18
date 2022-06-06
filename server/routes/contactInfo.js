import { Router } from "express";
import { ContactDetails } from "../models/contactDetails.js";

export function ContactInfoApi() {
  const router = new Router();

  //Save contact info to database
  router.post("/", async (req, res) => {
    try {
      await new ContactDetails(req.body).save();
      res.status(201).send({ message: "Details created successfully" });
    } catch (error) {
      res.status(400).json({ message: "Du har allerede lagt til informasjon" });
    }
  });

  //Updates data in the database by finding the right data by id.
  router.post("/update/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const userContact = await ContactDetails.findOne({ _id: { $eq: id } });
      Object.assign(userContact, req.body);
      userContact.save();

      res.send({ data: userContact });
    } catch {
      res.status(404).send({ error: "Details is not found" });
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
