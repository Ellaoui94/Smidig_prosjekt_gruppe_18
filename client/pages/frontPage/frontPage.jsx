import React from "react";
import { Link } from "react-router-dom";
import ButtonInfo from "../../components/ButtonInfo";
import { Button } from "@mui/material";
import "./frontPage.css";
import logo1 from "../../components/assests/images/logo1.png";

export function FrontPage() {
  return (
    <div className="content">
      <img src={logo1} alt="logo" />
      <h1>Velkommen</h1>

      <p>
        Finn andre studenter som passer deg og ditt faglige behov, samarbeid og
        jobb i team
      </p>

      <ButtonInfo text="Registrer deg" href="/register" />

      <Button
        component={Link}
        to="/login"
        style={{
          padding: "1vh",
          top: "2vh",
          background: "#326683",
          fontSize: "60px",
          fontWeight: "bold",
          color: "white",
          borderRadius: "50px",
        }}
      >
        {" "}
        Logg inn
      </Button>
    </div>
  );
}
