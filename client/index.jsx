import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import { FrontPage } from "./pages/frontPage/frontPage";
import { Diary } from "./pages/diaryPage/diary";
import { DiaryV2 } from "./pages/diaryPage/diaryV2";
import { Profile } from "./pages/profilePage/profile";
import { Session } from "./pages/sessionPage/session";
import { FriendsActivity } from "./pages/friendsActivityPage/friendsActivity";
import { FriendPage } from "./pages/friendsPage/friendPage";
import { NewProfile } from "./pages/registerUserPage/newProfile";
import { LoginPage } from "./pages/loginPage/loginPage";
import "./css/index.css";
import { MapPage } from "./pages/mapPage/mapPage";
import { MainPage } from "./pages/mainPage/mainPage";
import { CourseView } from "./pages/courseView/courseView";
import { StartSession } from "./pages/sessionPage/startSession";
import { EndSession } from "./pages/sessionPage/endSession";
import { PlannedSessions } from "./pages/sessionPage/plannedSessions";

function NavBar() {
  return (
    <>
      <div id={"nav-bar"}>
        <Link to={"/main-page"}>Hovedside</Link>
        <Link to={"/session"}>Legg til ny studieøkt</Link>
        <Link to={"/map-page"}>Kart</Link>
      </div>
    </>
  );
}

//Please change the function name. I suck at this.
function HeaderBar() {
  return (
    <>
      <div id={"header"}>
        <Link to={"/profile"}>Profil</Link>
      </div>
    </>
  );
}

function Application() {
  return (
    <>
      <BrowserRouter>
        <header>
          <HeaderBar />
        </header>
        <main>
          <Routes>
            <Route path={"/"} element={<FrontPage />} />
            <Route path={"/register"} element={<NewProfile />} />
            <Route path={"/login/*"} element={<LoginPage />} />
            <Route path={"/main-page"} element={<MainPage />} />
            <Route path={"/diary"} element={<DiaryV2 />} />
            <Route path={"/profile"} element={<Profile />} />
            <Route path={"/session"} element={<Session />} />
            <Route path={"/start-session"} element={<StartSession />} />
            <Route path={"/end-session"} element={<EndSession />} />
            <Route path={"/planned-sessions"} element={<PlannedSessions />} />
            <Route path={"/friends-activity"} element={<FriendsActivity />} />
            <Route path={"/friend-page"} element={<FriendPage />} />
            <Route path={"/map-page"} element={<MapPage />} />
            <Route path={"/course-view"} element={<CourseView />} />
          </Routes>
        </main>

        <footer>
          <NavBar />
        </footer>
      </BrowserRouter>
    </>
  );
}

ReactDOM.render(<Application />, document.getElementById("app"));
