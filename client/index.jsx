import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import { FrontPage } from "./pages/frontPage/frontPage";
import { Logout, Profile } from "./pages/profilePage/profile";
import Session from "./pages/sessionPage/session";
import { FriendsActivity } from "./pages/friendsActivityPage/friendsActivity";
import { FriendsPage } from "./pages/friendsPage/friendsPage";
import { NewProfile } from "./pages/registerUserPage/newProfile";
import { LoginPage } from "./pages/loginPage/loginPage";
import "./css/index.css";
import { MapPage } from "./pages/mapPage/mapPage";
import { MainPage } from "./pages/mainPage/mainPage";
import { CourseView } from "./pages/courseView/courseView";
import { StartSession } from "./pages/sessionPage/startSession";
import { EndSession } from "./pages/sessionPage/endSession";
import { PlannedSession } from "./pages/sessionPage/plannedSession";
import { EditProfile } from "./pages/profilePage/editProfile";
import axios from "axios";
import AddContactInfo from "./pages/profilePage/addContactInfo";
import { FriendProfile } from "./pages/friendProfilePage/friendProfile";
import { FinishedSession } from "./pages/sessionPage/finishedSession";
import { AddNewFriendPage } from "./pages/addNewFriendPage/addNewFriendPage";
import NotFound from "./notFound";
import RoomIcon from "@mui/icons-material/Room";
import imgPic from "./img.png";
import HouseIcon from "@mui/icons-material/House";
import imgProfile from "./imgProfile.png";
import PageOne from "./pages/introPages/pageOne";
import PageTwo from "./pages/introPages/pageTwo";
import PageThree from "./pages/introPages/pageThree";
import AnimatedRoutes from "./pages/introPages/AnimatedRoutes";
import EditContactInfo from "./pages/profilePage/editContactInfo";

async function getUser() {
  const res = await axios.get(`${window.location.origin}/api/auth/me`);

  const user = {
    id: res.data.id,
    firstName: res.data.firstName,
    lastName: res.data.lastName,
    email: res.data.email,
  };

  return user;
}

function NavBar() {
  return (
    <>
      <div id={"nav-bar"}>
        <Link to={"/main-page"}>
          <HouseIcon style={{ fontSize: "50px" }} />
        </Link>
        <Link to={"/start-session"}>
          <img style={{ height: "75%" }} src={imgPic} />
        </Link>
        <Link to={"/map-page"}>
          <RoomIcon style={{ fontSize: "50px" }} />
        </Link>
      </div>
    </>
  );
}

//Please change the function name. I suck at this.
function HeaderBar() {
  return (
    <>
      <div id={"header"}>
        <Link to={"/profile"}>
          <img src={imgProfile} />
        </Link>
      </div>
    </>
  );
}

function Application() {
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [email, setEmail] = useState();
  const [id, setId] = useState();
  const [friends, setFriends] = useState([]);
  const [location, setLocation] = useState();
  const [profileImg, setProfileImg] = useState("");
  const [registered, setRegistered] = useState(false);
  const [subjects, setSubjects] = useState([]);
  const [allUsers, setAllUsers] = useState([]);


  useEffect(async () => {
    const user = await getUser();
    setFirstName(user.firstName);
    setLastName(user.lastName);
    setEmail(user.email);
    setId(user.id);

    const userURL = `${window.location.origin}/api/users/getUser/${id}`;
    const { data: response } = await axios.get(userURL);
    response.map((r) => {
      setFirstName(r.firstName);
      setLastName(r.lastName);
      setEmail(r.email);
      setId(r._id);
      setFriends(r.friends);
      setLocation(r.subjects[0].location)
      setProfileImg(r.profileImg)
      setSubjects(r.subjects);
    });


    /*const allUsers = `${window.location.origin}/api/users/getAllUsers`;
    const { data: res } = await axios.get(allUsers);
    res.map((r) => {
      setAllUsers(r)
    });*/
  }, [id]);

  const profile = {
    firstName,
    lastName,
    email,
    friends,
    id,
    profileImg,
    subjects,
    location
  };
  const user = localStorage.getItem("token");

  return (
    <>
      <BrowserRouter>
        <main>
          <Routes>
            {id === undefined ? (
              <>
                <Route path={"/"} element={<FrontPage />} />
                <Route
                  path={"/register"}
                  element={<NewProfile setRegistered={setRegistered} />}
                />
                {registered && (
                  <Route
                    path={"/intro/*"}
                    element={<AnimatedRoutes setRegistered={setRegistered} />}
                  />
                )}
                <Route path={"/login/*"} element={<LoginPage />} />
                <Route path={"*"} element={<NotFound />} />
              </>
            ) : (
              <>
                <Route
                  path={"/main-page"}
                  element={<MainPage profile={profile} />}
                />
                <Route
                  path={"/profile"}
                  element={<Profile profile={profile} />}
                />
                <Route
                  path={"/contactInfo"}
                  element={<AddContactInfo id={id} />}
                />
                <Route
                  path={"/editContactInfo"}
                  element={<EditContactInfo id={id} />}
                />
                <Route path={"/edit"} element={<EditProfile id={id} />} />
                <Route path={"/delete"} element={<Logout />} />

                <Route
                  path={"/session/:sessionId"}
                  element={<Session email={email} />}
                />
                <Route
                  path={"/start-session"}
                  element={<StartSession profile={profile} />}
                />
                <Route
                  path={"/end-session/:sessionId"}
                  element={<EndSession emailInput={email} />}
                />
                <Route
                  path={"/planned-session/:sessionId"}
                  element={<PlannedSession />}
                />
                <Route
                  path={"/finished-session/:sessionId"}
                  element={<FinishedSession />}
                />

                <Route
                  path={"/add-new-friend"}
                  element={<AddNewFriendPage id={id} />}
                />
                <Route
                  path={"/friends-page"}
                  element={<FriendsPage profile={profile} />}
                />
                <Route path={"/friend-profile"} element={<FriendProfile />} />
                <Route
                  path={"/friends-activity"}
                  element={<FriendsActivity />}
                />

                <Route path={"/map-page"} element={<MapPage profile={profile} />} />
                <Route path={"/course-view/:course"} element={<CourseView />} />
                <Route path={"*"} element={<NotFound id={id} />} />
              </>
            )}
          </Routes>
        </main>

        {id && (
          <footer>
            <NavBar />
          </footer>
        )}
      </BrowserRouter>
    </>
  );
}

ReactDOM.render(<Application />, document.getElementById("app"));
