import { useMemo } from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";

export function MapPage() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyCBa-5tK7ycBCJwSEXvhaAy9q_pfN4f8Ww",
    //Have to put the Api key into .env later (it doesnt work now somehow)
  });

  if (!isLoaded) return <div>Loading...</div>;
  return <Map />;
}

function Map() {
  /*
  GoogleMap is the dependency where we get the map from and can edit zoom and center. map-container the size adjusted in the CSS-file
  Marker is the position for the marker (duh), it is hardcoded to be in Oslo sentrum.*/
  return (
    <GoogleMap
      zoom={14}
      center={{ lat: 59.911491, lng: 10.757933 }}
      mapContainerClassName="map-container"
    >
      <Marker position={{ lat: 59.911491, lng: 10.757933 }} />
    </GoogleMap>
  );
}
