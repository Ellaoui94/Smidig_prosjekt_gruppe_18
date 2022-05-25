import React, { useContext, useState } from "react";
import { FrontpageApiContext } from "../../frontpageApiContext";
import { useLoading } from "../../useLoading";
import { useParams } from "react-router-dom";

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
  const { showCourse } = useContext(FrontpageApiContext);
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
  const { showCourse } = useContext(FrontpageApiContext);
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

  console.log(data[0].assignments[0].assignmentStudents);

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
  const { showCourse } = useContext(FrontpageApiContext);
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
      return;
    } else {
      setShowPeople((current) => !current);
      setShowMyGroups((current) => !current);
    }
    console.log(showPeople.toString());
    console.log(showMyGroups.toString());
  }

  function onClickHandlerMyGroups() {
    if (showMyGroups === true) {
      return;
    } else {
      setShowPeople((current) => !current);
      setShowMyGroups((current) => !current);
    }
    console.log(showPeople.toString());
    console.log(showMyGroups.toString());
  }

  return (
    <>
      <div className={"main-div"}>
        <div>
          {data.map((course) => (
            <>
              <p>{course.subject}</p>
            </>
          ))}
        </div>
        <div className={"choose-user-diary-buttons-div"}>
          <button onClick={onClickHandlerPeople}>Personer</button>
          <button onClick={onClickHandlerMyGroups}>Mine grupper</button>
        </div>

        {/* */}
        {showMyGroups ? <MyGroups /> : <People />}
      </div>
    </>
  );
}
