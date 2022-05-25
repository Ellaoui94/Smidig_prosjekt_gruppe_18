import React, { useState } from "react";
import { Link } from "react-router-dom";

// get today's date to use for filtering reference
const today = new Date();
let todaysDate = today.getDate() + "/" + (today.getMonth() + 1);
let tomorrowsDate = today.getDate() + 1 + "/" + (today.getMonth() + 1);
let yesterdaysDate = today.getDate() - 1 + "/" + (today.getMonth() + 1);

// data for each session, later to be taken from database
const mySubjects = [
  {
    subject: "Filosofi",
    code: "FI201",
    students: ["Mia", "Herman", "Emma", "Anna", "Noah", "Karl", "Casper"],
    assignments: [
      {
        type: "Arbeidskrav",
        assignmentStudents: ["Herman", "Emma", "Casper"],
      },
      {
        type: "Eksamen",
        assignmentStudents: ["Herman", "Anna", "Noah", "Casper"],
      },
    ],
  },
  {
    subject: "Programmering",
    code: "PG206",
    students: ["Hanne", "Karen", "Bjørn", "Sofie", "Carl", "Mads", "Casper"],
    assignments: [
      {
        type: "Arbeidskrav",
        assignmentStudents: ["Karen", "Sofie", "Carl"],
      },
      {
        type: "Eksamen",
        assignmentStudents: ["Mads", "Hanne"],
      },
    ],
  },
  {
    subject: "Design",
    code: "DS180",
    students: ["Frida", "Truls", "Tina", "Michael", "Louise", "Ludvig", "Mari"],
    assignments: [
      {
        type: "Arbeidskrav",
        assignmentStudents: ["Frida", "Tina", "Truls"],
      },
      {
        type: "Eksamen",
        assignmentStudents: ["Mari", "Louise", "Tina"],
      },
    ],
  },
];

const plannedSessions = [
  {
    day: "Mandag",
    date: todaysDate,
    courseTitle: "Filosofi",
    location: "Cafe",
    todos: ["Gjøre ferdig rapport", "Lese kapittel 5"],
  },
  {
    day: "Tirsdag",
    date: tomorrowsDate,
    courseTitle: "Smidig Prosjekt",
    location: "Cafe",
    todos: ["Planlegge sprint", "Lese kapittel 5"],
  },
  {
    day: "Onsdag",
    date: tomorrowsDate,
    courseTitle: "Design",
    location: "Cafe",
    todos: ["Starte på moodboard", "Lese kapittel 5"],
  },
];

const finishedSessions = [
  {
    day: "Mandag",
    date: yesterdaysDate,
    courseTitle: "Filosofi",
    location: "Cafe",
    todos: ["Gjøre ferdig rapport", "Lese kapittel 5"],
  },
  {
    day: "Tirsdag",
    date: yesterdaysDate,
    courseTitle: "Smidig Prosjekt",
    location: "Cafe",
    todos: ["Planlegge sprint", "Lese kapittel 5"],
  },
  {
    day: "Onsdag",
    date: yesterdaysDate,
    courseTitle: "Design",
    location: "Cafe",
    todos: ["Starte på moodboard", "Lese kapittel 5"],
  },
];

const myFriends = [
  {
    name: "Noah",
    photo: "",
  },
  {
    name: "Mia",
    photo: "",
  },
  {
    name: "Karl",
    photo: "",
  },
  {
    name: "Herman",
    photo: "",
  },
  {
    name: "Casper",
    photo: "",
  },
  {
    name: "Emma",
    photo: "",
  },
];

function MySubjectsCard({ mySubjects: { subject, code } }) {
  return (
    <>
      <div className={"main-page-components-card"}>
        <Link to={"/course-view/" + subject}>{subject}</Link>
        <h6>{code}</h6>
        <div className={"arrow-div"}>
          <p>></p>
        </div>
      </div>
    </>
  );
}

function PlannedSessionsCard({
  plannedSessions: { day, date, courseTitle, todos },
}) {
  return (
    <>
      <div className={"main-page-components-card"}>
        <h6>{day + ", " + date}</h6>
        <h5>{courseTitle}</h5>
        <h6>{"- " + todos[0]}</h6>
        <div className={"arrow-div"}>
          <p>></p>
        </div>
      </div>
    </>
  );
}

function MyFriendsCard({ myFriends: { name, photo } }) {
  return (
    <>
      <div>
        <h6>{name}</h6>
      </div>
    </>
  );
}

function FinishedSessionsCard({
  finishedSessions: { day, date, courseTitle, todos },
}) {
  return (
    <>
      <div className={"main-page-components-card"}>
        <h6>{day + ", " + date}</h6>
        <h5>{courseTitle}</h5>
        <h6>{"- " + todos[0]}</h6>
        <div className={"arrow-div"}>
          <p>></p>
        </div>
      </div>
    </>
  );
}

function Feed() {
  return (
    <>
      <h4>Mine emner</h4>
      <div className={"horizontal-scroll-div"}>
        <div className={"cards-div"}>
          {mySubjects.map((mySubjects) => (
            <>
              {
                <MySubjectsCard
                  key={mySubjects.subject}
                  mySubjects={mySubjects}
                />
              }
            </>
          ))}
        </div>
      </div>

      <h4>Planlagte arbeidsøkter</h4>
      <div className={"horizontal-scroll-div"}>
        <div className={"cards-div"}>
          {plannedSessions.map((plannedSessions) => (
            <>
              <PlannedSessionsCard
                key={plannedSessions.date}
                plannedSessions={plannedSessions}
              />
            </>
          ))}
        </div>
      </div>

      <h4>Mine venner</h4>
      <div className={"horizontal-scroll-div"}>
        <div className={"cards-div"}>
          {myFriends.map((myFriends) => (
            <>
              <MyFriendsCard key={myFriends.name} myFriends={myFriends} />
            </>
          ))}
        </div>
      </div>

      <h4>Tidligere arbeidsøkter</h4>
      <div className={"horizontal-scroll-div"}>
        <div className={"cards-div"}>
          {finishedSessions.map((finishedSessions) => (
            <>
              {
                <FinishedSessionsCard
                  key={finishedSessions.day + finishedSessions.date}
                  finishedSessions={finishedSessions}
                />
              }
            </>
          ))}
        </div>
      </div>
    </>
  );
}

export function MainPage() {
  return (
    <>
      <div className={"main-div"}>
        <h2>Hei, Navn</h2>
        <Feed />
      </div>
    </>
  );
}
