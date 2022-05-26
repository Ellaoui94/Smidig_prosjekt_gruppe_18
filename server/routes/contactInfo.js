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

  router.get("/userInfo",  (req, res) => {
    try {
      ContactDetails.find().then((result) => {
        res.json(result)
      })
    } catch (error) {
      res.status(400).json({ message: "Du har allerede lagt til informasjon" });
    }
  });

  return router;
}