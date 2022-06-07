import React, { useContext, useEffect, useState } from "react";
import { IconButton, TextField } from "@mui/material";
import "./session.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers";

/*
  Here is the code for when you start a new session
 */
const mockSubjects = ["Filosofi", "Programmering", "Design"];
const locations = ["Bibliotek", "Cafe"];
const states = ["Alene", "Usynlig", "Offentlig", "Kun venner"];
const stage = ["active", "planned"];

export function StartSession({
  profile: { email, firstName, profileImg, id, subjects },
}) {
  const [lat, setLat] = useState(0);
  const [lng, setLng] = useState(0);
  const [ws, setWs] = useState("");
  const [location, setLocation] = useState("");
  const [locationList, setLocationList] = useState([]);

  useEffect(() => {
    const ws = new WebSocket(window.location.origin.replace(/^http/, "ws"));
    setWs(ws);

    ws.onmessage = (locations) => {
      const { location } = JSON.parse(locations.data);
      setLocationList((oldState) => [...oldState, { location }]);
    };
  }, []);

  async function handleAddNewLocation(event) {
    event.preventDefault();
    try {
      ws.send(JSON.stringify({ location }));
      setLocation("");
    } catch (error) {
      if (error.response) {
        console.log(error.response.data.message);
      }
    }
  }

  navigator.geolocation.getCurrentPosition(
    function (position) {
      setLat(position.coords.latitude);
      setLng(position.coords.longitude);
    },
    function (error) {
      console.error("Error Code = " + error.code + " - " + error.message);
    }
  );

  const [startDateSession, setStartDateSession] = useState(null);

  const [sessionData, setSessionData] = useState({
    email: "",
    courseTitle: [],
    location: "",
    studyStatus: "",
    studySessionTitle: "",
    stage: "",
    date: null,
    position: { lat, lng },
    userName: firstName,
    profileImg: profileImg,
  });

  sessionData.date = startDateSession;
  sessionData.position = { lat, lng };
  sessionData.email = email;

  const [sessionError, setSessionError] = useState("");
  const navigate = useNavigate();

  /*
  const userURL = `${window.location.origin}/api/users/getAllUsers/${id}`;
  const { data: res } = await axios.get(userURL);
  console.log("INSIDE start session " + JSON.stringify(res));



  res.map((r) => {
    setUserSubjects(r.subjects);
  });

   */

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

      if (sessionData.stage === "planned") {
        navigate("/main-page");
      } else {
        navigate("/session/" + newSessionId);
        window.location.reload(false);
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
                value={subject.subjectName}
              />
              {subject.subjectName}
            </div>
          ))}
          {mockSubjects.map((subject) => (
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
          {[...locationList].map((location) => (
            <div className={"session-card-div"}>
              <input
                type="radio"
                name="location"
                label={"location"}
                onChange={handleChange}
                value={location.location}
              />
              {location.location}
            </div>
          ))}
          <div>
            <input
              type="text"
              id="location-input"
              onChange={(e) => setLocation(e.target.value)}
              value={location}
              placeholder="Legg til nytt arbeidssted.."
            />
            <button onClick={handleAddNewLocation}>Legg til</button>
          </div>
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
              name="date"
              label={"date"}
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

        <button style={{ backgroundColor: "green", fontSize: "2vh" }}>
          Start økt
        </button>
      </form>
    </div>
  );
}
