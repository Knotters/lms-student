import React from 'react';
import { useHistory } from 'react-router-dom';
import months from '../../assets/months/months';
import './achievement.css';

const LiveQuiz = ({ liveQuiz }) => {
	const history = useHistory();
	return (
		<div className="live-quiz">
			<h2>Live Quiz</h2>
			{liveQuiz.length === 0 ? (
				<div className="quiz-div no-header">
					<h4>No live quiz available. </h4>
				</div>
			) : (
				<div className="quiz-div">
					{liveQuiz?.map((quiz) => {
						const { id, quiz_name, duration, expire_date } = quiz;
						return (
							<div key={id} className="single-quiz">
								<h3>{quiz_name}</h3>
								<p>{quiz.description}</p>
								<p>Duration : {duration}</p>
								<p>
									Expires on : {expire_date.split('T')[0].split('-')[2]}{' '}
									{months[expire_date.split('T')[0].split('-')[1].split('')[1]]}{' '}
									{expire_date.split('T')[0].split('-')[0]}{' '}
									{expire_date.split('T')[1].split('+')[0]}
								</p>
								<button onClick={() => history.push(`/quiz/${id}`)}>
									Attempt Now
								</button>
							</div>
						);
					})}
				</div>
			)}
		</div>
	);
};

export default LiveQuiz;
