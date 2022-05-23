import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import React from "react";

export function MainPage() {
  return (
    <>
      <h1>This is the main page</h1>
      <div>
        <Link to={"/course-view"}>Filosofi</Link>
      </div>
      <div>
        <Link to={"/planned-sessions"}>Planlagt økt, Filosofi</Link>
      </div>
    </>
  );
}
