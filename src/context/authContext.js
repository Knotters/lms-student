import { createContext, useState } from 'react';

const UserContext = createContext();

const getUserDetails = () => {
	const user = localStorage.getItem('user-details');
	if (user) {
		return JSON.parse(user);
	} else {
		return null;
	}
};

const getUserQuiz = () => {
	const quiz = sessionStorage.getItem('user-current-quiz');
	if (quiz) {
		return JSON.parse(quiz);
	} else {
		return null;
	}
};

const checkIsTestSubmitted = () => {
	const quiz = sessionStorage.getItem('test-submitted');
	if (quiz) {
		return JSON.parse(quiz);
	} else {
		return null;
	}
};

const getUserProfilePic = () => {
	const pic = localStorage.getItem('user-profile-pic');
	if (pic) {
		return JSON.parse(pic);
	} else {
		return null;
	}
};

export const UserContextProvider = (props) => {
	const [userDetails, setUserDetails] = useState(getUserDetails);
	const [userCurrentQuiz, setUserCurrentQuiz] = useState(getUserQuiz);
	const [isTestSubmitted, setIsTestSubmitted] = useState(checkIsTestSubmitted);
	const [userProfilePic, setUserProfilePic] = useState(getUserProfilePic);

	const updateUser = (data) => {
		setUserDetails(data);
		localStorage.setItem('user-details', JSON.stringify(data));
	};

	const removeUser = () => {
		setUserDetails(null);
		sessionStorage.clear();
		localStorage.clear();
	};

	const updateUserProfilePic = (pic) => {
		setUserProfilePic({ profile: pic });
		localStorage.setItem('user-profile-pic', JSON.stringify({ profile: pic }));
	};

	const addQuiz = (id, duration, test_time) => {
		setUserCurrentQuiz({ id, duration, test_time });
	};

	const timeUpdate = () => {
		setUserCurrentQuiz({
			...userCurrentQuiz,
			test_time: userCurrentQuiz?.test_time - 1000,
		});
		sessionStorage.setItem(
			'user-current-quiz',
			JSON.stringify(userCurrentQuiz),
		);
	};

	const submitTest = () => {
		setIsTestSubmitted(true);
		sessionStorage.setItem('test-submitted', true);
	};

	return (
		<UserContext.Provider
			value={{
				userDetails,
				updateUser,
				removeUser,
				addQuiz,
				userCurrentQuiz,
				timeUpdate,
				submitTest,
				isTestSubmitted,
				userProfilePic,
				updateUserProfilePic,
			}}
		>
			{props.children}
		</UserContext.Provider>
	);
};

export default UserContext;
