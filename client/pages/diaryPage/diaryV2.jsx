import React, { useState } from "react";

// get today's date to use for filtering reference
const today = new Date();
let todaysDate = today.getDate() + "/" + (today.getMonth() + 1);

// data for each session, later to be taken from database
const goals = [
  {
    goal: "Studèr en time",
    task: "Lage flashcards",
    accomplished: "50%",
  },
  {
    goal: "Lese kapittel 12",
    task: "Kunnskap",
    accomplished: "30%",
  },
  {
    goal: "Starte på innlevering",
    task: "Skrive intro",
    accomplished: "90%",
  },
  {
    goal: "Studere",
    task: "Studere litt",
    accomplished: "45%",
  },
];

const assignments = [
  {
    subject: "Smidig Prosjekt",
    type: "Eksamen",
    accomplished: "75%",
  },
  {
    subject: "Fysikk",
    type: "Obligatorisk",
    accomplished: "20%",
  },
  {
    subject: "Avansert Java",
    type: "Prøve",
    accomplished: "0%",
  },
  {
    subject: "Matte",
    type: "Konteeksamen",
    accomplished: "80%",
  },
];

const sessionData = [
  {
    day: "Monday",
    date: todaysDate,
    subject: "Smidig Prosjekt",
    timeframe: "14:00 - 16:00",
  },
  {
    day: "Monday",
    date: todaysDate,
    subject: "Avansert Java",
    timeframe: "14:00 - 16:00",
  },
  {
    day: "Tuesday",
    date: "19/5",
    subject: "Androidprogrammering",
    timeframe: "14:00 - 16:00",
  },
  {
    day: "Wednesday",
    date: "20/5",
    subject: "Enterpriseprogrammering",
    timeframe: "14:00 - 16:00",
  },
];

function GoalsCard({ goals: { goal, task, accomplished } }) {
  return (
    <>
      <div className={"diary-session-card"}>
        <div className={"card-header"}>
          <h5>{goal}</h5>
        </div>
        <h6>{task}</h6>
        <div className={"accomplished-div"}>
          <p>Fullført</p>
          <p>{accomplished}</p>
        </div>
      </div>
    </>
  );
}

function AssignmentCard({ assignments: { subject, type, accomplished } }) {
  return (
    <>
      <div className={"diary-session-card"}>
        <div className={"card-header"}>
          <h5>{subject}</h5>
        </div>
        <h6>{type}</h6>
        <div className={"accomplished-div"}>
          <p>Fullført</p>
          <p>{accomplished}</p>
        </div>
      </div>
    </>
  );
}

function SessionCard({ session: { day, date, subject, timeframe } }) {
  return (
    <>
      <div className={"diary-session-card"}>
        <div className={"card-header"}>
          <h5>
            {day}, {date}
          </h5>
        </div>
        <h6>{subject}</h6>
        <p>{timeframe}</p>
      </div>
    </>
  );
}

function MyPlans() {
  return (
    <>
      <h1>My Plans</h1>
      <button>+ Prosjekt</button>
      <h4>Mål</h4>
      <div className={"horizontal-scroll-div"}>
        <div className={"cards-div"}>
          {goals.map((goals) => (
            <>{<GoalsCard key={goals.goal} goals={goals} />}</>
          ))}
        </div>
      </div>

      <h4>Innlevering</h4>
      <div className={"horizontal-scroll-div"}>
        <div className={"cards-div"}>
          {assignments.map((assignments) => (
            <>
              <AssignmentCard
                key={assignments.subject + assignments.type}
                assignments={assignments}
              />
            </>
          ))}
        </div>
      </div>

      <h4>Planlagte økter</h4>
      <div className={"horizontal-scroll-div"}>
        <div className={"cards-div"}>
          {sessionData.map((session) => (
            <>
              {
                <SessionCard
                  key={session.day + session.date}
                  session={session}
                />
              }
            </>
          ))}
        </div>
      </div>
    </>
  );
}

function FriendsPlans() {
  return (
    <>
      <h1>Friends' Plans</h1>
      <button>+ Prosjekt</button>

      <div className={"plans-div"}>
        <h4>Mål</h4>
        <div className={"horizontal-scroll-div"}>
          <div className={"cards-div"}>
            {goals.map((goals) => (
              <>{<GoalsCard key={goals.goal} goals={goals} />}</>
            ))}
          </div>
        </div>

        <h4>Innlevering</h4>
        <div className={"horizontal-scroll-div"}>
          <div className={"cards-div"}>
            {assignments.map((assignments) => (
              <>
                <AssignmentCard
                  key={assignments.subject + assignments.type}
                  assignments={assignments}
                />
              </>
            ))}
          </div>
        </div>

        <h4>Planlagte økter</h4>
        <div className={"horizontal-scroll-div"}>
          <div className={"cards-div"}>
            {sessionData.map((session) => (
              <>
                {
                  <SessionCard
                    key={session.day + session.date}
                    session={session}
                  />
                }
              </>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export function DiaryV2() {
  const [showMyPlans, setShowMyPlans] = useState(true);
  const [showFriendsPlans, setShowFriendsPlans] = useState(false);

  // keeps track of which button is active, so the right component is displayed when clicking a button
  function onClickHandlerMyPlans() {
    setShowMyPlans((current) => !current);
    setShowFriendsPlans((current) => !current);
    console.log(showMyPlans.toString());
    console.log(showFriendsPlans.toString());
  }

  function onClickHandlerFriendsPlans() {
    setShowMyPlans((current) => !current);
    setShowFriendsPlans((current) => !current);
    console.log(showMyPlans.toString());
    console.log(showFriendsPlans.toString());
  }

  return (
    <>
      <div className={"diary-div"}>
        <div className={"choose-user-diary-buttons-div"}>
          <button onClick={onClickHandlerMyPlans}>Me</button>
          <button onClick={onClickHandlerFriendsPlans}>My Friends</button>
        </div>

        {/* */}
        {showFriendsPlans ? <FriendsPlans /> : <MyPlans />}
      </div>
    </>
  );
}
