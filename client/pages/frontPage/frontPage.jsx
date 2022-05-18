import React from "react";
import { Link } from "react-router-dom";
import ButtonInfo from "../../components/ButtonInfo";
import { Button } from "@mui/material";
import './frontPage.css'
import logo1 from '../../components/assests/images/logo1.png'
import { LoginButton } from "../../components/LoginButton";

export function FrontPage() {
  return (
      <div className="content">
        <img src={logo1} alt="logo" />
        <h1>Velkommen</h1>

        <p>
          Finn en kollokviegruppe
          som passer deg og ditt faglige behov.
        </p>

        <ButtonInfo text="Registrer deg" href="/register"/>

        <Button component={Link} to="/login" style={{top: "10px", background: "#023F4A", fontSize: "25px", fontWeight: "bold", color: "#DCE5D1", borderRadius: "50px"}}> Logg inn</Button>

        <p>Eller registrer og logg deg inn med skole mailen din</p>

        <LoginButton
          label={
            "Login via Høyskolen Kristiania"
          }
          provider={"microsoft"}
        />
      </div>
  );
}
