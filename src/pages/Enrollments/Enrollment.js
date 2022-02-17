import SideBar from "../../components/SideBar/SideBar";
import EnrolledCourses from "../../components/EnrolledCourses/EnrolledCourse";
import "./Enrollment.css";
import { useContext } from "react";
import UserContext from "../../context/authContext";
import { MediaContext } from "../../context/MediaContext";

const Enrollment = () => {
  const { userDetails } = useContext(UserContext);
  const { changeMediaType } = useContext(MediaContext);
  changeMediaType("", "");

  return (
    <div className="enrollment">
      <SideBar active="enrollment" />
      <div className="enrollment-items">
        <EnrolledCourses user={userDetails?.user} />
      </div>
    </div>
  );
};

export default Enrollment;
