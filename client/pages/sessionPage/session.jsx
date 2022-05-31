import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import React, { useContext } from "react";
import { MainPageApiContext } from "../../mainPageApiContext";
import { useLoading } from "../../useLoading";
import { TodoList } from "./todoList";

export default function Session() {
  const { showPlannedSession } = useContext(MainPageApiContext);
  const navigate = useNavigate();
  const { sessionId } = useParams();
  const { loading, error, data } = useLoading(
    async () => await showPlannedSession({ sessionId: sessionId }),
    []
  );

  const handleSubmit = async (e) => {
    e.preventDefault();

    navigate("/end-session/" + sessionId);
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
    <div>
      <h1>{data[0].courseTitle}</h1>
      <p>Her skal kart komme</p>
      <p>Endre arbeidsstatus</p>
      <div>
        <input type={"radio"} name={"set-status"} />
        <label>Tilgjengelig</label>
        <input type={"radio"} name={"set-status"} />
        <label>Opptatt</label>
        <input type={"radio"} name={"set-status"} />
        <label>Kun synlig for venner</label>
        <input type={"radio"} name={"set-status"} />
        <label>Usynlig</label>
      </div>
      <TodoList />
      <button>
        <Link to={"/end-session/" + sessionId}>Vurder økten og avslutt</Link>
      </button>
    </div>
  );
}
