import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Button } from "@mui/material";

function DeleteFriend({ name, id }) {
  async function deleteFriend() {
    await axios.delete(
      `${window.location.origin}/api/users/friendsDelete/${id}/${name}`
    );
    location.reload();
  }

  return (
    <div>
      <Button
        onClick={deleteFriend}
        style={{
          background: "#3E989C",
          fontSize: "35px",
          fontWeight: "bold",
          color: "white",
          borderRadius: "50px",
          boxShadow:
            "rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px",
        }}
      >
        Slett venn
      </Button>
    </div>
  );
}

function ViewFriendCard({ id, friend: { name, photo } }) {
  return (
    <>
      <div className={"view-friends-card"}>
        <img src={photo} />
        <h2>{name}</h2>
        <DeleteFriend id={id} name={name} />
      </div>
    </>
  );
}

export function FriendsPage({ profile }) {
  return (
    <>
      <div className={"list-friends-page"}>
        <h1>Brukere</h1>
        <div className={"choose-view"}>
          <button>Alle venner</button>
          <button>Nære venner</button>
          <button>Forespørsler</button>
          <button>Sendte invitasjoner</button>
        </div>
        <Link to={"/add-new-friend"}>Legg til en ny venn</Link>

        {profile.friends.map((friend, i) => (
          <>
            <ViewFriendCard key={i} friend={friend} id={profile.id} />
          </>
        ))}
      </div>
    </>
  );
}
