import { GoogleApiWrapper, InfoWindow, Map, Marker } from "google-maps-react";

export default GoogleApiWrapper({
  apiKey: "AIzaSyCBa-5tK7ycBCJwSEXvhaAy9q_pfN4f8Ww",
})(MapContainer);

export function MapContainer() {
  return (
    <>
      <Map google={google} zoom={14}></Map>
      <Marker onClick={onMarkerClick} name={"Current location"} />
      <InfoWindow onClose={onInfoWindowClose}>
        <div>
          <h1></h1>
        </div>
      </InfoWindow>
    </>
  );
}

export function MapPage() {
  return (
    <>
      <h1>Map comes here</h1>;
    </>
  );
}
