import React, { useContext, useState } from "react";
import { MainPageApiContext } from "../../mainPageApiContext";
import { useLoading } from "../../useLoading";
import { useParams } from "react-router-dom";

// code for when youre inside a course page

function MyGroupsCard({ assignments: { type, assignmentStudents } }) {
  return (
    <>
      <div className={"my-groups-card"}>
        <h4>{type}</h4>
        {assignmentStudents.map((students) => (
          <>
            <h5 key={students}>{students}</h5>
          </>
        ))}
      </div>
    </>
  );
}

function People() {
  const { showCourse } = useContext(MainPageApiContext);
  const { course } = useParams();
  const { loading, error, data } = useLoading(
    async () => await showCourse({ course: course }),
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
      <div className={"people-in-course-div"}>
        <ul>
          {data[0].students.map((students) => (
            <>
              <li>{students}</li>
            </>
          ))}
        </ul>
      </div>
    </>
  );
}

function MyGroups() {
  const { showCourse } = useContext(MainPageApiContext);
  const { course } = useParams();
  const { loading, error, data } = useLoading(
    async () => await showCourse({ course: course }),
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
      <div className={"upcoming-div"}>
        {data[0].assignments.map((assignments) => (
          <>
            {<MyGroupsCard key={assignments.type} assignments={assignments} />}
          </>
        ))}
      </div>
    </>
  );
}

export function CourseView() {
  const [showPeople, setShowPeople] = useState(true);
  const [showMyGroups, setShowMyGroups] = useState(false);
  const { showCourse } = useContext(MainPageApiContext);
  const { course } = useParams();
  const { loading, error, data } = useLoading(
    async () => await showCourse({ course: course }),
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

  // keeps track of which button is active, so the right component is displayed when clicking a button
  function onClickHandlerPeople() {
    // if button is already active, do nothing. else, switch.
    if (showPeople === true) {
    } else {
      setShowPeople((current) => !current);
      setShowMyGroups((current) => !current);
    }
  }

  function onClickHandlerMyGroups() {
    if (showMyGroups === true) {
    } else {
      setShowPeople((current) => !current);
      setShowMyGroups((current) => !current);
    }
  }

  return (
    <>
      <div className={"main-div"}>
        <div>{course}</div>
        <div className={"choose-user-diary-buttons-div"}>
          <button onClick={onClickHandlerPeople}>Personer</button>
          <button onClick={onClickHandlerMyGroups}>Mine grupper</button>
        </div>

        {/* if Groups-button is active, show MyGroups-component. Else, show People-component */}
        {showMyGroups ? <MyGroups /> : <People />}
      </div>
    </>
  );
}
