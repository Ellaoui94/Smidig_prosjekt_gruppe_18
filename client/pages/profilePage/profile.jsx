import React, { useContext, useEffect, useState } from "react";
import { UserApiContext } from "../../userApiContext";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import img from "./img.png";
import { SiDiscord, SiFacebook } from "react-icons/si";
import FileBase64 from 'react-file-base64';

import { Backdrop, Box, Button, Fade, IconButton, Modal } from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import AddSubject from "./addSubject";
import { CSSTransition } from "react-transition-group";


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export function Logout() {
  const { endSession } = useContext(UserApiContext);
  useEffect(async () => {
    await endSession();
    window.location = "/";
  });
  return <h1>Please wait...</h1>;
}

function ProfileCard({ profile: { firstName, lastName, email, id, profileImg } }) {
  const [faceBook, setFaceBook] = useState();
  const [discord, setDiscord] = useState();
  const [bio, setBio] = useState();
  const [contactId, setContactId] = useState();
  const [imgString, setImgString] = useState("");

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [clicked, setClicked] = useState(false);

  const [userSubjects, setUserSubjects] = useState([]);
  const [newSubject, setNewSubject] = useState([]);

  const [error, setError] = useState("");


  useEffect(async () => {
    const url = `${window.location.origin}/api/contactInfo/userInfo/${id}`;
    const { data: res } = await axios.get(url);
    res.map((r) => {
      setFaceBook(r.faceBook);
      setDiscord(r.discord);
      setBio(r.bio);
      setContactId(r._id);
    });

    const userURL = `${window.location.origin}/api/users/getUser/${id}`;
    const { data: response } = await axios.get(userURL);
    response.map((r) => {
      setUserSubjects(r.subjects);
    });
  }, [id]);

  const handleSubmit = async (e) => {
    try {
      const url = `${window.location.origin}/api/users/pictureUpdate/${id}`;
      const { data: res } = await axios.post(url, imgString);
      localStorage.setItem("token", res.data);
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        setError(error.response.data.message);
      }
    }
  };

  return (
    <>
      <div className={"profile-card"}>
        <div>
          {profileImg ?
            <>
            <div>Klikk på bilde for å endre profil bilde</div>
            <a onClick={handleOpen}><img src={profileImg} /></a>
            </>
            :
            <>
            <div>Klikk på bilde for å legge til profil bilde</div>
            <a onClick={handleOpen}><img src={img} /></a>
            </>
          }

          <div>
            <Modal
              aria-labelledby="transition-modal-title"
              aria-describedby="transition-modal-description"
              open={open}
              onClose={handleClose}
              closeAfterTransition
              BackdropComponent={Backdrop}
              BackdropProps={{
                timeout: 500,
              }}
            >
              <Fade in={open}>
                <Box sx={style}>
                  <form onSubmit={handleSubmit}>
                    {error && <div>{error}</div>}
                    <FileBase64
                      type="file"
                      multiple={false}
                      onDone={({ base64 }) => setImgString({ ...imgString, profileImg: base64 })}
                    />
                    <Button
                      type={"submit"}
                      style={{
                        background: "#5D7C8D",
                        fontSize: "10px",
                        fontWeight: "bold",
                        color: "white",
                        borderRadius: "50px"
                      }}
                    >Last opp</Button>
                  </form>
                </Box>
              </Fade>
            </Modal>
          </div>

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
              to={"/editContactInfo"}
              style={{
                background: "#5D7C8D",
                fontSize: "10px",
                fontWeight: "bold",
                color: "white",
                borderRadius: "50px"
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
              background: "#5D7C8D",
              fontSize: "10px",
              fontWeight: "bold",
              color: "white",
              borderRadius: "50px"
            }}
          >
            Legg til kontakt info
          </Button>
        )}
        <div>
          <Button
            component={Link}
            to={"/delete"}
            style={{
              background: "#5D7C8D",
              fontSize: "10px",
              fontWeight: "bold",
              color: "white",
              borderRadius: "50px"
            }}
          >
            Logg ut
          </Button>
        </div>
        <div id={"wrapper"}>
          <h1>Aktive emner</h1>
          <IconButton onClick={() => {
            setClicked(!clicked);
            if (!clicked && !contactId) {
              scroll(0, 500);
            } else if (!clicked && contactId) {
              setTimeout(() => scroll(0,800), 400)
            } else {
              scroll(0, -300)
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
          borderRadius: "50px"
        }}
      >
        {label}
      </Button>
    </div>
  );
}


export function Profile({ profile: { firstName, lastName, email, id, profileImg } }) {

  const profile = { firstName, lastName, email, id, profileImg };

  return (
    <>
      <h1>Profile</h1>
      <Button
        component={Link}
        to={"/edit"}
        style={{
          background: "#5D7C8D",
          fontSize: "10px",
          fontWeight: "bold",
          color: "white",
          borderRadius: "50px"
        }}
      >
        Endre bruker
      </Button>

      <ProfileCard profile={profile} />
    </>
  );
}
