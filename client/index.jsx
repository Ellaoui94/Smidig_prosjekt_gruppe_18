import React from "react";
import ReactDOM from "react-dom";
import {BrowserRouter, Link, Route, Routes} from "react-router-dom";
import { FrontPage } from "./pages/frontPage/frontPage";
import { Diary } from "./pages/diaryPage/diary";
import { Profile } from "./pages/profilePage/profile";
import { Session } from "./pages/sessionPage/session";
import { FriendsActivity } from "./pages/friendsActivityPage/friendsActivity";
import { FriendPage } from "./pages/friendsPage/friendPage";
import { NewProfile } from "./pages/registerUserPage/newProfile";
import { LoginPage } from "./pages/loginPage/loginPage";
import "./css/index.css"

function NavBar() {
  return (<>
    <div id={"nav-bar"}>
      <Link to={"/diary"}>Diary</Link>
      <Link to={"/session"}>Session</Link>
      <Link to={"/friends-activity"}>Friends Activity</Link>
    </div>
  </>)
}

function Application() {
  return (<>
      <BrowserRouter>
        <main>
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
        </main>

        <footer>
          <NavBar />
        </footer>
    </BrowserRouter>
  </>);
}

ReactDOM.render(<Application />, document.getElementById("app"));
