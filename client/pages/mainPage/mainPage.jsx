import React from "react";
import { PlannedSessionsCard } from "./cards/plannedSessionsCard";
import { MySubjectsCard } from "./cards/mySubjectsCard";
import { FinishedSessionsCard } from "./cards/finishedSessionsCard";
import { Link } from "react-router-dom";
import img from "./dummyPics/img.png";
import imgProfile from '../../imgProfile.png'

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

function Feed({profile}) {
  return (
    <>
      <div>
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

        <Link to={"/friends-page"}>Mine venner</Link>

          {profile.friends.length === 0 ?
            <div>
            <Link to="/add-new-friend">Legg til ny venn</Link>
            </div>
            : (
              <div className={"friends-container"}>
              {profile.friends.map((myFriends, key) => (
                <MyFriendsCard key={key} myFriends={myFriends} />
              ))}
              </div>
            )
          }

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

export function MainPage({ profile }) {
  return (
    <>
      <div className={"main-div"}>
        <div id={"wrapper"}>
        <h2>Hei, {profile.firstName}</h2> <Link to={"/profile"}><img width={"100px"} style={{marginLeft: 20}} src={profile.profileImg}/></Link>
        </div>
        <Feed profile={profile} />
      </div>
    </>
  );
}
