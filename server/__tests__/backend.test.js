import axios from "axios";
import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";

/* This test-file is testing API and database */
/** TESTS WORKS SEPARATELY, IT SEEMS LIKE THEY DON'T GET CONNECTED TO SERVER WHEN RUNNING THEM TOGETHER */

dotenv.config();

const app = express();
app.use(bodyParser.json());

describe("API connection", () => {
  it("should connect to localhost", async () => {
    const response = await axios.get("http://localhost:3000", {
      headers: {
        "Content-Type": "application/json",
      },
    });
    expect(response.status).toEqual(200);
  });

  //because this test is directly posting to database, the test only works one time.
  // go to the database and delete it if u want to test it again.
  it("should log in", async () => {
    //Register a user
    const register = await axios
      .post(
        "http://localhost:3000/api/users",
        {
          firstName: "testbruker",
          lastName: "brukertest",
          email: "test@bruker.com",
          password: "HorsePony69!Banana",
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => res.data);
    console.log(register);

    //logging in with the registered user above
    const response = await axios
      .post(
        "http://localhost:3000/api/auth",
        {
          email: "test@bruker.com",
          password: "HorsePony69!Banana",
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => res.data);
    console.log(response);
  });

  /*sometimes it works, sometimes it doesnt???!?!?
  it("should get planned sessions", async () => {
    const response = await axios.get(
      "http://localhost:3000/api/session/planned-session",
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    expect(response.status).toEqual(200);
  });*/
});
