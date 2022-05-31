import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import React, { useContext } from "react";
import { MainPageApiContext } from "../../mainPageApiContext";
import { useLoading } from "../../useLoading";
import { TodoList } from "./todoList";
import {
  GoogleMap,
  InfoWindow,
  Marker,
  useLoadScript,
} from "@react-google-maps/api";

const user = [
  {
    firstName: "Deg",
    lastName: "Degesen",
    course: "programmering",
    bio: "Join gjerne!",
  },
];

function MapView() {
  return (
    <>
      <GoogleMap
        zoom={14}
        center={{ lat: 59.911491, lng: 10.757933 }}
        mapContainerClassName="mini-map-container"
      >
        <Marker
          style={{
            backgroundColor: "red",
            width: "101px",
          }}
          icon={{
            url: "http://localhost:3000/imgProfile.a4698995.png?1653992732689",
            scaledSize: { width: 70, height: 70 },
            style: { backgroundColor: "red", width: "101px" },
          }}
          position={{ lat: 59.911481, lng: 10.757923 }}
        >
          <InfoWindow position={{ lat: 59.914551, lng: 10.757863 }}>
            <div className={"info-window"}>
              {user.map((userInfo) => (
                <div>
                  <h1>
                    {userInfo.firstName} {userInfo.lastName}
                  </h1>
                  <p>{userInfo.course}</p>
                  <p>{userInfo.bio}</p>
                </div>
              ))}
            </div>
          </InfoWindow>
        </Marker>
      </GoogleMap>
    </>
  );
}

export default function Session() {
  const { showPlannedSession } = useContext(MainPageApiContext);
  const navigate = useNavigate();
  const { sessionId } = useParams();
  const { loading, error, data } = useLoading(
    async () => await showPlannedSession({ sessionId: sessionId }),
    []
  );
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
    //to view map propery: make a new .env file in client and paste this line below:
    //NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=AIzaSyCBa-5tK7ycBCJwSEXvhaAy9q_pfN4f8Ww
    //please let it be gitIgnored
  });

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    navigate("/end-session/" + sessionId);
  };

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return (
      <div>
        <h1>Error</h1>
        <div id="error-text">{error.toString()}</div>
      </div>
    );
  }

  return (
    <div>
      <h1>{data[0].courseTitle}</h1>
      <MapView />
      <p>Endre arbeidsstatus</p>
      <div>
        <input type={"radio"} name={"set-status"} />
        <label>Tilgjengelig</label>
        <input type={"radio"} name={"set-status"} />
        <label>Opptatt</label>
        <input type={"radio"} name={"set-status"} />
        <label>Kun synlig for venner</label>
        <input type={"radio"} name={"set-status"} />
        <label>Usynlig</label>
      </div>
      <TodoList />
      <button>
        <Link to={"/end-session/" + sessionId}>Vurder økten og avslutt</Link>
      </button>
    </div>
  );
}
