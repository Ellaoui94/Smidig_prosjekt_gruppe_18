import React, { useContext, useEffect, useState } from "react";
import { UserApiContext } from "../../userApiContext";
import { useLoading } from "../../useLoading";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import img from './img.png'
import { SiDiscord, SiFacebook } from "react-icons/si";

import { Box, Button, Container, IconButton, TextField } from "@mui/material";
import { ArrowBackIosNew } from "@mui/icons-material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DatePicker } from "@mui/x-date-pickers";
import SettingsIcon from '@mui/icons-material/Settings';
import AddSubject from "./addSubject";
import {CSSTransition} from "react-transition-group"




export function Logout() {
  const navigate = useNavigate();
  const { endSession } = useContext(UserApiContext);
  useEffect(async () => {
    await endSession();
    navigate("/");
  });
  return <h1>Please wait...</h1>;
}

function ProfileCard({ profile: { firstName, lastName, email, id } }) {
  const [faceBook, setFaceBook] = useState();
  const [discord, setDiscord] = useState();
  const [shcoolMail, setShcoolMail] = useState();
  const [bio, setBio] = useState();
  const [contactId, setContactId] = useState();
  const [clicked, setClicked] = useState(false);

  useEffect(async () => {
    const url = `${window.location.origin}/api/contactInfo/userInfo/${id}`;
    const { data: res } = await axios.get(url)
    console.log(res)
    res.map((r) => {
      setFaceBook(r.faceBook)
      setDiscord(r.discord)
      setShcoolMail(r.email)
      setBio(r.bio)
      setContactId(r._id)
    })
  }, [id])

  return (
    <>
      <div className={"profile-card"}>
        <div>
        <img src={img}/>
        <h3>
          {firstName}, {lastName}
        </h3>
        </div>

          <h2>Kontakt Info:</h2>
        {contactId === id ? <>
            <div>
              <a href={`${faceBook}`}>
                <SiFacebook style={{fontSize: 70, color: "blue"}}/>
              </a>
            </div>
            <div>
              <a href={`${discord}`}>

                <SiDiscord style={{fontSize: 70, color: "#5865F2"}}/>
              </a>

            </div>
            <div>
              <a style={{color: "#4211b2"}} href={`mailto:${email}`}><h4>{email}</h4></a>
            </div>

            <Button
              component={Link}
              to={"/"}
              style={{
                background: "#3E989C",
                fontSize: "10px",
                fontWeight: "bold",
                color: "white",
                borderRadius: "50px",
              }}
            >
              Endre kontakt info
            </Button>

            <div>
              <h2>Bio:</h2>
              <h4>{bio}</h4>
            </div>
          </>

          : (
            <Button
              component={Link}
              to={"/contactInfo"}
              style={{
                background: "#3E989C",
                fontSize: "10px",
                fontWeight: "bold",
                color: "white",
                borderRadius: "50px",
              }}>
              Legg til kontakt info
            </Button>
          )}

        <Link to={"/delete"}>Log out</Link>

        <DeleteButton label={"Slett bruker"} id={id}/>

        <div id={"wrapper"}>
          <h1>Aktive emner</h1>
          <IconButton onClick={()=> setClicked(!clicked)}>
            <SettingsIcon  className={"addSubj"} style={{fontSize: "60px", color: "#285057"}} />
          </IconButton>
        </div>
          <CSSTransition
            in={clicked}
            timeout={700}
            classNames={"alert"}
          unmountOnExit>
            <AddSubject id={id}/>
          </CSSTransition>


      </div>
    </>
  );
}

function DeleteButton({ label, id }) {
  const navigate = useNavigate();
  const { endSession } = useContext(UserApiContext);
  async function deleteUser() {
    await axios.delete(`${window.location.origin}/api/users/delete/${id}`)
    await endSession();
    navigate("/");
  }

  return (
    <div>
      <button onClick={deleteUser}>{label}</button>
    </div>
  );
}


export function Profile({firstName, lastName, email, id}) {

const profile = {firstName, lastName, email, id}

  return (
    <>
      <h1>Profile</h1>
      <p>(Profile-photo + add new photo function in here)</p>

      <Link to={"/edit"}>Endre bruker</Link>

      <ProfileCard profile={profile}/>


    </>
  );
}
