import { Link } from "react-router-dom";

export function PlannedSessions() {
  return (
    <>
      <h1>Planlagte økter</h1>
      <Link to={"/start-session"}>Start Økt</Link>
    </>
  );
}
