import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import { StartSession } from "../pages/sessionPage/startSession";

/** This one is going to include all the test that can get something from database.
 * For example, getting user, getting session, getting a friend, getting subject, getting course
 * Im using mock-data to reduce runtime */

jest.mock("axios");

describe("get from database", () => {
  it("list out sessions", async () => {
    const response = await axios.get("/");

    //expect.assertions(1);
    /*const session = {
      email: "bla@bla.com",
      day: "mandag",
    };
    const result = { data: session };
    axios.get = jest.fn().mockResolvedValue(result);

    await expect(StartSession()).resolves.toEqual(session);

     */
  });
});
