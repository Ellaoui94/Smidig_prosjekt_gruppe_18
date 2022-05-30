import React, { useContext, useState } from "react";
import { IconButton, TextField } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import "./session.css";
import { Link, useNavigate } from "react-router-dom";
import { UserApiContext } from "../../userApiContext";
import axios from "axios";

const subjects = ["Math", "Religion", "Physics", "History"];
const locations = ["Library", "Cafe"];
const states = ["Alone", "Invisible", "Public", "Friends only"];
const colors = [
  "#C2DBE2",
  "#FFBDBD",
  "#9FB8B5",
  "#FF8042",
  "#4C7D99",
  "#FFC76D",
  "#CFDBC1",
  "#9FB8B5",
];
const shuffle = (arr) => [...arr].sort(() => Math.random() - 0.5);

const rColors = shuffle(colors);

export function StartSession({ email }) {
  const [data, setData] = useState({
    email: "",
    courseTitle: [],
    location: "",
    studyStatus: "",
    studySessionTitle: "",
  });

  console.log("inside session: " + email);
  data.email = email;

  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = `${window.location.origin}/api/session/${email}`;
      const { data: res } = await axios.post(url, data);
      navigate("/session");
      console.log(res.message);
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
    <div>
      <h1>Oprett ny studieøkt</h1>

      <form onSubmit={handleSubmit}>
        <div className={"session-div"} style={{ backgroundColor: "white" }}>
          <h2>Hvilket emne vil du jobbe med?</h2>
          {subjects.map((subject) => (
            <div className={"session-card-div"}>
              {subject}
              <input
                type="checkbox"
                name="courseTitle"
                label={"courseTitle"}
                onChange={handleChange}
                value={subject}
              />
            </div>
          ))}
        </div>

        <div className={"session-div"} style={{ backgroundColor: "white" }}>
          <h2>Hvor vil du jobbe</h2>
          {locations.map((location) => (
            <div className={"session-card-div"}>
              {location}
              <input
                type="checkbox"
                name="location"
                label={"location"}
                onChange={handleChange}
                value={location}
              />
            </div>
          ))}
        </div>

        <div className={"session-div"} style={{ backgroundColor: "white" }}>
          <h2>Sett arbeidstatus for denne økten</h2>
          {states.map((status) => (
            <div className={"session-card-div"}>
              {status}
              <input
                type="checkbox"
                name="studyStatus"
                label={"studyStatus"}
                onChange={handleChange}
                value={status}
              />
            </div>
          ))}
        </div>

        <div>
          <Link to="/main-page">Planlegg økt</Link>
        </div>
        <button style={{ backgroundColor: "green" }}>Start økt</button>
      </form>
    </div>
  );
}
