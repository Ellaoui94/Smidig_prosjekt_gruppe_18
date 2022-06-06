import { Router } from "express";

export function CourseRoutes() {
  const router = new Router();

  const mySubjects = [
    {
      subject: "Filosofi",
      code: "FI201",
      students: ["Mia", "Herman", "Emma", "Anna", "Noah", "Karl", "Casper"],
      assignments: [
        {
          type: "Arbeidskrav",
          assignmentStudents: ["Herman", "Emma", "Casper"],
        },
        {
          type: "Eksamen",
          assignmentStudents: ["Herman", "Anna", "Noah", "Casper"],
        },
      ],
    },
    {
      subject: "Programmering",
      code: "PG206",
      students: ["Hanne", "Karen", "Bjørn", "Sofie", "Carl", "Mads", "Casper"],
      assignments: [
        {
          type: "Arbeidskrav",
          assignmentStudents: ["Karen", "Sofie", "Carl"],
        },
        {
          type: "Eksamen",
          assignmentStudents: ["Mads", "Hanne"],
        },
      ],
    },
    {
      subject: "Design",
      code: "DS180",
      students: [
        "Frida",
        "Truls",
        "Tina",
        "Michael",
        "Louise",
        "Ludvig",
        "Mari",
      ],
      assignments: [
        {
          type: "Arbeidskrav",
          assignmentStudents: ["Frida", "Tina", "Truls"],
        },
        {
          type: "Eksamen",
          assignmentStudents: ["Mari", "Louise", "Tina"],
        },
      ],
    },
  ];

  //Getting data from const above
  router.get("/", (req, res) => {
    const { course } = req.query;
    let queryResult = "";
    console.log("inside course site " + course);
    mySubjects.map((subject) => {
      if (subject.subject === course) {
        queryResult = mySubjects.filter(
          (mySubject) => mySubject.subject === course
        );
      } else {
        queryResult = mySubjects;
      }
    });

    res.json(queryResult);
  });

  return router;
}
