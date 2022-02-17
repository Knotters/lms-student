import { Avatar } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import months from '../../assets/months/months';

const Course = (props) => {
	const {
		course,
		course_name,
		course_image,
		date_of_enrollment,
		author,
		author_picture,
		course_description,
		percentage_completed,
	} = props;
	const history = useHistory();

	return (
		<div className="Course" onClick={() => history.push(`/course/${course}`)}>
			<div className="course-heading">
				<img src={course_image} alt={course_name} />
				<div>
					<h2>{course_name}</h2>
					<div className="enrolled-on">
						<h3>
							Enrolled on: {date_of_enrollment?.split('-')[2]}{' '}
							{date_of_enrollment?.split('-')[1] < 10
								? months[date_of_enrollment?.split('-')[1].split('')[1]]
								: months[date_of_enrollment?.split('-')[1]]}{' '}
							{date_of_enrollment?.split('-')[0]}
						</h3>
					</div>
				</div>
			</div>
			<div className="instructor">
				<p>by</p>
				{author_picture ? <Avatar src={author_picture} /> : <Avatar />}
				<h3>{author}</h3>
			</div>
			<div className="course-description">
				<p>{course_description}</p>
			</div>
			<div className="course-progress">
				<h3>Progress</h3>
				<div>
					<progress value={percentage_completed} max={100} />
				</div>
				<h3>{percentage_completed}%</h3>
			</div>
		</div>
	);
};

export default Course;
