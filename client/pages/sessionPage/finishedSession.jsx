import React, { useContext } from "react";
import { MainPageApiContext } from "../../mainPageApiContext";
import { useParams } from "react-router-dom";
import { useLoading } from "../../useLoading";

// code for when you end a session, where the evaluation data of active session gets saved
export function FinishedSession() {
  const { showFinishedSession } = useContext(MainPageApiContext);
  const { sessionId } = useParams();
  const { loading, error, data } = useLoading(
    async () => await showFinishedSession({ sessionId: sessionId }),
    []
  );
  const dateFormat = {
    weekday: "long",
    month: "long",
    day: "numeric",
  };

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
      <h5>{new Date(data[0].date).toLocaleDateString("no-NO", dateFormat)}</h5>
      <h3>{data[0].location}</h3>
      <h6>{data[0].address}</h6>
      <h3>Din vurdering av økten:</h3>
      <h5>Fokus: {data[0].focus}</h5>
      <h5>Vurdering: {data[0].evaluation}</h5>
      <h5>Egen kommentar: {data[0].comment}</h5>
      <div>
        <h3>Gjøremål</h3>
        {data[0].todos.map((todos) => (
          <>
            <div>
              <label>
                <input type={"checkbox"} checked={todos.checked} readOnly />
                {todos.todo}
              </label>
            </div>
          </>
        ))}
      </div>
    </>
  );
}
