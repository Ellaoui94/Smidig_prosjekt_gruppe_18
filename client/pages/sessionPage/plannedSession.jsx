import { Link, useParams } from "react-router-dom";
import React, { useContext } from "react";
import { MainPageApiContext } from "../../mainPageApiContext";
import { useLoading } from "../../useLoading";

export function PlannedSession() {
  const { showPlannedSession } = useContext(MainPageApiContext);
  const { sessionId } = useParams();
  const { loading, error, data } = useLoading(
    async () => await showPlannedSession({ sessionId: sessionId }),
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
      <h1>{data[0].courseTitle}</h1>
      <h5>{data[0].day + ", " + data[0].date}</h5>
      <h3>{data[0].location}</h3>
      <h6>{data[0].address}</h6>
      <div>
        <h3>Gjøremål</h3>
        {data[0].todos.map((todos) => (
          <>
            <div>
              <label>
                <input type={"checkbox"} />
                {todos}
              </label>
            </div>
          </>
        ))}
      </div>
      <Link to={"/start-session"}>Start Økt</Link>
    </>
  );
}
