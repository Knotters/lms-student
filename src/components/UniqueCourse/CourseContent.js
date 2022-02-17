import React from "react";
import SingleCourseContent from "./SingleCourseContent";

const CourseContent = ({ lessons }) => {
  return (
    <div className="course-content">
      <div className="course-content-header">
        <h4>Course content</h4>
      </div>
      {lessons?.map((lesson,idx) => (
        <SingleCourseContent key={lesson?.lesson_id} index={idx} lesson={lesson} />
      ))}
    </div>
  );
};

export default CourseContent;
