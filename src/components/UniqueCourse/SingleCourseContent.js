import React, { useState , useContext } from "react";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
// import { Checkbox } from "@material-ui/core";
import "./UniqueCourse.css";
import SingleLessonContent from "./SingleLessonContent";
import { MediaContext } from "../../context/MediaContext";

const SingleCourseContent = ({ lesson,index }) => {
  const [showContent, setShowContent] = useState(false);
  const{updateLessonIndex} = useContext(MediaContext)

  const handleClick = ()=>{
    setShowContent(!showContent)
    updateLessonIndex(index)
  }

  return (
    <div className="single-course-content">
      <div onClick={handleClick} className={`${!showContent ? "lesson_name" : "lesson_name clicked"}`}>
        <div>
          <h5>
            Lesson {lesson?.lesson_no} : {lesson?.lesson_name}
          </h5>
          <p>{lesson?.description}</p>
        </div>

        <button>
          {!showContent ? <ExpandMoreIcon /> : <ExpandLessIcon />}
        </button>
      </div>
      {showContent && (
        <div className="lesson_content">
          {lesson?.contents?.map((content, idx) => (
            <SingleLessonContent
              key={idx}
              index={idx}
              id={content?.content_id}
              lessonId={lesson?.lesson_id}
              singleContent={content}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default SingleCourseContent;
