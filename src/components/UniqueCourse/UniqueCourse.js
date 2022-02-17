import { useState, useEffect, useRef, useContext } from 'react';
import { useParams } from 'react-router-dom';
import axios from '../../axios/axios';
import UserContext from '../../context/authContext';
import { MediaContext } from '../../context/MediaContext';
import Loader from '../Loader/Loader';
import AboutCourse from './AboutCourse';
import Assignment from './Assignment';
import CourseContent from './CourseContent';
import CourseContentResponsive from './CourseContentResponsive';
import DefaultLesson from './DefaultLesson';
import Description from './Description';
import Homework from './Homework';
import MediaPlayer from './MediaPlayer';
import PdfDocument from './PdfDocument';
import Quiz from './Quiz';
import Text from './Text';
import './UniqueCourse.css';

const UniqueCourse = () => {
	const { id } = useParams();
	const mountedRef = useRef(true);
	const [CourseDetails, setCourse] = useState(null);
	const [isLoading, setIsLoading] = useState(true);
	const [overView, setOverview] = useState('course_content');
	const { userDetails } = useContext(UserContext);
	const {
		mediaType,
		mediaDescription,
		mediaId,
		text,
		lessonIndex,
	} = useContext(MediaContext);

	useEffect(() => {
		const fetchCourseDetails = async () => {
			if (CourseDetails == null) setIsLoading(true);
			try {
				const config = {
					headers: { Authorization: `Bearer ${userDetails.key}` },
				};
				const { data } = await axios.get(
					`/api/course/${id}/${userDetails?.user.pk}`,
					config,
				);
				if (mountedRef.current) {
					setCourse(data.course_details);
					setIsLoading(false);
				}
			} catch (err) {
				console.log(err.message);
				setIsLoading(false);
			}
		};
		fetchCourseDetails();

		return function callback() {
			mountedRef.current = false;
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [CourseDetails]);

	const toggleComponent = () => {
		switch (mediaType) {
			case 'video':
				return <MediaPlayer />;
			case 'pdf':
				return <PdfDocument />;
			case 'text':
				return <Text text={text} />;
			case 'assignment':
				return <Assignment />;
			case 'quiz':
				return <Quiz />;
			case 'homework':
				return <Homework id={mediaId} />;
			default:
				return (
					<DefaultLesson
						src={CourseDetails?.image}
						name={CourseDetails?.course_name}
					/>
				);
		}
	};

	return (
		<>
			{isLoading ? (
				<div className="post-loader">
					<Loader />
				</div>
			) : (
				<div className="course-body">
					<div className="course">
						<h2 className="course-title">{CourseDetails?.course_name}</h2>
						{toggleComponent()}
						<div className="unresponsive">
							{lessonIndex === 0 && <AboutCourse CourseDetails={CourseDetails} />}
							{mediaType && mediaDescription ? (
							<Description description={mediaDescription} />
							) : (
							<></>
							)}
						</div>
						<div className="responsive-overview">
							<div className="overview-headers">
								<button onClick={() => setOverview('course_content')}>
									Course
								</button>
								{mediaDescription && (
									<button onClick={() => setOverview('description')}>
										Description
									</button>
								)}
							</div>

							<div className="overview-body">
								{overView === 'course_content' ? (
									<CourseContentResponsive lessons={CourseDetails?.lessons} />
								) : mediaDescription ? (
									<Description description={mediaDescription} />
								) : (
									<></>
								)}
							</div>
						</div>
					</div>

					<div className="unresponsive">
						<CourseContent lessons={CourseDetails?.lessons} />
					</div>
				</div>
			)}
		</>
	);
};

export default UniqueCourse;
