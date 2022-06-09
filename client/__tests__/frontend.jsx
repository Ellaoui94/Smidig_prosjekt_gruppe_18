import React from "react";
import ReactDOM from "react-dom";
import Session from "../pages/sessionPage/session";
import { FinishedSession } from "../pages/sessionPage/finishedSession";

/* This one is going to test frontend code */

describe("Session", () => {
  it("shows loading screen", () => {
    const element = document.createElement("div");
    ReactDOM.render(<FinishedSession />, element);
    expect(element.innerHTML).toMatchSnapshot();
  });
});
