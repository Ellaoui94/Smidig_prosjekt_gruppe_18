import React, { useContext, useEffect, useState } from "react";
import { MainPageApiContext } from "../../mainPageApiContext";
import { useParams } from "react-router-dom";
import { useLoading } from "../../useLoading";

export function TodoList() {
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
    </>
  );
}
