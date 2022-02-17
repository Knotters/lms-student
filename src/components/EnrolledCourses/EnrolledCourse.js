import { useState, useEffect ,useContext } from "react";
import SingleCourse from "./SingleCourse";
import Loader from "../../components/Loader/Loader";
import axios from "../../axios/axios";
import Carousel from "react-elastic-carousel";
import "./EnrolledCourse.css";
import UserContext from "../../context/authContext";

const breakPoints = [
  { width: 1, itemsToShow: 1 },
  { width: 500, itemsToShow: 2 },
  { width: 900, itemsToShow: 3 },
  { width: 1100, itemsToShow: 4 },
];

const getEnrolledCoursesFromLocalStorage = () => {
  const enrolledCourses = localStorage.getItem("enrolled-courses");
  if (enrolledCourses) {
    return JSON.parse(enrolledCourses);
  } else {
    return null;
  }
};

const EnrolledCourse = ({ user }) => {
  const [allCourses, setAllCourses] = useState(
    getEnrolledCoursesFromLocalStorage
  );
  const [activeCourses, setActiveCourses] = useState(allCourses?.active);
  const [completedCourses, setCompletedCourses] = useState(
    allCourses?.completed
  );
  const [isLoading, setIsLoading] = useState(false);
  const [active, setActive] = useState("active");
  const{userDetails} = useContext(UserContext)

  useEffect(() => {
    let isUnmounted = false;
    const getCourses = async () => {
      try {
        if (!allCourses) setIsLoading(true);
        const config = {
          headers: { Authorization: `Bearer ${userDetails.key}` },
        };
        const { data } = await axios.get(`/api/getMyCourses/${user?.username}`,config);
        if (!isUnmounted) {
          setAllCourses(data);
          setActiveCourses(data.active);
          setCompletedCourses(data.completed);
          localStorage.setItem("enrolled-courses", JSON.stringify(data));
        }
      } catch (err) {
        console.log(err.message);
      }
      setIsLoading(false);
    };
    getCourses();
    return () => {
      isUnmounted = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allCourses]);

  if (isLoading) {
    return (
      <div className="loading-div">
        <Loader />
      </div>
    );
  }

  return (
    <div className="Enrolled-courses">
      <div className="title">
        <h1>Welcome! {user?.first_name}</h1>
        <div className="stats">
          <div
            className={`card ${active === "active" && "active"}`}
            onClick={() => setActive("active")}
          >
            <span>{allCourses?.act_count}</span>
            Active Courses
          </div>
          <div
            className={`card ${active === "completed" && "active"}`}
            onClick={() => setActive("completed")}
          >
            <span>{allCourses?.comp_count}</span>
            Completed Courses
          </div>
        </div>
      </div>

      <div className="course-cards">
        {active === "active" ? (
          <div className="active-courses">
            <Carousel breakPoints={breakPoints}>
              {activeCourses?.map((course) => (
                <SingleCourse key={course?.sno} {...course} />
              ))}
            </Carousel>
          </div>
        ) : (
          <div className="completed-courses">
            <Carousel breakPoints={breakPoints}>
              {completedCourses?.map((course) => (
                <SingleCourse key={course?.sno} {...course} />
              ))}
            </Carousel>
          </div>
        )}
      </div>
    </div>
  );
};

export default EnrolledCourse;
