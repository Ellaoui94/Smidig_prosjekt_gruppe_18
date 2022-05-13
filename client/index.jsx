import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { FrontPage } from "./pages/frontPage/frontPage";
import { Diary } from "./pages/diaryPage/diary";
import { Profile } from "./pages/profilePage/profile";
import { Session } from "./pages/sessionPage/session";
import { FriendsActivity } from "./pages/friendsActivityPage/friendsActivity";
import { FriendPage } from "./pages/friendsPage/friendPage";

function Application() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={"/"} element={<FrontPage />} />

        <Route path={"/diary"} element={<Diary />} />
        <Route path={"/profile"} element={<Profile />} />
        <Route path={"/session"} element={<Session />} />
        <Route path={"/friends-activity"} element={<FriendsActivity />} />
        <Route path={"/friend-page"} element={<FriendPage />} />
      </Routes>
    </BrowserRouter>
  );
}

ReactDOM.render(<Application />, document.getElementById("app"));
