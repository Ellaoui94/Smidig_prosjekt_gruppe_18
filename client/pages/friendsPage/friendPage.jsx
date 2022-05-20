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
        <h2>*profilbilde* {username}</h2>
        <p>{school}</p>
      </div>
    </>
  );
}

function allFriends() {
  return <h3>hello all friends</h3>;
}

function AllFriendsButton({ label }) {
  return (
    <div>
      <button onClick={allFriends}>{label}</button>
    </div>
  );
}

function closeFriends() {
  return <h3>hello close friends</h3>;
}

function CloseFriendsButton({ label }) {
  return (
    <div>
      <button onClick={closeFriends}>{label}</button>
    </div>
  );
}

function request() {
  return <h3>hello friend requests</h3>;
}

function RequestButton({ label }) {
  return (
    <div>
      <button onClick={request}>{label}</button>
    </div>
  );
}

function sentInvitation() {
  return <h3>hello sent invitations</h3>;
}

function SentInvitationButton({ label }) {
  return (
    <div>
      <button onClick={sentInvitation}>{label}</button>
    </div>
  );
}

export function FriendPage() {
  return (
    <>
      <h1>Venner</h1>
      <div className={"choose-view"}>
        <AllFriendsButton label={"Alle venner"} />
        <CloseFriendsButton label={"Nære venner"} />
        <RequestButton label={"Forespørsler"} />
        <SentInvitationButton label={"Sendte invitasjoner"} />
      </div>

      {viewFriends.map((friend) => (
        <>
          <ViewFriendCard key={friend.username} friend={friend} />
        </>
      ))}
    </>
  );
}
