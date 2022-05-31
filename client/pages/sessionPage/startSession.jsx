import React, { useContext, useState } from "react";
import { IconButton, TextField } from "@mui/material";
import "./session.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers";

const subjects = ["Math", "Religion", "Physics", "History"];
const locations = ["Library", "Cafe"];
const states = ["Alone", "Invisible", "Public", "Friends only"];
const stage = ["active", "planned"];
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
  const [startDateSession, setStartDateSession] = useState(null);

  const test = startDateSession;

  const [sessionData, setSessionData] = useState({
    email: "",
    courseTitle: [],
    location: "",
    studyStatus: "",
    studySessionTitle: "",
    stage: "",
    startDate: null,
  });

  sessionData.startDate = startDateSession;
  console.log("inside session: " + sessionData.startDate);
  sessionData.email = email;

  const [sessionError, setSessionError] = useState("");
  const navigate = useNavigate();

  const handleChange = ({ currentTarget: input }) => {
    setSessionData({ ...sessionData, [input.name]: input.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = `${window.location.origin}/api/session/${email}`;
      const { data: res } = await axios.post(url, sessionData);

      const addUrl = `${window.location.origin}/api/session/new-session`;
      const { data: response } = await axios.get(addUrl);

      const newSessionId = response[0]._id;
      console.log("inside handleSubmit " + response[0]._id);

      if (sessionData.stage === "planned") {
        navigate("/main-page");
      } else {
        navigate("/session/" + newSessionId);
      }

      console.log(res.message);
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        setSessionError(error.response.data.message);
      }
    }
  };

  return (
    <div className={"new-session-div"}>
      <h1>Oprett ny studieøkt</h1>

      <form onSubmit={handleSubmit}>
        <div className={"session-div"} style={{ backgroundColor: "white" }}>
          <h2>Hvilket emne vil du jobbe med?</h2>
          {subjects.map((subject) => (
            <div className={"session-card-div"}>
              <input
                type="radio"
                name="courseTitle"
                label={"courseTitle"}
                onChange={handleChange}
                value={subject}
              />
              {subject}
            </div>
          ))}
        </div>

        <div className={"session-div"} style={{ backgroundColor: "white" }}>
          <h2>Hvor vil du jobbe</h2>
          {locations.map((location) => (
            <div className={"session-card-div"}>
              <input
                type="radio"
                name="location"
                label={"location"}
                onChange={handleChange}
                value={location}
              />
              {location}
            </div>
          ))}
        </div>

        <div className={"session-div"} style={{ backgroundColor: "white" }}>
          <h2>Sett arbeidstatus for denne økten</h2>
          {states.map((status) => (
            <div className={"session-card-div"}>
              <input
                type="radio"
                name="studyStatus"
                label={"studyStatus"}
                onChange={handleChange}
                value={status}
              />
              {status}
            </div>
          ))}
        </div>

        <div className={"session-div"} style={{ backgroundColor: "white" }}>
          <h2>Ønsker du å planlegge eller starte økten</h2>
          {stage.map((stages) => (
            <div className={"session-card-div"}>
              <input
                type="radio"
                name="stage"
                label={"stage"}
                onChange={handleChange}
                value={stages}
              />
              {stages}
            </div>
          ))}
        </div>

        <div>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              name="startDate"
              label={"startDate"}
              onChange={(newValue) => setStartDateSession(newValue)}
              value={startDateSession}
              renderInput={(params) => (
                <TextField
                  style={{ background: "white" }}
                  margin={"normal"}
                  {...params}
                />
              )}
            />
          </LocalizationProvider>
        </div>

        <button style={{ backgroundColor: "green" }}>Start økt</button>
      </form>
    </div>
  );
}
