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
        <Marker
          style={{
            backgroundColor: "red",
            width: "101px",
          }}
          icon={{
            url: "https://www.linkpicture.com/q/img_1.257e67a0-2.png",
            scaledSize: { width: 70, height: 70 },
            style: { backgroundColor: "red", width: "101px" },
          }}
          position={{ lat: 59.921481, lng: 10.747923 }}
        >
          <InfoWindow position={{ lat: 59.924481, lng: 10.747923 }}>
            <div className={"info-window"}>
              <div>
                <div>
                  <h1>Mia</h1>
                  <p>Design</p>
                  <p>Skal lage prototype til prosjekt, bli med den som vil!</p>
                </div>
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
            url: "https://www.linkpicture.com/q/img_2.112eb9c4-2.png",
            scaledSize: { width: 70, height: 70 },
            style: { backgroundColor: "red", width: "101px" },
          }}
          position={{ lat: 59.941481, lng: 10.767923 }}
        >
          <InfoWindow position={{ lat: 59.944481, lng: 10.767923 }}>
            <div className={"info-window"}>
              <div>
                <h1>Karl</h1>
                <p>Digital teknologi</p>
                <p>Jobber med oppgaver, bli gjerne med!</p>
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
            url: "https://www.linkpicture.com/q/img_3.874c01f9-2.png",
            scaledSize: { width: 70, height: 70 },
            style: { backgroundColor: "red", width: "101px" },
          }}
          position={{ lat: 59.961481, lng: 10.737923 }}
        >
          <InfoWindow position={{ lat: 59.964481, lng: 10.737923 }}>
            <div className={"info-window"}>
              <div>
                <h1>Herman</h1>
                <p>Programmering</p>
                <p>Skal gjøre innlevering! Bare å bli med!</p>
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
            url: "https://www.linkpicture.com/q/img_5.a230af13-2.png",
            scaledSize: { width: 70, height: 70 },
            style: { backgroundColor: "red", width: "101px" },
          }}
          position={{ lat: 59.924481, lng: 10.707923 }}
        >
          <InfoWindow position={{ lat: 59.927481, lng: 10.707923 }}>
            <div className={"info-window"}>
              <div>
                <h1>Emma</h1>
                <p>Filosofi</p>
                <p>Gjør undersøkelser om personligheter, join!</p>
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
            url: "https://www.linkpicture.com/q/img.e8ad64b6-2.png",
            scaledSize: { width: 70, height: 70 },
            style: { backgroundColor: "red", width: "101px" },
          }}
          position={{ lat: 59.954481, lng: 10.767923 }}
        >
          <InfoWindow position={{ lat: 59.957481, lng: 10.767923 }}>
            <div className={"info-window"}>
              <div>
                <h1>Noah</h1>
                <p>Digital teknologi</p>
                <p>Jobber med innlevering alene</p>
              </div>
            </div>
          </InfoWindow>
        </Marker>
      </GoogleMap>
    </>
  );
}
