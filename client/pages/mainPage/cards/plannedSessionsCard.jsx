import React, { useContext } from "react";
import { MainPageApiContext } from "../../../mainPageApiContext";
import { useLoading } from "../../../useLoading";
import { Link } from "react-router-dom";

// code for all planned sessions card on the front page

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

export function PlannedSessionsCard() {
  const { showPlannedSession } = useContext(MainPageApiContext);
  const { loading, error, data } = useLoading(
    async () => await showPlannedSession(),
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
        <>
          <div
            key={i}
            className={"main-page-components-card"}
            style={{ backgroundColor: rColors[i] }}
          >
            <Link to={"/planned-session/" + session._id}>
              {new Date(session.date).toLocaleDateString("no-NO", dateFormat)}
            </Link>
            <h5>{session.courseTitle}</h5>
            {session.todos.length === 0 ? (
              <h6></h6>
            ) : (
              <h6>{"- " + session.todos[0].todo}</h6>
            )}{" "}
            <div className={"arrow-div"}>
              <p>></p>
            </div>
          </div>
        </>
      ))}
    </>
  );
}
