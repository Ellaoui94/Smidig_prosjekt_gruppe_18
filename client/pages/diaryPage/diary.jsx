import React from "react";

const sessionData = [
  {
    day: "Monday",
    date: "13. Mai",
    subject: "Smidig Prosjekt",
    status: "alone",
    duration: "2 hours",
    rating: "good",
  },
  {
    day: "Tuesday",
    date: "14. Mai",
    subject: "Avansert Java",
    status: "2 others",
    duration: "5 hours",
    rating: "ok",
  },
  {
    day: "Wednesday",
    date: "15. Mai",
    subject: "Androidprogrammering",
    status: "alone",
    duration: "9 hours",
    rating: "bad",
  },
];

function DiarySessionCard({
  session: { day, date, subject, status, duration, rating },
}) {
  return (
    <>
      <div className={"diary-session-card"}>
        <h5>
          {day}, {date}
        </h5>
        <h6>{subject}</h6>
        <div className={"evaluation-div"}>
          <p>{status}</p>
          <p>{duration}</p>
          <p>{rating}</p>
        </div>
      </div>
    </>
  );
}

function Streak() {
  return (
    <>
      <div className={"streak-div"}>
        <h5>Streak</h5>
        <p>Empty streak....</p>
      </div>
    </>
  );
}

function DailyTodos() {
  return (
    <>
      <div className={"todos-div"}>
        <h5>Todo's of today</h5>
        <form>
          <div>
            <input type={"checkbox"} name={"todo-checkbox1"} id={"goal1"} />
            <label htmlFor={"goal1"}>Goal 1</label>
          </div>
          <div>
            <input type={"checkbox"} name={"todo-checkbox1"} id={"Goal2"} />
            <label htmlFor={"goal2"}>Goal 2</label>
          </div>
          <button>Check</button>
        </form>
      </div>
    </>
  );
}

export function Diary() {
  return (
    <>
      <h1>Diary</h1>

      <div className={"choose-user-diary-buttons-div"}>
        <button>Me</button>
        <button>My Friends</button>
      </div>

      <Streak />
      <DailyTodos />

      {sessionData.map((session) => (
        <>
          <DiarySessionCard
            key={session.day + session.date}
            session={session}
          />
        </>
      ))}
    </>
  );
}
