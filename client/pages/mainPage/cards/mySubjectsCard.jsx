import React, { useContext } from "react";
import { MainPageApiContext } from "../../../mainPageApiContext";
import { useLoading } from "../../../useLoading";
import { Link } from "react-router-dom";

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
      {data.map((mySubjects) => (
        <>
          <div className={`${mySubjects.subject}`}>
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
