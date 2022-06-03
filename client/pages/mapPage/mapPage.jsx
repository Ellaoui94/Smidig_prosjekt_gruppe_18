import React, { useEffect, useState } from "react";
import {
  GoogleMap,
  InfoWindow,
  Marker,
  useLoadScript,
} from "@react-google-maps/api";
import { ListSubjects } from "./listSubjects";
import { Link } from "react-router-dom";

const user = [
  {
    firstName: "Deg",
    lastName: "Degesen",
    course: "programmering",
    bio: "Join gjerne!",
  },
];

export function MapPage({profile}) {
  //connects to .env file
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
    //to view map properly: make a new .env file in client and paste this line below:
    //NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=AIzaSyCBa-5tK7ycBCJwSEXvhaAy9q_pfN4f8Ww
  });

  if (!isLoaded) return <div>Loading...</div>;
  return <Map profile={profile}/>;
}



function Map({profile}) {
  //const center = useMemo(() => ({ lat: 59.911491, lng: 10.757933 }), []);

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
        {profile.friends.map((userInfo) => (
          <Marker
            icon={{
              url: `${userInfo.photo}`,
              scaledSize: { width: 70, height: 70 },
            }}
            position={{ lat: 59.911481, lng: 10.757923 }}
          >
            <InfoWindow position={{ lat: 59.914551, lng: 10.757863 }}>
              <div className={"info-window"}>
                  <div>
                    <h1>
                      {userInfo.name}
                    </h1>
                  </div>
              </div>
            </InfoWindow>
          </Marker>
        ))
        }

        <Marker
          icon={{
            url: `${profile.profileImg}`,
            scaledSize: { width: 70, height: 70 },
          }}
          position={{ lat: 0, lng: 0 }}
        >
          <InfoWindow position={{lat: 0, lng: 0}}>
            <div className={"info-window"}>
              <div>
                <div>
                  <h1>{profile.firstName}</h1>
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
          onClick={() => window.location = "/friend-profile"}
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
      </GoogleMap>
    </>
  );
}
