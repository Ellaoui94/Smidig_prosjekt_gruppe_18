import React from "react";
import { editUser } from "./editUser";

const userProfile = [
  {
    username: "brukernavn",
    info: "informasjon",
    age: "alder",
    course: "studieretning",
    school: "skole",
  },
];

function ProfileCard({ profile: { username, info, age, course, school } }) {
  return (
    <>
      <div className={"profile-card"}>
        <h3>{username}</h3>
        <p>{info}</p>
        <p>{age}</p>
        <p>{course}</p>
        <p>{school}</p>
      </div>
    </>
  );
}

function EditUserButton({ label }) {
  return (
    <div>
      <button onClick={editUser}>{label}</button>
    </div>
  );
}

export function Profile() {
  return (
    <>
      <h1>Profile</h1>
      <p>(Profile-photo + add new photo function in here)</p>
      <EditUserButton label={"Rediger profil"} />
      {userProfile.map((profile) => (
        <>
          <ProfileCard key={profile.username} profile={profile} />
        </>
      ))}
    </>
  );
}
