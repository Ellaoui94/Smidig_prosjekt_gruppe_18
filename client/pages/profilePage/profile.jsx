import React from "react";
import { editUser } from "./editUser";

function EditUserButton({ label }) {
  return (
    <div>
      <button onClick={editUser}>{label}</button>
    </div>
  );
}

export function Profile() {
  return (
    <div>
      <h1>Profile photo / add new photo - function</h1>
      <EditUserButton label={"Rediger profil"} />
      <div id="profile">
        <h3>Brukernavn</h3>
        <p id="aboutMe">Info</p>
        <p id="age">Alder</p>
        <p id="education">Studieretning</p>
        <p id="school">Skole</p>
      </div>
    </div>
  );
}
