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

export function Session({ email }) {
  const [data, setData] = useState({
    email: "",
    courseTitle: [""],
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
      navigate("/start-session");
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
      <h1>Start a Session</h1>

      <form onSubmit={handleSubmit}>
        <h2>Hvilket emne vil du jobbe med?</h2>
        {subjects.map((subject) => (
          <div>
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

        <h2>Hvor vil du jobbe</h2>
        {locations.map((location) => (
          <div>
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

        <h2>Sett arbeidstatus for denne økten</h2>
        {states.map((status) => (
          <div>
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

        <textarea
          name="studySessionTitle"
          label={"studySessionTitle"}
          onChange={handleChange}
          value={data.studySessionTitle}
        />

        <button>Start økt</button>
      </form>
    </div>
  );
}
