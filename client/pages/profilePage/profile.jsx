import React, { useContext, useEffect, useState } from "react";
import { UserApiContext } from "../../userApiContext";
import { useLoading } from "../../useLoading";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import img from "./img.png";
import { SiDiscord, SiFacebook } from "react-icons/si";

import { Box, Button, Container, IconButton, TextField } from "@mui/material";
import { ArrowBackIosNew } from "@mui/icons-material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DatePicker } from "@mui/x-date-pickers";
import SettingsIcon from "@mui/icons-material/Settings";
import AddSubject from "./addSubject";
import { CSSTransition } from "react-transition-group";

export function Logout() {
  const { endSession } = useContext(UserApiContext);
  useEffect(async () => {
    await endSession();
    window.location = "/";
  });
  return <h1>Please wait...</h1>;
}

function ProfileCard({ profile: { firstName, lastName, email, id } }) {
  const [faceBook, setFaceBook] = useState();
  const [discord, setDiscord] = useState();
  const [bio, setBio] = useState();
  const [contactId, setContactId] = useState();

  const [clicked, setClicked] = useState(false);

  const [userSubjects, setUserSubjects] = useState([]);
  const [newSubject, setNewSubject] = useState([]);

  useEffect(async () => {
    const url = `${window.location.origin}/api/contactInfo/userInfo/${id}`;
    const { data: res } = await axios.get(url);
    res.map((r) => {
      setFaceBook(r.faceBook);
      setDiscord(r.discord);
      setBio(r.bio);
      setContactId(r._id);
    });

    const userURL = `${window.location.origin}/api/users/getAllUsers/${id}`;
    const { data: response } = await axios.get(userURL);
    response.map((r) => {
      setUserSubjects(r.subjects);
    });
  }, [id]);

  return (
    <>
      <div className={"profile-card"}>
        <div>
          <img src={img} />
          <h3>
            {firstName}, {lastName}
          </h3>
        </div>

        <h2>Kontakt Info:</h2>
        {contactId === id ? (
          <>
            <div>
              <a href={`${faceBook}`}>
                <SiFacebook style={{ fontSize: 70, color: "blue" }} />
              </a>
            </div>
            <div>
              <a href={`${discord}`}>
                <SiDiscord style={{ fontSize: 70, color: "#5865F2" }} />
              </a>
            </div>
            <div>
              <a style={{ color: "#4211b2" }} href={`mailto:${email}`}>
                <h4>{email}</h4>
              </a>
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
        ) : (
          <Button
            component={Link}
            to={"/contactInfo"}
            style={{
              background: "#3E989C",
              fontSize: "10px",
              fontWeight: "bold",
              color: "white",
              borderRadius: "50px",
            }}
          >
            Legg til kontakt info
          </Button>
        )}

        <Button
          component={Link}
          to={"/delete"}
          style={{
            background: "#3E989C",
            fontSize: "10px",
            fontWeight: "bold",
            color: "white",
            borderRadius: "50px",
          }}
        >
          Logg ut
        </Button>

        <div id={"wrapper"}>
          <h1>Aktive emner</h1>
          <IconButton onClick={() => {
            setClicked(!clicked);
            if(!clicked){
              scroll(0, 500)
            }else {
              scroll(0, -500)
            }
          }}>
            <SettingsIcon
              className={"addSubj"}
              style={{ fontSize: "60px", color: "#285057" }}
            />
          </IconButton>
        </div>

        {userSubjects.map((subject, key) => (
          <div key={key} className={"subjectDiv"}>{subject.subjectName}</div>
        ))}
        {newSubject.map((subject, key) => (
          <div key={key} className={"subjectDiv"}>{subject.subjectName}</div>
          ))}

        <CSSTransition
          in={clicked}
          timeout={700}
          classNames={"alert"}
          unmountOnExit
        >
          <AddSubject id={id} setNewSubject={setNewSubject} />
        </CSSTransition>
      </div>
    </>
  );
}

export function DeleteButton({ label, id }) {
  const navigate = useNavigate();
  const { endSession } = useContext(UserApiContext);
  async function deleteUser() {
    await axios.delete(`${window.location.origin}/api/users/delete/${id}`);
    await endSession();
    navigate("/");
  }

  return (
    <div>
      <Button
        onClick={deleteUser}
        style={{
          background: "#3E989C",
          fontSize: "10px",
          fontWeight: "bold",
          color: "white",
          borderRadius: "50px",
        }}
      >
        {label}
      </Button>
    </div>
  );
}


export function Profile({profile: {firstName, lastName, email, id}}) {

const profile = {firstName, lastName, email, id}

  return (
    <>
      <h1>Profile</h1>
      <p>(Profile-photo + add new photo function in here)</p>

      <Button
        component={Link}
        to={"/edit"}
        style={{
          background: "#3E989C",
          fontSize: "10px",
          fontWeight: "bold",
          color: "white",
          borderRadius: "50px",
        }}
      >
        Endre bruker
      </Button>

      <ProfileCard profile={profile} />
    </>
  );
}
