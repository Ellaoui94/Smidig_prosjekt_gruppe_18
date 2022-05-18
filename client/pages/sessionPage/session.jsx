import React from "react";

const subjects = ["Math", "Religion", "Physics", "History" ]
const types = ["Exam", "Submission", "Project"]
const locations = ["Library", "Cafe"]
const status = ["Alone", "Invisible", "Public", "Friends only"]
const goals = ["Finish exams", "Dont forget to drink water"]

export function Session() {
  return (
    <div>
      <h1>Start a Session</h1>

      <div style={{border: "1px solid black"}}>
        <h3>Subject</h3>
        {subjects.map((subject) => <div style={{border: "1px solid black", borderRadius: 12, width: 200 }}>{subject}</div>)}
      </div>


      <div>
        <h3>Type</h3>
        {types.map((type) => <div>{type}</div>)}
      </div>


      <div>
        <h3>Location</h3>
        {locations.map((location) => <div>{location}</div>)}
      </div>


      <div>
        <h3>Status</h3>
        {status.map((s) => <div>{s}</div>)}
      </div>


      <div>
        <h3>Goals</h3>
        {goals.map((goal) => <div>{goal}</div>)}
      </div>


    </div>
  );
}