import { Avatar } from "@material-ui/core";

const Student = (props) => {
  const { rank, name, profile, score } = props;
  return (
    <div className="Student">
      <h3>{rank}</h3>
      <div className="name">
        <div className="leaderboard-profile">
          {!profile ? <Avatar /> : <Avatar src={profile} />}
        </div>
        <h3>{name}</h3>
      </div>
      <h3>{score}</h3>
    </div>
  );
};

export default Student;
