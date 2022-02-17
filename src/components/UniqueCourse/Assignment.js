import React,{useContext} from 'react'
import {useHistory} from 'react-router-dom'
import { MediaContext } from '../../context/MediaContext'
import './UniqueCourse.css'

const Assignment = () => {
    const history = useHistory()
    const{mediaId , mediaName , mediaDescription} = useContext(MediaContext)
    return (
        <div className='lesson-assignment'>
        <h4 style={{fontSize:"20px" , fontWeight:"600" , color:"rgb(100,100,100"}}>{mediaName}</h4>
        <p>{mediaDescription}</p>
        <button onClick={()=>{history.push(`/assignment/${mediaId}`)}}>Solve Assignment</button>
        </div>
    )
}

export default Assignment
