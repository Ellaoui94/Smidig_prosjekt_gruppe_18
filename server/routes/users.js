import { Router } from "express";
import { User, validate } from "../models/user.js";
import bcrypt from "bcrypt";

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
      if (user)
        return res
          .status(409)
          .send({ message: "User with given email already Exist!" });

      const salt = await bcrypt.genSalt(Number(process.env.SALT));
      const hashPassword = await bcrypt.hash(req.body.password, salt);

      await new User({ ...req.body, password: hashPassword }).save();
      res.status(201).send({ message: "User created successfully" });
    } catch (error) {
      res.status(500).send({ message: "Internal Server Error" });
    }
  });

  return router;
}
