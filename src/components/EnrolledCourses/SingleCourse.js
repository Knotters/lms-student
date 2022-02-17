import { Avatar } from "@material-ui/core";
import { useHistory  } from "react-router-dom";
import { MediaContext } from "../../context/MediaContext";
import {useContext} from 'react'

const SingleCourse = (props) => {
  const {
    course_image,
    course_name,
    author_picture,
    author,
    percentage_completed,
    // total_lesson,
    course,
  } = props;
  const history = useHistory();
  const{changeCurrentCourse} = useContext(MediaContext)

  const handleClick= ()=>{
    changeCurrentCourse(course)
    history.push(`/course/${course}`)
  }

  return (
    <div className="single-course-card">
      <div className="single-course-image">
        <img src={course_image} alt={course_name} />
      </div>
      <h2 className="single-course-title">{course_name}</h2>
      <div className="single-course-author">
        <Avatar src={author_picture} />
        <h2>{author}</h2>
      </div>
      <progress value={percentage_completed} max="100">
        {percentage_completed}%
      </progress>
      <div className="lessons">
        <div className="content">Completed: {percentage_completed}%</div>
        <button
          className="enrollment-course-btn"
          onClick={handleClick}
        >
          Resume
        </button>
      </div>
    </div>
  );
};

export default SingleCourse;
