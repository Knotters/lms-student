import { useState } from "react";
import Subject from "./Subject";
import "./HomeWork.css";

const HomeWork = () => {
  const [subjects] = useState([
    { id: 1, name: "Biology", percent: 70 },
    { id: 2, name: "Physics", percent: 80 },
    { id: 3, name: "Maths", percent: 90 },
  ]);
  return (
    <div className="box1">
      <h1>Homework Progress</h1>
      <div className="subject">
        {subjects.map((subject) => (
          <Subject key={subject.id} {...subject} />
        ))}
      </div>
    </div>
  );
};

export default HomeWork;
