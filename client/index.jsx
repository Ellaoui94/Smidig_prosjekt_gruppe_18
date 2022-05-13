import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { FrontPage } from "./pages/frontPage/frontPage";
import { Diary } from "./pages/diaryPage/diary";
import { Profile } from "./pages/profilePage/profile";
import { Session } from "./pages/sessionPage/session";
import { FriendsActivity } from "./pages/friendsActivityPage/friendsActivity";
import { FriendPage } from "./pages/friendsPage/friendPage";
import { NewProfile } from "./pages/registerUserPage/newProfile";
import { LoginPage } from "./pages/loginPage/loginPage";

function Application() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={"/"} element={<FrontPage />} />
        <Route path={"/register"} element={<NewProfile />} />
        <Route path={"/login/*"} element={<LoginPage />} />
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
