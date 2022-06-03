import { Router } from "express";
import { friendValidate, pictureValidate, subjectValidate, updateValidate, User, validate } from "../models/user.js";
import bcrypt from "bcrypt";
import { ContactDetails } from "../models/contactDetails.js";
import Joi from "joi";

const maxAge = 3 * 24 * 60 * 60;

export function UsersRoutes() {
  const router = new Router();

  /*
  Here we do some validations when register a user.
  - Checking if email already exists.
  - Checking if the password contains at least eight characters. (salt)
  - Crypt the password when adding it to the database
   */
  router.post("/", async (req, res) => {
    try {
      const { error } = validate(req.body);
      if (error)
        return res.status(400).send({ message: error.details[0].message });

      const user = await User.findOne({ email: req.body.email });

      res.cookie("jwt", user, {
        withCredentials: true,
        httpOnly: false,
        maxAge: maxAge * 1000,
      });

      if (user)
        return res
          .status(409)
          .send({ message: "User with given email already exist!" });

      const salt = await bcrypt.genSalt(Number(process.env.SALT));
      const hashPassword = await bcrypt.hash(req.body.password, salt);

      await new User({ ...req.body, password: hashPassword }).save();
      res.status(201).send({ message: "User created successfully" });
    } catch (error) {
      res.status(500).send({ message: "Internal Server Error" });
    }
  });

  router.post("/postFriend/:id/:friend", (req, res) => {
    try {
      const { error } = friendValidate(req.body);
      if (error)
        return res.status(400).send({ message: error.details[0].message });

      const {id} = req.params
      const friend = JSON.parse(req.params.friend)

      User.findOne({ _id: { $eq: id } }).then((record)=> {
        record.friends.push(friend);
        record.save()
      })

    }catch{
      res.status(404).send({error: "User is not found"})
    }
  })

  router.get("/getUser/:id", async (req, res) => {
    try {
      const { id } = req.params;
      if (id !== `${undefined}`) {
        await User.find({ _id: { $eq: id } }).then((result) => {
          res.json(result);
        });
      } else {
        console.log("userId", id);
      }


    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });

  router.get("/getAllUsers", async (req, res) => {
    try {
      await User.find().then((result) => {
          res.json(result);
      });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });

  router.post("/update/:id", async (req, res) => {
    try {

      const { error } = updateValidate(req.body);
      if (error)
        return res.status(400).send({ message: error.details[0].message });


      const { id } = req.params;
      const user = await  User.findOne({ _id: { $eq: id } });
      Object.assign(user, req.body);
      user.save();

      res.cookie("jwt", user, {
        httpOnly: false,
        maxAge: maxAge * 1000,
        signed: true,
      });
      res.send({ data: user });
    } catch {
      res.status(404).send({ error: "User is not found" });
    }
  });

  router.post("/pictureUpdate/:id", async (req, res) => {
    try {

      const { error } = pictureValidate(req.body);
      if (error)
        return res.status(400).send({ message: error.details[0].message });


      const { id } = req.params;
      const user = await  User.findOne({ _id: { $eq: id } });
      Object.assign(user, req.body);
      user.save();

      res.cookie("jwt", user, {
        httpOnly: false,
        maxAge: maxAge * 1000,
        signed: true,
      });
      res.send({ data: user });
    } catch {
      res.status(404).send({ error: "User is not found" });
    }
  });

  router.post("/subject/:id/:subject", async (req, res) => {
    try {
      const { error } = subjectValidate(req.body);
      if (error)
        return res.status(400).send({ message: error.details[0].message });

      const {id} = req.params
      const subject = JSON.parse(req.params.subject)

      User.findOne({ _id: { $eq: id } }).then((record)=> {
        record.subjects.push(subject);
        record.save()
      })

    }catch{
      res.status(404).send({error: "User is not found"})
    }
  })

  router.delete("/delete/:id", async (req, res) => {
    try {
      const {id} = req.params
      const user = await User.findOne({ _id: { $eq: id } });
      const userDetails = await ContactDetails.findOne({ _id: { $eq: id } });
      if (userDetails){
        await userDetails.remove();
      }
      await user.remove();
      res.clearCookie("jwt");
      res.send({data: true});
    }catch{
      res.status(404).send({error: "User is not found"})
    }
  })

  router.delete("/friendsDelete/:id/:name", async (req, res) => {
    try {
      const { id, name } = req.params

      await User.updateOne({"_id" : id}, {"$pull" : {"friends" : { "name" : name}}}),
        { "multi" : true }

      res.send({ data: true });
    } catch {
      res.status(404).send({ error: "User is not found" })
    }
  })

  return router;
}
