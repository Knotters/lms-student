import React,{useState,useEffect} from "react";

const AboutCourse = ({ CourseDetails }) => {

  const[lectures , setLectures]= useState(0)

  useEffect(()=>{

    let p=0;
    CourseDetails?.lessons.forEach(lesson =>{
       p = p + lesson?.contents?.length
    })

    setLectures(p)


  },[])

  return (
    <div className="course-overview">
      <div className="course-about">
        <h2>About this course</h2>

        <p>{CourseDetails?.course_description}</p>
      </div>

      <div className="course-details">
        <p>Lessons : {CourseDetails?.totallesson}</p>
        <p>Total Video : {lectures} lectures</p>
      </div>

      {CourseDetails?.concepts !== "" && (
        <div className="course-concepts">
          <h5>Concepts you'll learn</h5>

          {CourseDetails?.concepts.map((concept, idx) => (
            <p key={idx}>★ {concept}</p>
          ))}
        </div>
      )}

      {CourseDetails?.goals !== "" && (
        <div className="course-goals">
          <h5>Course goals</h5>

          {CourseDetails?.goals.map((goal, idx) => (
            <p key={idx}>★ {goal}</p>
          ))}
        </div>
      )}
    </div>
  );
};

export default AboutCourse;
