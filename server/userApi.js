import { Router } from "express";

export function UserApi(mongoDatabase) {
  const router = new Router();

  router.get("/", async (req, res) => {
    const user = await mongoDatabase
      .collection("user")
      .find()
      .map(
        ({
          first_name,
          last_name,
          email,
          password,
          date_of_birth,
          school,
        }) => ({
          first_name,
          last_name,
          email,
          password,
          date_of_birth,
          school,
        })
      )
      .toArray();
    res.json(user);
  });

  router.post("/", (req, res) => {
    const { first_name, last_name, email, password, date_of_birth, school } =
      req.body;
    mongoDatabase
      .collection("user")
      .insertOne({
        first_name,
        last_name,
        email,
        password,
        date_of_birth,
        school,
      });
    res.sendStatus(200);
  });

  return router;
}
