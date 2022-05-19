import React from "react";

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

const friendsView = [
  {
    image: "profilbilde1",
    username: "Navn Navnesen1",
  },
  {
    image: "profilbilde2",
    username: "Navn Navnesen2",
  },
  {
    image: "profilbilde3",
    username: "Navn Navnesen3",
  },
];

function FriendCard({ friend: { image, username } }) {
  return (
    <>
      <div className={"friends-card"}>
        <h2>{image}</h2>
        <p>{username}</p>
      </div>
    </>
  );
}

export function FriendsActivity() {
  return (
    <>
      <div className={"top-field"}>
        <h1>Venner</h1>
        <input type={"text"} placeholder={"søk"} />
        {friendsView.map((friend) => (
          <>
            <FriendCard key={friend.username} friend={friend} />
          </>
        ))}
        <button>se alle</button>
      </div>
      <div className={"filter-courses"}>
        {courseView.map((courses) => (
          <>
            <CourseCard key={courses.course} courses={courses} />
          </>
        ))}
        <button>+</button>
      </div>
      <div className={"nearby-map"}>
        <h6>I nærheten</h6>
        <div id="map">Kart kommer snart</div>
        <p>*kart*</p>
      </div>
    </>
  );
}
