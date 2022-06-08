import React, { useContext, useEffect, useState } from "react";
import { UserApiContext } from "../../userApiContext";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import img from "../../imgProfile.png";
import { SiDiscord, SiFacebook } from "react-icons/si";
import FileBase64 from "react-file-base64";

import { Backdrop, Box, Button, Fade, IconButton, Modal } from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import AddSubject from "./addSubject";
import { CSSTransition } from "react-transition-group";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 800,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  borderRadius: "50px"
};

export function Logout() {
  const { endSession } = useContext(UserApiContext);
  useEffect(async () => {
    await endSession();
    window.location = "/";
  });
  return <h1>Please wait...</h1>;
}

function ProfileCard({
  profile: { firstName, lastName, email, subjects, id, profileImg },
}) {
  const mockSubjects = ["Filosofi", "Programmering", "Design"];
  const [faceBook, setFaceBook] = useState();
  const [discord, setDiscord] = useState();
  const [bio, setBio] = useState();
  const [contactId, setContactId] = useState();
  const [imgString, setImgString] = useState("");

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [clicked, setClicked] = useState(false);

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
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = `${window.location.origin}/api/users/pictureUpdate/${id}`;
      const { data: res } = await axios.post(url, imgString);
      localStorage.setItem("token", res.data);
      location.reload();
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
          {profileImg ? (
            <>
              <div>Klikk på bilde for å endre profil bilde</div>
              <a onClick={handleOpen}>
                <img src={profileImg} />
              </a>
            </>
          ) : (
            <>
              <div>Klikk på bilde for å legge til profil bilde</div>
              <a onClick={handleOpen}>
                <img src={img} />
              </a>
            </>
          )}

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
                    <div className={"input-file"}>
                    <FileBase64
                      type="file"
                      multiple={false}
                      onDone={({ base64 }) =>
                        setImgString({ ...imgString, profileImg: base64 })
                      }
                    />
                    <Button
                      type={"submit"}
                      style={{
                        background: "#5D7C8D",
                        fontSize: "30px",
                        fontWeight: "bold",
                        color: "white",
                        borderRadius: "50px",
                        boxShadow:
                          "rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px",
                      }}
                    >
                      Last opp
                    </Button>
                    </div>
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
            <div className={"contact-wrapper"}>
              <div>
                <a href={`${faceBook}`}>
                  <SiFacebook style={{ fontSize: 100, color: "blue" }} />
                </a>
              </div>
              <div>
                <a href={`${discord}`}>
                  <SiDiscord style={{ fontSize: 100, color: "#5865F2" }} />
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
                  padding: "20px",
                  fontSize: "40px",
                  background: "#5D7C8D",
                  fontWeight: "bold",
                  color: "white",
                  borderRadius: "50px",
                  boxShadow:
                    "rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px",
                }}
              >
                Endre kontakt info
              </Button>

              <div>
                <h2>Bio:</h2>
                <h4>{bio}</h4>
              </div>
            </div>
          </>
        ) : (
          <Button
            component={Link}
            to={"/contactInfo"}
            style={{
              padding: "20px",
              fontSize: "40px",
              background: "#5D7C8D",
              fontWeight: "bold",
              color: "white",
              borderRadius: "50px",
              boxShadow:
                "rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px",
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
              marginTop: "20px",
              padding: "20px",
              fontSize: "40px",
              background: "#5D7C8D",
              fontWeight: "bold",
              color: "white",
              borderRadius: "50px",
              boxShadow:
                "rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px",
            }}
          >
            Logg ut
          </Button>
        </div>
        <div id={"wrapper"}>
          <h1>Aktive emner</h1>
          <IconButton
            onClick={() => {
              setClicked(!clicked);
              if (!clicked && !contactId) {
                scroll(0, 500);
              } else if (!clicked && contactId) {
                setTimeout(() => scroll(0, window.innerHeight), 1);
              } else {
                scroll(0, -300);
              }
            }}
          >
            <SettingsIcon
              className={"addSubj"}
              style={{ fontSize: "60px", color: "#285057" }}
            />
          </IconButton>
        </div>

        <div style={{ padding: "5px" }}>
          {mockSubjects.map((subject, key) => (
            <div key={key} className={"subjectDiv"}>
              {subject}
            </div>
          ))}
          {subjects.map((subject, key) => (
            <div key={key} className={"subjectDiv"}>
              {subject.subjectName}
            </div>
          ))}
          {newSubject.map((subject, key) => (
            <div key={key} className={"subjectDiv"}>
              {subject.subjectName}
            </div>
          ))}
        </div>

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
  const { endSession } = useContext(UserApiContext);

  async function deleteUser() {
    await axios.delete(`${window.location.origin}/api/users/delete/${id}`);
    await endSession();
    window.location = "/";
  }

  return (
    <div>
      <Button
        onClick={deleteUser}
        style={{
          background: "#3E989C",
          fontSize: "30px",
          fontWeight: "bold",
          color: "white",
          borderRadius: "50px",
          boxShadow:
            "rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px",
        }}
      >
        {label}
      </Button>
    </div>
  );
}

export function Profile({ profile }) {
  return (
    <>
      <Button
        component={Link}
        to={"/edit"}
        style={{
          marginTop: "100px",
          background: "#5D7C8D",
          padding: "20px",
          fontSize: "40px",
          fontWeight: "bold",
          color: "white",
          borderRadius: "50px",
          boxShadow:
            "rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px",
        }}
      >
        Endre på bruker
      </Button>

      <ProfileCard profile={profile} />
    </>
  );
}
