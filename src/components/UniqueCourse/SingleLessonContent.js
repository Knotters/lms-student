import React, { useContext, useState, useRef } from 'react';
import { MediaContext } from '../../context/MediaContext';
import './UniqueCourse.css';
import { VscFilePdf } from 'react-icons/vsc';
import { AiOutlineFileText } from 'react-icons/ai';
import { BiTask } from 'react-icons/bi';
import { MdAssignment } from 'react-icons/md';
import { IoIosPlayCircle } from 'react-icons/io';
import { FaHandMiddleFinger } from 'react-icons/fa';
import { MdCheckBoxOutlineBlank } from 'react-icons/md';
import { MdCheckBox } from 'react-icons/md';
import axios from '../../axios/axios';
import UserContext from '../../context/authContext';

const SingleLessonContent = ({ singleContent, id, index, lessonId }) => {
	const {
		changeMediaContent,
		currentCourseId,
		changeMediaUrl,
		changeMediaType,
		changeText,
		mediaId,
	} = useContext(MediaContext);
	const { userDetails } = useContext(UserContext);

	const [completed, setCompleted] = useState(false);

	const clickRef = useRef(null);

	const handleCompletedLesson = async () => {
		setCompleted(true);
		try {
			const config = {
				headers: { Authorization: `Bearer ${userDetails.key}` },
			};
			const { data } = await axios.post(
				'/api/markAsComplete/',
				{
					course_id: currentCourseId,
					lesson_id: lessonId,
					lesson_no: (index + 1).toString(),
					user: userDetails?.user.pk,
				},
				config,
			);
		} catch (err) {
			console.log(err.message);
		}
	};

	const handleLessonClick = () => {
		// clickRef.current.id = 'clicked-content';

		if (singleContent?.media_type === 'video') {
			changeMediaUrl(singleContent?.link);
			changeMediaType(singleContent?.media_type, id);
			changeMediaContent(singleContent?.video_name, singleContent?.description);
		} else if (singleContent?.media_type === 'pdf') {
			changeMediaUrl(singleContent?.pdf_file);
			changeMediaType(singleContent?.media_type, id);
		} else if (singleContent?.media_type === 'text') {
			changeText(singleContent?.text);
			changeMediaType(singleContent?.media_type, id);
		} else if (singleContent?.media_type === 'quiz') {
			changeMediaType(singleContent?.media_type, singleContent?.quiz_id);
			changeMediaContent(singleContent?.quiz_name, singleContent?.description);
		} else if (singleContent?.media_type === 'assignment') {
			changeMediaType(singleContent?.media_type, singleContent?.assignment_id);
			changeMediaContent(
				singleContent?.assignment_name,
				singleContent?.description,
			);
		} else {
			changeMediaType(singleContent?.media_type, id);
		}
	};

	const toggleIcon = () => {
		switch (singleContent?.media_type) {
			case 'text':
				return <AiOutlineFileText />;
			case 'quiz':
				return <MdAssignment />;
			case 'video':
				return <IoIosPlayCircle />;
			case 'homework':
				return <BiTask />;
			case 'pdf':
				return <VscFilePdf />;
			case 'assignment':
				return <MdAssignment />;
			default:
				return <FaHandMiddleFinger />;
		}
	};

	return (
		<div
			id={id === mediaId ? 'clicked-content' : ''}
			className="single-lesson-content"
			onClick={handleLessonClick}
		>
			<div className="lesson-left">
				<div className="label">
					<button
						className="lesson-custom-checkbox"
						disabled={singleContent?.is_complete || completed ? true : false}
						onClick={handleCompletedLesson}
					>
						{singleContent?.is_complete || completed ? (
							<MdCheckBox />
						) : (
							<MdCheckBoxOutlineBlank />
						)}
					</button>
					<div>{singleContent?.media_type}</div>
				</div>
			</div>
			<p>{toggleIcon()}</p>
		</div>
	);
};

export default SingleLessonContent;
