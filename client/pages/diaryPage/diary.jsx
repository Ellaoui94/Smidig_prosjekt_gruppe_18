import React, { useState } from "react";

// get today's date to use for filtering reference
const today = new Date();
let todaysDate = today.getDate() + "/" + (today.getMonth() + 1);

// data for each session, later to be taken from database
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

// filtering out plans for today and plans for later in two separate arrays
const todaysPlans = sessionData.filter((e) => e.date === todaysDate);
const futurePlans = sessionData.filter((e) => e.date !== todaysDate);

function DiarySessionCard({ session: { day, date, subject, timeframe } }) {
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
      <h4>I Dag</h4>
      <div className={"upcoming-div"}>
        {todaysPlans.map((session) => (
          <>
            {
              <DiarySessionCard
                key={session.day + session.date}
                session={session}
              />
            }
          </>
        ))}
      </div>

      <h4>Kommende</h4>
      <div className={"upcoming-div"}>
        {futurePlans.map((session) => (
          <>
            <DiarySessionCard
              key={session.day + session.date}
              session={session}
            />
          </>
        ))}
      </div>
    </>
  );
}

function FriendsPlans() {
  return (
    <>
      <h1>Friends Plans</h1>
      <h4>I Dag</h4>
      <div className={"upcoming-div"}>
        {todaysPlans.map((session) => (
          <>
            {
              <DiarySessionCard
                key={session.day + session.date}
                session={session}
              />
            }
          </>
        ))}
      </div>

      <h4>Kommende</h4>
      <div className={"upcoming-div"}>
        {futurePlans.map((session) => (
          <>
            <DiarySessionCard
              key={session.day + session.date}
              session={session}
            />
          </>
        ))}
      </div>
    </>
  );
}

export function Diary() {
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

        {showFriendsPlans ? <FriendsPlans /> : <MyPlans />}
      </div>
    </>
  );
}
