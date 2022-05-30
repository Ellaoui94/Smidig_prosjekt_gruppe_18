import React from "react";
import { PlannedSessionsCard } from "./cards/plannedSessionsCard";
import { MySubjectsCard } from "./cards/mySubjectsCard";
import { FinishedSessionsCard } from "./cards/finishedSessionsCard";
import { Link } from "react-router-dom";
import img from "./dummyPics/img.png";
import img1 from "./dummyPics/img_1.png";
import img2 from "./dummyPics/img_2.png";
import img3 from "./dummyPics/img_3.png";
import img4 from "./dummyPics/img_4.png";
import img5 from "./dummyPics/img_5.png";
// mock data, later to be taken from database
const myFriends = [
  {
    name: "Noah",
    photo: img,
  },
  {
    name: "Mia",
    photo: img1,
  },
  {
    name: "Karl",
    photo: img2,
  },
  {
    name: "Herman",
    photo: img3,
  },
  {
    name: "Casper",
    photo: img4,
  },
  {
    name: "Emma",
    photo: img5,
  },
];

function MyFriendsCard({ myFriends: { name, photo } }) {
  return (
    <>
      <div className={"friends-wrapper"}>
        <img width={"80px"} height={"80px"} src={photo} />
        <h6 style={{ marginLeft: "10px" }}>{name}</h6>
      </div>
    </>
  );
}

function Feed() {
  return (
    <>
      <div style={{ width: "100%" }}>
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
        <div className={"friends-container"}>
          {myFriends.map((myFriends) => (
            <>
              <MyFriendsCard key={myFriends.name} myFriends={myFriends} />
            </>
          ))}
        </div>

        <h4>Tidligere arbeidsøkter</h4>
        <div className={"horizontal-scroll-div"}>
          <div className={"cards-div"}>
            <FinishedSessionsCard />
          </div>
        </div>
      </div>
    </>
  );
}

export function MainPage({ firstName }) {
  return (
    <>
      <div className={"main-div"}>
        <Link to="/add-new-friend">Legg til ny venn</Link>
        <h2>Hei, {firstName}</h2>
        <Feed />
      </div>
    </>
  );
}
