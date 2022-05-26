import { Router } from "express";
import { User } from "../models/user.js";
import bcrypt from "bcrypt";
import Joi from "joi";

const maxAge = 3 * 24 * 60 * 60;

export function AuthRoutes() {
  const router = new Router();

  /*
  Checking if the email and password is correct.
   */
  router.post("/", async (req, res) => {
    try {
      const { error } = validate(req.body);
      if (error)
        return res.status(400).send({ message: error.details[0].message });

      const user = await User.findOne({ email: req.body.email });
      if (!user)
        return res.status(401).send({ message: "Invalid Email or Password" });

      const { _id, firstName, lastName, email } = user;

      const userInfo = {
        _id: _id,
        firstName: firstName,
        lastName: lastName,
        email: email,
      };

      res.cookie("jwt", userInfo, {
        httpOnly: false,
        maxAge: maxAge * 1000,
        signed: true,
      });

      const validPassword = await bcrypt.compare(
        req.body.password,
        user.password
      );
      if (!validPassword)
        return res.status(401).send({ message: "Invalid Email or Password" });

      const token = user.generateAuthToken();
      res.status(200).send({ data: token, message: "logged in successfully" });
    } catch (error) {
      res.status(500).send({ message: "Internal Server Error" });
    }
  });

  router.get("/me", (req, res) => {
    const cookie = req.signedCookies;

    const user = {
      id: cookie.jwt._id,
      firstName: cookie.jwt.firstName,
      lastName: cookie.jwt.lastName,
      email: cookie.jwt.email,
    };

    res.json(user);
  });

  router.delete("/", (req, res) => {
    res.clearCookie("jwt");
    res.sendStatus(200);
  });

  return router;
}

//Please explain
const validate = (data) => {
  const schema = Joi.object({
    email: Joi.string().email().required().label("Email"),
    password: Joi.string().required().label("Password"),
  });
  return schema.validate(data);
};
