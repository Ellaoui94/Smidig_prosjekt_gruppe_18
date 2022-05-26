import React from "react";
import { PlannedSessionsCard } from "./cards/plannedSessionsCard";
import { MySubjectsCard } from "./cards/mySubjectsCard";
import { FinishedSessionsCard } from "./cards/finishedSessionsCard";

// mock data, later to be taken from database
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

function MyFriendsCard({ myFriends: { name, photo } }) {
  return (
    <>
      <div>
        <h6>{name}</h6>
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
          <MySubjectsCard />
        </div>
      </div>

      <h4>Planlagte arbeidsøkter</h4>
      <div className={"horizontal-scroll-div"}>
        <div className={"cards-div"}>
          <PlannedSessionsCard />
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
          <FinishedSessionsCard />
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
