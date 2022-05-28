import React, { useState } from "react";
import {
  GoogleMap,
  InfoWindow,
  Marker,
  useLoadScript,
} from "@react-google-maps/api";
import { ListSubjects } from "./listSubjects";

const user = [
  {
    firstName: "Navn",
    lastName: "Navnesen",
    course: "programmering",
    bio: "Join gjerne! Jobber med innlevering 2",
  },
];

export function MapPage() {
  //connects to .env file
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
    //to view map propery: make a new .env file in client and paste this line below:
    //NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=AIzaSyCBa-5tK7ycBCJwSEXvhaAy9q_pfN4f8Ww
  });

  if (!isLoaded) return <div>Loading...</div>;
  return <Map />;
}

function Map() {
  //const center = useMemo(() => ({ lat: 59.911491, lng: 10.757933 }), []);
  const [selected, setSelected] = useState(null);

  /*
  GoogleMap is the dependency where we get the map from and can edit zoom and center. map-container the size adjusted in the CSS-file
  Marker is the position for the marker (duh), it is hardcoded to be in Oslo sentrum.*/

  //TODO
  // 1. Bruker skal sette inn sin posisjon med onClick. Plan B: bruker skriver inn adresse selv
  // 2. Lokasjon til bruker skal lagres,evt marker-funksjon. Plan B: andres brukere blir dummydata
  // 3. Prøv å bruk samme map til session og mapPage sånn at posisjon blir satt i session. Plan b: hardkodet
  // 4. Koble sammen profilbilde og info-vindu
  // 4. Filtrer ut fra emner som skal vises på kart. Plan B: drit i det
  // 5. Fikse CSS på bruker

  return (
    <>
      <ListSubjects />
      <GoogleMap
        zoom={14}
        center={{ lat: 59.911491, lng: 10.757933 }}
        mapContainerClassName="map-container"
      >
        <Marker
          style={{
            backgroundColor: "red",
            width: "101px",
          }}
          icon={{
            url: "https://cdn.dribbble.com/users/2638821/screenshots/9213234/media/d51ac680af06d6c9642b145ebe24633f.jpg?compress=1&resize=400x300",
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
        <Marker
          style={{
            backgroundColor: "red",
            width: "101px",
          }}
          icon={{
            url: "https://play-lh.googleusercontent.com/I-Yd5tJnxw7Ks8FUhUiFr8I4kohd9phv5sRFHG_-nSX9AAD6Rcy570NBZVFJBKpepmc=w240-h480-rw",
            scaledSize: { width: 70, height: 70 },
            style: { backgroundColor: "red", width: "101px" },
          }}
          position={{ lat: 59.921481, lng: 10.747923 }}
        >
          <InfoWindow position={{ lat: 59.921481, lng: 10.747923 }}>
            <div className={"info-window"}>
              <div>
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
            </div>
          </InfoWindow>
        </Marker>
        <Marker
          style={{
            backgroundColor: "red",
            width: "101px",
          }}
          icon={{
            url: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZmlsZXxlbnwwfHwwfHw%3D&w=1000&q=80",
            scaledSize: { width: 70, height: 70 },
            style: { backgroundColor: "red", width: "101px" },
          }}
          position={{ lat: 59.941481, lng: 10.767923 }}
        >
          <InfoWindow position={{ lat: 59.941481, lng: 10.767923 }}>
            <div className={"info-window"}>
              <div>
                <h1>Oda Jensen</h1>
                <p>Sykepleier</p>
                <p>Jobber med eksamensoppgaver, bli med!</p>
              </div>
            </div>
          </InfoWindow>
        </Marker>
      </GoogleMap>
    </>
  );
}
