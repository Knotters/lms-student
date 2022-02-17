import React from 'react'
import "./UniqueCourse.css"

const Description = ({description}) => {
    return (
        <div className='course-overview'>
        <h2>Lesson Content Description</h2>
        <p>{description}</p>  
        </div>
    )
}

export default Description
