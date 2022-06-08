import axios from "axios";
import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";

/* A common test-file that is testing API and database */
dotenv.config();

const app = express();
app.use(bodyParser.json());

describe("API connection", () => {
  //IT WORKS DO NOT TOUCH!!
  it.only("should connect to localhost", async () => {
    const response = await axios.get("http://localhost:3000", {
      headers: {
        "Content-Type": "application/json",
      },
    });
    expect(response.status).toEqual(200);
  });

  //sometimes it works, sometimes it doesnt???!?!?
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
  });

  //sometimes it works, sometime not, doesnt know why?
  it("should get finished sessions", async () => {
    const response = await axios.get(
      "http://localhost:3000/api/session/finished-session",
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
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

  /*it.only("get friend", async () => {
    //log in first (we should do this in a better way..)
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

    const friend = await axios
      .get("http://localhost:3000/api/session/finished-session", {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => res.data);
    console.log(friend);
    expect(friend.id).toEqual();
    //expect(friend.status).toEqual(200);
  });*/

  //TODO: if we add a token to .env file we can use that as a "fake-login" so we can make more tests,
  // without having to log in with user all the time
});
