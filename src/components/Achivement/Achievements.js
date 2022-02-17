import React from 'react';
import './achievement.css';

const Achievements = ({ achievements }) => {
	return (
		<div className="achievements">
			<h2>Achievements</h2>

			{achievements?.length === 0 ? (
				<div className="quiz-div no-header">
					<h4>No achievements yet.</h4>
				</div>
			) : (
				<div className="achievement-div quiz-div">
					<div className="achievement-table heading">
						<div className="table-td">Quiz</div>
						<div className="table-td">Total Questions</div>
						<div className="table-td">Attempted</div>
						<div className="table-td">Not Attempted</div>
						<div className="table-td">correct</div>
						<div className="table-td">incorrect</div>
						<div className="table-td">Positive</div>
						<div className="table-td">Negative</div>
						<div className="table-td">Marks Obtained</div>
					</div>
					{achievements?.map((achievement, idx) => {
						const {
							user,
							marks_obtained,
							total_question,
							correct,
							incorrect,
							positive_score,
							negative_score,
							attempted,
							not_attempted,
							quiz,
						} = achievement;
						return (
							<div key={idx} className="achievement-table">
								<div className="table-td">{quiz}</div>
								<div className="table-td">{total_question}</div>
								<div className="table-td">{attempted}</div>
								<div className="table-td">{not_attempted}</div>
								<div className="table-td">{correct}</div>
								<div className="table-td">{incorrect}</div>
								<div className="table-td">{positive_score}</div>
								<div className="table-td">{negative_score}</div>
								<div className="table-td">{marks_obtained}</div>
							</div>
						);
					})}
				</div>
			)}
		</div>
	);
};

export default Achievements;
