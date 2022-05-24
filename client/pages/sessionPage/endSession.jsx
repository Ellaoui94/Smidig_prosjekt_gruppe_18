import { Link } from "react-router-dom";

export function EndSession() {
  return (
    <>
      <h1>Hvordan gikk studieøkten?</h1>
      <Link to={"/main-page"}>Avslutt</Link>
    </>
  );
}
