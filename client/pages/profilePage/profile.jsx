import React, { useContext } from "react";
import { editUser } from "./editUser";
import { UserApiContext } from "../../userApiContext";
import { useLoading } from "../../useLoading";

function ProfileCard({ profile: { first_name, last_name } }) {
  return (
    <>
      <div className={"profile-card"}>
        <h3>
          {last_name}, {first_name}{" "}
        </h3>
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
  const { listUser } = useContext(UserApiContext);

  const { loading, error, data } = useLoading(listUser);

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return (
      <div>
        <h1>Error</h1>
        <div id="error-text">{error.toString()}</div>
      </div>
    );
  }
  return (
    <>
      <h1>Profile</h1>
      <p>(Profile-photo + add new photo function in here)</p>
      <EditUserButton label={"Rediger profil"} />
      {data.map((profile) => (
        <>
          <ProfileCard key={profile.first_name} profile={profile} />
        </>
      ))}
    </>
  );
}
