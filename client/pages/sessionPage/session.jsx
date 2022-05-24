import React, { useContext, useState } from "react";
import { IconButton, TextField } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import "./session.css";
import { Link, useNavigate } from "react-router-dom";
import { UserApiContext } from "../../userApiContext";
import axios from "axios";

const subjects = ["Math", "Religion", "Physics", "History"];
const types = ["Exam", "Submission", "Project"];
const locations = ["Library", "Cafe"];
const status = ["Alone", "Invisible", "Public", "Friends only"];
const goals = ["Finish exams", "Dont forget to drink water"];

export function Session() {
  const [data, setData] = useState({
    courseTitle: "",
    location: "",
    studyStatus: "",
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = `${window.location.origin}/api/session`;
      const { data: res } = await axios.post(url, data);
      navigate("/");
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
        <h1>Add a new Article</h1>
        <TextField
          type="text"
          name="courseTitle"
          style={{ background: "white" }}
          label={"courseTitle"}
          margin="normal"
          onChange={handleChange}
          value={data.courseTitle}
          required
        />

        <TextField
          type="text"
          name="location"
          style={{ background: "white" }}
          label={"location"}
          margin="normal"
          onChange={handleChange}
          value={data.location}
          required
        />

        <TextField
          type="text"
          name="studyStatus"
          style={{ background: "white" }}
          label={"studyStatus"}
          margin="normal"
          onChange={handleChange}
          value={data.studyStatus}
          required
        />


        <button>Save</button>
      </form>


      <Link to={"/start-session"}>Start økt</Link>
      <div className={"borderLine"}>
        <h3>Subject</h3>
        {subjects.map((subject) => (
          <IconButton>
            <div className={"itemDiv"} key={subject}>
              {subject}
            </div>
          </IconButton>
        ))}
        <IconButton onClick={() => subjects.push("Culture")}>
          <AddIcon />
        </IconButton>
      </div>

      <div className={"borderLine"}>
        <h3>Type</h3>
        {types.map((type) => (
          <IconButton>
            <div className={"itemDiv"} key={type}>
              {type}
            </div>
          </IconButton>
        ))}
        <IconButton onClick={() => subjects.push("Culture")}>
          <AddIcon />
        </IconButton>
      </div>

      <div className={"borderLine"}>
        <h3>Location</h3>
        {locations.map((location) => (
          <IconButton>
            <div className={"itemDiv"} key={location}>
              {location}
            </div>
          </IconButton>
        ))}
        <IconButton onClick={() => subjects.push("Culture")}>
          <AddIcon />
        </IconButton>
      </div>

      <div className={"borderLine"}>
        <h3>Status</h3>
        {status.map((s) => (
          <IconButton>
            <div className={"itemDiv"} key={s}>
              {s}
            </div>
          </IconButton>
        ))}
        <IconButton onClick={() => subjects.push("Culture")}>
          <AddIcon />
        </IconButton>
      </div>

      <div className={"borderLine"}>
        <h3>Goals</h3>
        {goals.map((goal) => (
          <IconButton>
            <div className={"itemDiv"} key={goal}>
              {goal}
            </div>
          </IconButton>
        ))}
        <IconButton onClick={() => subjects.push("Culture")}>
          <AddIcon />
        </IconButton>
      </div>

      <form>
        <input type="text" placeholder={"Add comment"} />
        <div>
          <input type="file" />
        </div>
        <button>Click to add an Image</button>
      </form>
    </div>
  );
}
