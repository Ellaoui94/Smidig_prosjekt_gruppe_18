import React, { useEffect, useState } from "react";
import { StudyDesign } from "./mapPage";
import { StudyPhilosophy } from "./mapPage";
import { StudyDigitalTechnology } from "./mapPage";
import { StudyProgramming } from "./mapPage";

/* filter subjects with use of buttons */
export function ListSubjects() {
  const [designSelected, setDesignSelected] = useState(false);
  const [digitalTechnologySelected, setDigitalTechnologySelected] =
    useState(false);
  const [philosophySelected, setPhilosophySelected] = useState(false);
  const [programmingSelected, setProgrammingSelected] = useState(false);

  const [selectedSubject, setSelectedSubject] = useState([]);

  useEffect(() => {
    const filteredSubjects = () => {
      if (digitalTechnologySelected) {
        return StudyDigitalTechnology();
      }
      if (designSelected) {
        return StudyDesign();
      }
      if (programmingSelected) {
        return StudyProgramming();
      }
      if (philosophySelected) {
        return StudyPhilosophy();
      }
    };
    setSelectedSubject(filteredSubjects);
  }, [
    digitalTechnologySelected,
    designSelected,
    programmingSelected,
    philosophySelected,
  ]);

  function handleSubmit(e) {
    e.preventDefault();
    setSelectedSubject(selectedSubject);
  }

  const handleDigTekButton = () => {
    setDigitalTechnologySelected(!digitalTechnologySelected);
  };

  const handlePhilosophyButton = () => {
    setPhilosophySelected(!philosophySelected);
  };

  const handleDesignButton = () => {
    setDesignSelected(!designSelected);
  };

  const handleProgrammingButton = () => {
    setProgrammingSelected(!programmingSelected);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className={"filter-by-course"}>
          <h3>Finn andre studenter</h3>
          <h4>Filtrer etter emne</h4>
          <div className={"flex-container"}>
            <div className={"flex-item"}>
              <button
                className={digitalTechnologySelected ? "clicked" : null}
                onClick={handleDigTekButton}
              >
                Digital teknologi
              </button>
              <button
                className={philosophySelected ? "clicked" : null}
                onClick={handlePhilosophyButton}
              >
                Filosofi
              </button>
              <button
                className={designSelected ? "clicked" : null}
                onClick={handleDesignButton}
              >
                Design
              </button>
              <button
                className={programmingSelected ? "clicked" : null}
                onClick={handleProgrammingButton}
              >
                Programmering
              </button>
              <button>Se alle</button>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}
/* SKROTET
{subjectView.map((subjects) => (
   <>
      <SubjectCard key={subjects.subject} subjects={subjects} />
   </>
))}

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
 */
