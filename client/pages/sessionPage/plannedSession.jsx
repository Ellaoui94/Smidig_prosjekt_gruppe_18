import { Link, useParams } from "react-router-dom";
import React, { useContext, useEffect, useState } from "react";
import { MainPageApiContext } from "../../mainPageApiContext";
import { useLoading } from "../../useLoading";

export function PlannedSession() {
  const { showPlannedSession, addNewTodo } = useContext(MainPageApiContext);
  const [todo, setTodo] = useState("");
  const [checked, setChecked] = useState("false");
  const [ws, setWs] = useState("");
  const [todoList, setTodoList] = useState([]);
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

  useEffect(() => {
    const ws = new WebSocket(window.location.origin.replace(/^http/, "ws"));
    setWs(ws);

    // get data from websockets
    ws.onmessage = (plannedTodo) => {
      const { todo, checked } = JSON.parse(plannedTodo.data);
      setTodoList((oldState) => [...oldState, { todo, checked }]);
    };
  }, []);

  async function handleSubmit(event) {
    event.preventDefault();
    await addNewTodo({ todo, checked }, { sessionId });
    //send data to websockets
    ws.send(JSON.stringify({ todo, checked }));
    setTodo("");
  }

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
      <div>
        <h3>Gjøremål</h3>
        {/* add todos from database */}
        {data[0].todos.map((todos) => (
          <>
            <div>
              <label>
                <input type={"checkbox"} />
                {todos.todo}
              </label>
            </div>
          </>
        ))}

        {/* add newly added todos from websockets */}
        {[...todoList].map((todos) => (
          <>
            <div>
              <label>
                <input type={"checkbox"} />
                {todos.todo}
              </label>
            </div>
          </>
        ))}

        {/* input field to add new todos */}
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            id="myInput"
            onChange={(e) => setTodo(e.target.value)}
            value={todo}
            placeholder="Add new todo..."
          />
          <button>Add todo</button>
        </form>
      </div>
      <Link to={"/start-session"}>Start Økt</Link>
    </>
  );
}
