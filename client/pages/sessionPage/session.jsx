import React from "react";
import { IconButton } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import "./session.css"

const subjects = ["Math", "Religion", "Physics", "History" ]
const types = ["Exam", "Submission", "Project"]
const locations = ["Library", "Cafe"]
const status = ["Alone", "Invisible", "Public", "Friends only"]
const goals = ["Finish exams", "Dont forget to drink water"]

export function Session() {
  return (
    <div>
      <h1>Start a Session</h1>

      <div className={"borderLine"}>
        <h3>Subject</h3>
        {subjects.map((subject) =>
          <IconButton>
          <div className={"itemDiv"} key={subject} >{subject}</div>
          </IconButton>
        )}
      <IconButton onClick={() => subjects.push("Culture")}>
        <AddIcon/>
      </IconButton>
      </div>


      <div className={"borderLine"}>
        <h3>Type</h3>
        {types.map((type) =>
          <IconButton>
          <div className={"itemDiv"} key={type}>{type}</div>
          </IconButton>
        )}
        <IconButton onClick={() => subjects.push("Culture")}>
          <AddIcon/>
        </IconButton>
      </div>


      <div className={"borderLine"}>
        <h3>Location</h3>
        {locations.map((location) =>
            <IconButton>
          <div className={"itemDiv"} key={location}>{location}</div>
          </IconButton>
          )}
        <IconButton onClick={() => subjects.push("Culture")}>
          <AddIcon/>
        </IconButton>
      </div>


      <div className={"borderLine"}>
        <h3>Status</h3>
        {status.map((s) =>
            <IconButton>
          <div className={"itemDiv"} key={s}>{s}</div>
          </IconButton>
          )}
        <IconButton onClick={() => subjects.push("Culture")}>
          <AddIcon/>
        </IconButton>
      </div>


      <div className={"borderLine"}>
        <h3>Goals</h3>
        {goals.map((goal) =>
            <IconButton>
          <div className={"itemDiv"} key={goal}>{goal}</div>
          </IconButton>
          )}
        <IconButton onClick={() => subjects.push("Culture")}>
          <AddIcon/>
        </IconButton>
      </div>

      <form>
      <input type="text" placeholder={"Add comment"}/>
      <div>
        <input type="file"/>
      </div>
        <button>Click to add an Image</button>
      </form>
    </div>
  );
}