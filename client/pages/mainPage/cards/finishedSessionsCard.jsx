import React, { useContext } from "react";
import { MainPageApiContext } from "../../../mainPageApiContext";
import { useLoading } from "../../../useLoading";
import { Link } from "react-router-dom";

// code for each finished session card on the front page
const colors = [
  "#C2DBE2",
  "#FFBDBD",
  "#9FB8B5",
  "#FF8042",
  "#4C7D99",
  "#FFC76D",
  "#CFDBC1",
  "#9FB8B5",
];
const shuffle = (arr) => [...arr].sort(() => Math.random() - 0.5);
const rColors = shuffle(colors);

export function FinishedSessionsCard() {
  const { showFinishedSession } = useContext(MainPageApiContext);
  const { loading, error, data } = useLoading(
    async () => await showFinishedSession(),
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
      {data.reverse().map((session, i) => (
        <div
          key={i}
          className={"main-page-components-card"}
          style={{ backgroundColor: rColors[i] }}
        >
          <div className={"inner-main-page-card"}>
            <h5>
              {new Date(session.date).toLocaleDateString("no-NO", dateFormat)}
            </h5>

            <Link to={"/finished-session/" + session._id}>
              <h2 className={"sessions-card-header"}>{session.courseTitle}</h2>
            </Link>

            {session.todos.length === 0 ? (
              <h6>Ingen todo's lagt til.</h6>
            ) : (
              <h6>{"- " + session.todos[0].todo}</h6>
            )}
          </div>
        </div>
      ))}
    </>
  );
}
