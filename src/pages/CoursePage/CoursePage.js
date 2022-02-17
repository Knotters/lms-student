import SideBar from "../../components/SideBar/SideBar";
import UniqueCourse from "../../components/UniqueCourse/UniqueCourse";
import "./CoursePage.css";

const CoursePage = () => {
  return (
    <>
      <SideBar active="enrollment" />
      <div className="course-page">
          <UniqueCourse />
      </div>
    </>
  );
};

export default CoursePage;
