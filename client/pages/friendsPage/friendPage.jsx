import React from "react";

const viewFriends = [
  {
    username: "Navn Navnesen",
    school: "Høyskolen Kristiania",
  },
  {
    username: "Ola Halvorsen",
    school: "Høyskolen Kristiania",
  },
  {
    username: "Navn Navnesen3",
    school: "Høyskolen Kristiania",
  },
  {
    username: "Navn Navnesen4",
    school: "Høyskolen Kristiania",
  },
  {
    username: "Navn Navnesen5",
    school: "Høyskolen Kristiania",
  },
  {
    username: "Navn Navnesen6",
    school: "Høyskolen Kristiania",
  },
];

function ViewFriendCard({ friend: { username, school } }) {
  return (
    <>
      <div className={"view-friends-card"}>
        <h2>{username}</h2>
        <p>{school}</p>
      </div>
    </>
  );
}

export function FriendPage() {
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

        {viewFriends.map((friend) => (
          <>
            <ViewFriendCard key={friend.username} friend={friend} />
          </>
        ))}
      </div>
    </>
  );
}
