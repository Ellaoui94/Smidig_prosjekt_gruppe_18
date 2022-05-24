import React, { useEffect, useState } from "react";
import axios from "axios";

function ProfileCard({ profile: { firstName, lastName } }) {
  return (
    <>
      <div className={"profile-card"}>
        <h3>
          {firstName}, {lastName}
        </h3>
      </div>
    </>
  );
}

export function FriendProfile() {
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();

  const profile = { firstName, lastName };

  return (
    <>
      <h1>Friend's profile</h1>
      <p>(Profile-photo)</p>
      <button>Add friend</button>
      <ProfileCard profile={profile} />
    </>
  );
}
