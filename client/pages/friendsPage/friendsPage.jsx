import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserApiContext } from "../../userApiContext";
import axios from "axios";
import { Button } from "@mui/material";

function DeleteFriend({ name, id }) {
  async function deleteFriend() {
    await axios.delete(`${window.location.origin}/api/users/friendsDelete/${id}/${name}`);
    location.reload()
  }

  return (
    <div>
      <Button
        onClick={deleteFriend}
        style={{
          background: "#3E989C",
          fontSize: "10px",
          fontWeight: "bold",
          color: "white",
          borderRadius: "50px",
        }}
      >
        Slett venn
      </Button>
    </div>
  );
}

function ViewFriendCard({ id ,friend: { name, photo } } ) {
  return (
    <>
      <div className={"view-friends-card"}>
        <h2>{name}</h2>
        <img src={photo}/>
        <DeleteFriend id={id} name={name}/>
      </div>
    </>
  );
}

export function FriendsPage({profile}) {
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
