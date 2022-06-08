import React, { useContext } from "react";
import { MainPageApiContext } from "../../../mainPageApiContext";
import { useLoading } from "../../../useLoading";
import { Link } from "react-router-dom";

// code for each subject card on the front page
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

export function MySubjectsCard({ profile }) {
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
      {/* Subjects from profile. User has added these themselves */}
      {profile.subjects.map((mySubjects, i) => (
        <div
          key={i}
          className={"main-page-components-card"}
          style={{ backgroundColor: rColors[i] }}
        >
          <div className={"inner-main-page-card"}>
            <Link to={"/course-view/" + mySubjects.subjectName}>
              <h2 className={"subject-card-headline"}>
                {mySubjects.subjectName}
              </h2>
            </Link>

            <h4>{mySubjects.subjectCode}</h4>
          </div>
        </div>
      ))}
      {/* Subjects from mock data */}
      {data.map((mySubjects, i) => (
        <div
          key={i}
          className={"main-page-components-card"}
          style={{ backgroundColor: rColors[i] }}
        >
          <div className={"inner-main-page-card"}>
            <Link to={"/course-view/" + mySubjects.subject}>
              <h2 className={"subject-card-headline"}>{mySubjects.subject}</h2>
            </Link>

            <h4>{mySubjects.code}</h4>
          </div>
        </div>
      ))}
    </>
  );
}
