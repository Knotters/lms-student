import React, { useState, useEffect, useContext } from 'react';
import axios from '../../axios/axios';
import UserContext from '../../context/authContext';
import Loader from '../Loader/Loader';

const Homework = ({ id }) => {
	const { userDetails } = useContext(UserContext);
	const [homework, setHomework] = useState(null);
	const [loading, setLoading] = useState(true);
	const [homeworkFile, setHomeworkFile] = useState(null);

	const fetchHomework = async () => {
		try {
			const config = {
				headers: { Authorization: `Bearer ${userDetails.key}` },
			};
			const { data } = await axios.get(`/api/getHomework/${id}`, config);
			setHomework(data);
			setLoading(false);
		} catch (err) {
			console.log(err.message);
		}
	};

	const handleFileChange = (e) => {
		setHomeworkFile(e.target.files[0]);
	};

	const handleHomeworkUpload = async () => {
		let formData = new FormData();
		formData.append('answer', homeworkFile);
		formData.append('lessons_content', homework?.id);

		try {
			const config = {
				headers: { Authorization: `Bearer ${userDetails.key}` },
			};
			await axios.post(
				`/api/doHomework/${userDetails?.user?.username}`,
				formData,
				config,
			);
		} catch (err) {
			console.log(err.message);
		}
	};

	useEffect(() => {
		fetchHomework();
	}, []);

	return (
		<div className="lesson-homework">
			{loading ? (
				<Loader />
			) : (
				<div className="homework-content">
					<h4>{homework?.text_content}</h4>

					<input type="file" name="file" onChange={handleFileChange} />
					<button onClick={handleHomeworkUpload}>Upload</button>
				</div>
			)}
		</div>
	);
};

export default Homework;
