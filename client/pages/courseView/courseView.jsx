import React, { useContext, useEffect, useState } from "react";
import { MainPageApiContext } from "../../apiContext/mainPageApiContext";
import { useLoading } from "../../components/useLoading";
import { Link, useParams } from "react-router-dom";
import "../../css/index.css";
import { ArrowBackIosNew } from "@mui/icons-material";
import { IconButton } from "@mui/material";

// code for when youre inside a course page

function MyGroupsCard({ assignments: { type, assignmentStudents } }) {
  return (
    <>
      <div className={"my-groups-card"}>
        <h4>{type}</h4>
        <hr />
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
      <div className={"my-groups-card"}>
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
  const [display, setDisplay] = useState(false);
  const { loading, error, data } = useLoading(
    async () => await showCourse({ course: course }),
    []
  );

  const [type, setType] = useState("");
  const [assignmentStudents, setAssignmentStudents] = useState([]);
  const [ws, setWs] = useState("");
  const [groupsList, setGroupsList] = useState([]);
  const groupObject = { type, assignmentStudents };

  const onChange = (e) => {
    setAssignmentStudents([...assignmentStudents, e.target.value]);
  };

  useEffect(() => {
    const ws = new WebSocket(window.location.origin.replace(/^http/, "ws"));
    setWs(ws);

    ws.onmessage = (group) => {
      const { type, assignmentStudents } = JSON.parse(group.data);
      setGroupsList((oldState) => [...oldState, { type, assignmentStudents }]);
    };
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      document
        .querySelectorAll("input[type=checkbox]")
        .forEach((el) => (el.checked = false));

      ws.send(JSON.stringify(groupObject));
      setType("");
      setAssignmentStudents([]);
    } catch (error) {
      if (error.response) {
        console.log(error.response.data.message);
      }
    }
  }

  function showForm() {
    setDisplay(!display);
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
      <button onClick={showForm} className={"add-new-group-btn"}>
        + Legg til ny gruppe
      </button>
      {display ? (
        <div className={"add-new-group-div"}>
          <form onSubmit={handleSubmit} id={"add-group-form"}>
            <div className={"input-div"}>
              <label className={"group-input-label"}>Hva er gruppen for?</label>
              <div>
                <input
                  type="text"
                  id="type-input"
                  onChange={(e) => setType(e.target.value)}
                  value={type}
                  placeholder="Skriv gruppetype her..."
                />
              </div>
            </div>
            <div className={"input-div"}>
              <label className={"group-input-label"}>
                Hvilke av dine klassekamerater er med?
              </label>
              <div>
                {data[0].students.map((students) => (
                  <div className={"session-card-div"}>
                    <input
                      className={"assignmentStudents"}
                      type="checkbox"
                      name="assignmentStudents"
                      label={"assignmentStudents"}
                      onChange={onChange}
                      value={students}
                    />
                    {students}
                  </div>
                ))}
              </div>
            </div>
            <button className={"add-group-btn"}>Legg til</button>
          </form>
        </div>
      ) : null}
      <div>
        {groupsList.map((assignments) => (
          <>
            {<MyGroupsCard key={assignments.type} assignments={assignments} />}
          </>
        ))}{" "}
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
  const [showPeople, setShowPeople] = useState(false);
  const [showMyGroups, setShowMyGroups] = useState(true);
  const { course } = useParams();

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
        <div className={"headline-div"}>
          <IconButton
            className={"arrow-back"}
            component={Link}
            to="/main-page"
            size="large"
            aria-label="menu"
            sx={{ mr: "auto" }}
          >
            <ArrowBackIosNew />
          </IconButton>
          <p className={"subject-headline"}>{course}</p>
        </div>
        <div className={"choose-groups-or-classmates-buttons-div"}>
          <button
            onClick={onClickHandlerMyGroups}
            className={"change-display-btn"}
            style={{
              backgroundColor: showMyGroups ? "#859585" : "#d8ddd8",
              color: showMyGroups ? "white" : "black",
            }}
          >
            Mine grupper
          </button>
          <button
            onClick={onClickHandlerPeople}
            className={"change-display-btn"}
            style={{
              backgroundColor: showPeople ? "#859585" : "#d8ddd8",
              color: showPeople ? "white" : "black",
            }}
          >
            Klassekamerater
          </button>
        </div>

        {/* if Groups-button is active, show MyGroups-component. Else, show People-component */}
        {showMyGroups ? <MyGroups /> : <People />}
      </div>
    </>
  );
}
