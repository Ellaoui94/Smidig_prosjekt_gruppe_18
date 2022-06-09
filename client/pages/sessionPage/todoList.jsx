import React, { useContext, useEffect, useState } from "react";
import { MainPageApiContext } from "../../mainPageApiContext";
import { useLoading } from "../../useLoading";
import axios from "axios";

// code for the to-do-list inside planned session and active session

export function TodoList({ sessionId }) {
  const { showPlannedSession } = useContext(MainPageApiContext);
  const [todo, setTodo] = useState("");
  const [checked, setChecked] = useState("false");
  const [ws, setWs] = useState("");
  const [todoList, setTodoList] = useState([]);
  const [joiError, setJoiError] = useState("");
  const { loading, error, data } = useLoading(
    async () => await showPlannedSession({ sessionId: sessionId }),
    []
  );

  const newTodo = { todo: todo };

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
    try {
      const url = `${
        window.location.origin
      }/api/session/new-todo/${sessionId}/${encodeURIComponent(
        JSON.stringify(newTodo)
      )}`;
      ws.send(JSON.stringify({ todo, checked }));
      setTodo("");
      const { data: res } = await axios.post(url, newTodo);
      //send data to websockets
      console.log(res.message);
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        setJoiError(error.response.data.message);
      }
    }
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
      <div>
        <h3>Gjøremål</h3>
        <div className={"todo-wrapper"}>
        {joiError && <div>{joiError}</div>}
        {/* add todos from database */}
        {data[0].todos.map((todos, i) => (
          <>
            <div key={i} className={"todo-div"} >
              <label>
                <input type={"radio"} />
                {todos.todo}
              </label>
            </div>
          </>
        ))}

        {/* add newly added todos from websockets */}
        {[...todoList].map((todos) => (
          <>
            <div className={"todo-div"}>
              <label>
                <input type={"radio"} />
                {todos.todo}
              </label>
            </div>
          </>
        ))}

        {/* input field to add new todos */}
        <form onSubmit={handleSubmit}>
          <input
            style={{fontSize: "1.5vh", marginTop: "1vh"}}
            type="text"
            id="myInput"
            onChange={(e) => setTodo(e.target.value)}
            value={todo}
            placeholder="Legg til nytt gjøremål.."
          />
          <button style={{fontSize: "1.4vh"}}>Legg til</button>
        </form>
        </div>
      </div>
    </>
  );
}
