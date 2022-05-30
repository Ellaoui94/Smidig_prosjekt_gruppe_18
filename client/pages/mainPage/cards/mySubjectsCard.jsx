import React, { useContext } from "react";
import { MainPageApiContext } from "../../../mainPageApiContext";
import { useLoading } from "../../../useLoading";
import { Link } from "react-router-dom";

const colors = ['#C2DBE2', '#FFBDBD', '#9FB8B5', '#FF8042', '#4C7D99', '#FFC76D', '#CFDBC1', '#9FB8B5'];
const shuffle = arr => [...arr].sort(() => Math.random() - 0.5);
const rColors = shuffle(colors)

export function MySubjectsCard() {
  const { showCourse } = useContext(MainPageApiContext);
  const { loading, error, data } = useLoading(
    async () => await showCourse(),
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
      {data.map((mySubjects, i) => (
        <>
          <div className={"main-page-components-card"} style={{backgroundColor: rColors[i]}}>
            <Link to={"/course-view/" + mySubjects.subject}>
              {mySubjects.subject}
            </Link>
            <h6>{mySubjects.code}</h6>
            <div className={"arrow-div"}>
              <p>></p>
            </div>
          </div>
        </>
      ))}
    </>
  );
}
