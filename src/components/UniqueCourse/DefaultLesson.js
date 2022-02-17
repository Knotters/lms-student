import React from 'react'

const DefaultLesson = ({src , name}) => {
    return (
        <div className='default-lesson'>
            <img src={src} alt={name}/>
        </div>
    )
}

export default DefaultLesson
