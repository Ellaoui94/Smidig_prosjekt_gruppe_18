import React, { useContext, useEffect, useState } from "react";
import { editUser } from "./editUser";
import { UserApiContext } from "../../userApiContext";
import { useLoading } from "../../useLoading";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";


async function getUser() {
  const res = await axios.get(`${window.location.origin}/api/auth/me`)

  const user = {firstName: res.data.firstName, lastName: res.data.lastName, email: res.data.email}

  return user
}

export function Logout() {
  const navigate = useNavigate();
  const { endSession } = useContext(UserApiContext);
  useEffect(async () => {
    await endSession();
    navigate("/");
  });
  return <h1>Please wait...</h1>;
}

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

function EditUserButton({ label }) {
  return (
    <div>
      <button onClick={editUser}>{label}</button>
    </div>
  );
}

export function Profile() {
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();

  useEffect(async () => {
    const user = await getUser()

    console.log(user)

    setFirstName(user.firstName)
    setLastName(user.lastName)
  }, [])

const profile = {firstName, lastName}

  return (
    <>
      <h1>Profile</h1>
      <p>(Profile-photo + add new photo function in here)</p>
      <EditUserButton label={"Rediger profil"} />

      <ProfileCard profile={profile}/>

      <Link to={"/delete"}>Log out</Link>
    </>
  );
}
