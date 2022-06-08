import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import axios from "axios";

describe("API connection", () => {
  it("should connect to localhost", async () => {
    const response = await axios.get("http://localhost:3000/");
    console.log(response.data);
    expect(response.status).toEqual(200);
  });
});
