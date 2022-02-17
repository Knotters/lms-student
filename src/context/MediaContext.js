import React, { createContext, useState, useEffect } from 'react';

export const MediaContext = createContext();

const getCurrentCourse = () => {
	const data = localStorage.getItem('current-course');

	if (data) {
		return JSON.parse(data);
	} else {
		return null;
	}
};

const MediaContextProvider = (props) => {
	const [mediaUrl, setMediaUrl] = useState('');
	const [mediaId, setMediaId] = useState('');
	const [text, setText] = useState('');
	const [mediaName, setMediaName] = useState('');
	const [mediaDescription, setMediaDescription] = useState('');
	const [currentCourseId, setCurrentCourseId] = useState(getCurrentCourse);
	const [lessonIndex, setLessonIndex] = useState(0);
	const [mediaType, setMediaType] = useState('');

	const changeCurrentCourse = (id) => {
		setCurrentCourseId(id);
		localStorage.setItem('current-course', JSON.stringify(currentCourseId));
	};

	const updateLessonIndex = (index) => {
		setLessonIndex(index);
	};

	const changeMediaUrl = (url) => {
		setMediaUrl(url);
	};

	const changeMediaType = (media, id) => {
		setMediaType(media);
		setMediaId(id);
	};

	const changeMediaContent = (name, des) => {
		setMediaName(name);
		setMediaDescription(des);
	};

	const changeText = (text) => {
		setText(text);
	};

	return (
		<MediaContext.Provider
			value={{
				mediaUrl,
				mediaType,
				changeMediaUrl,
				changeMediaType,
				mediaId,
				changeText,
				changeMediaContent,
				updateLessonIndex,
				lessonIndex,
				mediaName,
				mediaDescription,
				currentCourseId,
				changeCurrentCourse,
				text,
			}}
		>
			{props.children}
		</MediaContext.Provider>
	);
};

export default MediaContextProvider;
