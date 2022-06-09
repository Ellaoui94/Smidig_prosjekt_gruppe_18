import React, { useContext } from "react";
import { MainPageApiContext } from "../../apiContext/mainPageApiContext";
import { Link, useParams } from "react-router-dom";
import { useLoading } from "../../components/useLoading";
import { IconButton } from "@mui/material";
import { ArrowBackIosNew } from "@mui/icons-material";

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
      <IconButton
        className={"arrow-back"}
        component={Link}
        to="/main-page"
        size="large"
        aria-label="menu"
        sx={{ mr: "auto" }}
      >
        <ArrowBackIosNew />
      </IconButton>
      <br />
      <h1>{data[0].courseTitle}</h1>
      <h5 className={"session-date"}>
        {new Date(data[0].date).toLocaleDateString("no-NO", dateFormat)}
      </h5>
      <h3>{data[0].location}</h3>
      <h6 className={"session-address"}>{data[0].address}</h6>
      <hr />
      <div className={"your-evaluation-div"}>
        <h3>Din vurdering av økten</h3>
        <h5>Fokus</h5> <p>{data[0].focus}</p>
        <h5>Vurdering</h5> <p>{data[0].evaluation}</p>
        <h5>Egen kommentar</h5> <p>{data[0].comment}</p>
      </div>
      <div>
        <hr />
        <h3>Gjøremål</h3>
        {data[0].todos.length === 0 ? (
          <p>Ingen gjøremål registrert.</p>
        ) : (
          data[0].todos.map((todos) => (
            <>
              <div>
                <label>
                  <input type={"checkbox"} checked={todos.checked} readOnly />
                  {todos.todo}
                </label>
              </div>
            </>
          ))
        )}
      </div>
    </>
  );
}
