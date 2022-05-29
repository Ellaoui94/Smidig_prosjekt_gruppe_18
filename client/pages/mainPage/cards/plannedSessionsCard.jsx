import React, { useContext } from "react";
import { MainPageApiContext } from "../../../mainPageApiContext";
import { useLoading } from "../../../useLoading";
import { Link } from "react-router-dom";

export function PlannedSessionsCard() {
  const { showPlannedSession } = useContext(MainPageApiContext);
  const { loading, error, data } = useLoading(
    async () => await showPlannedSession(),
    []
  );

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
    <>
      {data.map((session) => (
        <>
          <div className={`${session.day}`}>
            <Link to={"/planned-session/" + session.sessionId}>
              {session.day + ", " + session.date}
            </Link>
            <h5>{session.courseTitle}</h5>
            <h6>{"- " + session.todos[0]}</h6>
            <div className={"arrow-div"}>
              <p>></p>
            </div>
          </div>
        </>
      ))}
    </>
  );
}
