import { Link } from "react-router-dom";

export function StartSession() {
  return (
    <>
      <h1>Etter å ha trykket start på start siden kommer man hit</h1>
      <Link to={"/end-session"}>Vurder økten og avslutt</Link>
    </>
  );
}
