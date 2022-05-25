import React, { useContext, useEffect, useState } from "react";
import { UserApiContext } from "../../userApiContext";
import { useLoading } from "../../useLoading";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import img from './img.png'
import { Box, Button, Container, IconButton, TextField } from "@mui/material";
import { ArrowBackIosNew } from "@mui/icons-material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DatePicker } from "@mui/x-date-pickers";




export function Logout() {
  const navigate = useNavigate();
  const { endSession } = useContext(UserApiContext);
  useEffect(async () => {
    await endSession();
    navigate("/");
  });
  return <h1>Please wait...</h1>;
}

function ProfileCard({ profile: { firstName, lastName } }) {
  return (
    <>
      <div className={"profile-card"}>
        <div>
        <img src={img}/>
        <h3>
          {firstName}, {lastName}
        </h3>
        </div>

        <div>
        <h2>Kontakt:</h2>
        <h4>Facebook:</h4>
        <h4>Discord:</h4>
        <h4>Skolemail:</h4>
        </div>

        <div>
          <h2>Bio:</h2>
          <h4>Jeg studerer XXX ved UiO, er glad
          i å jobbe med teamarbeid. Ta kontakt via sosiale medier eller mail hvis du vil samarbeide! </h4>
        </div>

      <div>
      <h1>Aktive emner ⚙</h1>
      </div>

      </div>
    </>
  );
}

function DeleteButton({ label, email }) {
  const navigate = useNavigate();
  const { endSession } = useContext(UserApiContext);
  async function deleteUser() {
    await axios.delete(`${window.location.origin}/api/users/delete/${email}`)
    await endSession();
    navigate("/");
  }

  return (
    <div>
      <button onClick={deleteUser}>{label}</button>
    </div>
  );
}


export function Profile({firstName, lastName, email}) {

const profile = {firstName, lastName}

  return (
    <>
      <h1>Profile</h1>
      <p>(Profile-photo + add new photo function in here)</p>

      <Link to={"/edit"}>Endre bruker</Link>

      <DeleteButton label={"Slett bruker"} email={email}/>

      <ProfileCard profile={profile}/>

      <Link to={"/delete"}>Log out</Link>
    </>
  );
}
