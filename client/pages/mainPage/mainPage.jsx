import React from "react";
import { PlannedSessionsCard } from "./cards/plannedSessionsCard";
import { MySubjectsCard } from "./cards/mySubjectsCard";
import { FinishedSessionsCard } from "./cards/finishedSessionsCard";
import { Link } from "react-router-dom";
import img from "./dummyPics/img.png";
import imgProfile from "../../imgProfile.png";

// main page. first page you see when you log in, with all the subjects and sessions listed

function MyFriendsCard({ myFriends: { name, photo } }) {
  return (
    <div className={"friends-wrapper"}>
      <img width={"80px"} height={"80px"} src={photo} />
      <h6 style={{ marginLeft: "10px" }}>{name}</h6>
    </div>
  );
}

function Feed({ profile }) {
  return (
    <>
      <div>
        <h4 className={"frontpage-card-headlines"}>Mine emner</h4>
        <div className={"horizontal-scroll-div"}>
          <div className={"cards-div"}>
            <MySubjectsCard profile={profile} />
          </div>
        </div>

        <h4 className={"frontpage-card-headlines"}>Planlagte arbeidsøkter</h4>
        <div className={"horizontal-scroll-div"}>
          <div className={"cards-div"}>
            <PlannedSessionsCard />
          </div>
        </div>

        <div className={"friends-headline-div"}>
          <h4 className={"friends-headline"}>Mine venner</h4>
          <h6 className={"see-all-friends-link"}>
            <Link to={"/friends-page"}>Se alle</Link>
          </h6>
        </div>
        <div className={"friends-card-div"}>
          {profile.friends.length === 0 ? (
            <div>
              <p>Du har ingen venner ennå!</p>
              <p>
                Finn nye venner <Link to="/add-new-friend">her</Link>.
              </p>
            </div>
          ) : (
            <div className={"friends-container"}>
              {profile.friends.slice(0, 9).map((myFriends, key) => (
                <MyFriendsCard key={key} myFriends={myFriends} />
              ))}
            </div>
          )}
        </div>

        <h4 className={"frontpage-card-headlines"}>Tidligere arbeidsøkter</h4>
        <div className={"horizontal-scroll-div"}>
          <div className={"cards-div"}>
            <FinishedSessionsCard />
          </div>
        </div>
      </div>
    </>
  );
}

export function MainPage({ profile }) {
  return (
    <>
      <div className={"main-div"}>
        <div id={"wrapper"}>
          <Link to={"/profile"}>
            {profile.profileImg ? (
              <img
                width={"100px"}
                style={{ marginLeft: 20 }}
                src={profile.profileImg}
              />
            ) : (
              <img
                width={"100px"}
                style={{ marginLeft: 20 }}
                src={imgProfile}
              />
            )}
          </Link>
          <div>
            <h2>Hei, {profile.firstName}</h2>
          </div>
        </div>
        <Feed profile={profile} />
      </div>
    </>
  );
}
