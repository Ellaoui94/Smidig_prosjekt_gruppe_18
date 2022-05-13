import React from "react";

export function Profile() {
  return (
    <div>
      <h1>Profile photo / add new photo - function</h1>
      <EditUserButton label={"Rediger profil"} />
      <h3>Simen sjømann</h3>
      <p id="aboutMe">Litt om seg selv..</p>
      <p id="age">24</p>
      <p id="education">IT</p>
      <p id="school">Høyskolen Kristiania</p>
    </div>
  );
}
