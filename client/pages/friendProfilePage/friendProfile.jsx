import React from "react";
import img from "../mainPage/dummyPics/img_2.png";
import { SiDiscord, SiFacebook } from "react-icons/si";

const courseView = [
  {
    course: "Matte",
  },
  {
    course: "RLE",
  },
  {
    course: "Fysikk",
  },
  {
    course: "Algoritmer og datastrukturer",
  },
];

function CourseCard({ courses: { course } }) {
  return (
    <>
      <div className={"course-card"}>
        <p>{course}</p>
      </div>
    </>
  );
}

const user = [
  {
    firstName: "Navn",
    lastName: "Navnesen",
  },
];

function ProfileCard({ profile: { firstName, lastName } }) {
  return (
    <>
      <div className={"profile-card"}>
        <h2>
          {firstName} {lastName}
        </h2>
      </div>
    </>
  );
}

export function FriendProfile() {
  return (
    <>
      <div className={"other-users-profile"}>
        <img src={img} />
        {user.map((profile) => (
          <>
            <ProfileCard key={profile.firstName} profile={profile} />
          </>
        ))}

        <div className={"contact-userinfo"}>
          <h4>Kontakt:</h4>
          <a href={`https://www.facebook.com/`}>
            <SiFacebook style={{ fontSize: 70, color: "blue" }} />
          </a>
          <a href={`https://www.discord.com/`}>
            <SiDiscord style={{ fontSize: 70, color: "#5865F2" }} />
          </a>
          <p>karl94@gmail.com</p>
        </div>
        <div className={"bio-userinfo"}>
          <h4>Bio:</h4>
          <p>
            Jeg studerer XXX ved UiO, er glad i å jobbe med teamarbeid. Ta
            kontakt via sosiale medier eller mail hvis du vil samarbeide!{" "}
          </p>
        </div>
        <h4>Aktive emner</h4>
        <div className={"active-courses-card"}>
          {courseView.map((courses) => (
            <>
              <CourseCard key={courses.course} courses={courses} />
            </>
          ))}
        </div>
      </div>
    </>
  );
}
