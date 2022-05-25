import { useMemo } from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";

export function MapPage() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyCBa-5tK7ycBCJwSEXvhaAy9q_pfN4f8Ww",
  });

  if (!isLoaded) return <div>Loading...</div>;
  return <Map />;
}

function Map() {
  return (
    <GoogleMap
      zoom={14}
      center={{ lat: 59.911491, lng: 10.757933 }}
      mapContainerClassName="map-container"
    >
      <Marker />
    </GoogleMap>
  );
}
