import { useNavigate, useParams } from "react-router-dom";
import React, { useContext } from "react";
import { MainPageApiContext } from "../../mainPageApiContext";
import { useLoading } from "../../useLoading";
import { TodoList } from "./todoList";
import axios from "axios";

// code for when youre inside a planned session

function DeleteButton({ label, sessionId }) {
  const navigate = useNavigate();

  //const { endPlannedSession } = useContext(MainPageApiContext);

  async function deletePlannedSession() {
    await axios.delete(`${window.location.origin}/api/session/delete/${sessionId}`);
    //await endPlannedSession();
    navigate("/main-page");
  }

  return (
    <div>
      <button style={{fontSize: "2.1vh", marginTop: "1vh", backgroundColor: "#AF0000", color: "white", borderRadius: "20px"}} onClick={deletePlannedSession}>{label}</button>
    </div>
  );
}

export function PlannedSession({ id }) {
  const { showPlannedSession } = useContext(MainPageApiContext);
  const navigate = useNavigate();
  const { sessionId } = useParams();
  const { loading, error, data } = useLoading(
    async () => await showPlannedSession({ sessionId: sessionId }),
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

  async function onClickHandler() {
    navigate("/session/" + data[0]._id);

    //change session stage from planned to active
    const url = `${window.location.origin}/api/session/set-session-to-active/${sessionId}`;
    const { data: res } = await axios.post(url, { stage: "active" });
    console.log(res.data);
  }

  return (
    <>
      <h1>{data[0].courseTitle}</h1>
      <h5>{new Date(data[0].date).toLocaleDateString("no-NO", dateFormat)}</h5>
      <h3>{data[0].location}</h3>
      <h6>{data[0].address}</h6>
      <TodoList sessionId={sessionId} />
      <button style={{fontSize: "2.5vh", marginTop: "1vh", backgroundColor: "#508B0A", color: "white", borderRadius: "20px", borderColor: "72A23A"}} onClick={onClickHandler}>Start økt</button>
      <DeleteButton label={"Slett økt"} sessionId={sessionId} />
    </>
  );
}
