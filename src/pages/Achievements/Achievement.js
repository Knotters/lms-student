import React from 'react';
import Quizzes from '../../components/Quizzes/Quizzes'
import SideBar from '../../components/SideBar/SideBar';
import './Achievement.css';

// import UserContext from '../../context/authContext';
// import Loader from '../../components/Loader/Loader';
// import axios from '../../axios/axios';
// import Achievements from '../../components/Achivement/Achievements';
// import LiveQuiz from '../../components/Achivement/LiveQuiz';
// import PastQuiz from '../../components/Achivement/PastQuiz';

const Achievement = () => {
	//const [liveQuiz, setLiveQuiz] = useState(null);
	// const [attemptedQuiz, setAttemptedQuiz] = useState(null);
	// const [missedQuiz, setMissedQuiz] = useState(null);
	// const [achievements, setAchievements] = useState(null);
	//const { userDetails } = useContext(UserContext);
	// useEffect(() => {
	// 	const fetchLiveQuiz = async () => {
	// 		try {
	// 			const config = {
	// 				header: { Authorization: `Bearer ${userDetails.key}` },
	// 			};
	// 			const { data } = await axios.post(
	// 				'/api/liveQuiz/',
	// 				{ user: userDetails?.username },
	// 				config,
	// 			);

	// 			setLiveQuiz(data?.live_quiz);
	// 			setAttemptedQuiz(data?.quiz_attempted);
	// 			setMissedQuiz(data?.quiz_missed);
	// 			setLoading(false);
	// 		} catch (err) {
	// 			console.log(err.message);
	// 		}
	// 	};
	// 	fetchLiveQuiz();
	// }, []);

	// useEffect(() => {
	// 	const fetchAchievements = async () => {
	// 		try {
	// 			const config = {
	// 				header: { Authorization: `Bearer ${userDetails.key}` },
	// 			};
	// 			const { data } = await axios.post(
	// 				'/api/achivements/',
	// 				{ user: userDetails?.user.username },
	// 				config,
	// 			);
	// 			console.log(data);
	// 			if (data.msg) {
	// 				return;
	// 			} else {
	// 				setAchievements(data);
	// 			}
	// 		} catch (err) {
	// 			console.log(err.message);
	// 		}
	// 	};
	// 	fetchAchievements();
	// }, []);

	return (
		<div className="achievement-page">
			<SideBar active="achievement" />
			
				<div className="achievements">
					{/* <LiveQuiz liveQuiz={liveQuiz} />
					<PastQuiz attemptedQuiz={attemptedQuiz} missedQuiz={missedQuiz} />
					<Achievements achievements={achievements} /> */}
					<Quizzes/>
				</div>
		</div>
	);
};

export default Achievement;
