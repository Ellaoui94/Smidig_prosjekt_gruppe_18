import React, { useContext, useState } from "react";
import { UserApiContext } from "../../userApiContext";

const subjectView = [
  {
    subject: "Digital teknologi",
  },
  {
    subject: "Filosofi",
  },
  {
    subject: "Design",
  },
  {
    subject: "Programmering",
  },
  {
    subject: "Se alle",
  },
];

function SubjectCard({ subjects: { subject } }) {
  return (
    <>
      <div className={"flex-item"}>
        <button>{subject}</button>
      </div>
    </>
  );
}

/* Taken from Johannes' lesson 12. Not finnished. But the thought is to filter subjects with use of buttons */
export function ListSubjects() {
  const { listSubjects } = useContext(UserApiContext);
  const [subject, setSubject] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    setSubject(subject);
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className={"filter-by-course"}>
          <h3>Finn andre studenter</h3>
          <h4>Filtrer etter emne</h4>
          <div className={"flex-container"}>
            {subjectView.map((subjects) => (
              <>
                <SubjectCard key={subjects.subject} subjects={subjects} />
              </>
            ))}
          </div>
        </div>
      </form>
    </>
  );
}
