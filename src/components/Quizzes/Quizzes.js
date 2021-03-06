import React, { useEffect, useState, useContext,  useCallback, useRef } from "react";
import "./Quizzes.css";
import { useParams } from "react-router";
import { useHistory } from "react-router-dom";
import LockIcon from '@material-ui/icons/Lock';
import axios from "../../axios/axios";
import UserContext from "../../context/authContext";
import Loader from "../../components/Loader/Loader";
import ReactHtmlParser from "react-html-parser";
import StartTest from "./StartTest";

const getQuizDatafromSessionStorage = () => {
  const quizData = sessionStorage.getItem("quiz-data");
  if (quizData) {
    return JSON.parse(quizData);
  } else {
    return null;
  }
};

function Quizzes() {
  const [active,setactive] = useState(true);
  const { removeUser, userDetails, addQuiz } = useContext(UserContext);
  const [upcoming,setupcoming] = useState(false);
  const [attempted,setattempted] = useState(false);
  const [missed,setmissed] = useState(false);
  const [missedquiz,setMissed] = useState([]);
  const [upcomingquiz,setUpcoming] = useState([]);
  const [attemptedquiz , setAttemptedQuiz] = useState([]);
  const [activequiz,setActiveQuiz] = useState([]);
  const [groupnumber, setGroupnumber] = useState(0);
  const [data,setdata] = useState([]);
  const [groupnames,setGroupnames] = useState([]);
  const [index,setindex] = useState(0);
  const [quizCounts,setQuizCounts] = useState([]);
  const [open,setopen] = useState(true);
  const history = useHistory();
  
  

  // const [quizzes, setQuizzes] = useState(getQuizDatafromSessionStorage);
  
  const [loading, setLoading] = useState(false);
  
  const mountedRef = useRef(true);

  const fetchquizzes = async() => {
    console.log(userDetails)
    try {
      const config = {
        headers: { Authorization: `Bearer ${userDetails.key}` },
      };
      setLoading(true);
      const { data } = await axios.get(`api/get-all-quizes/${userDetails.user.pk}`, config);
      setAttemptedQuiz(data[groupnumber]["attempted"]);
      setMissed(data[groupnumber]["missed"]);
      setUpcoming(data[groupnumber]["upcoming"]);
      setActiveQuiz(data[groupnumber]["active"]);
      setdata(data);
      console.log("data", data)
      for(let x = 0; x < data.length;x++){
        setGroupnames([...groupnames,data[x].name])
        
      }
      let counts = [];
      if(data.length > 0){
        for(let h = 0; h < data.length;h++){
          counts[h] = {
            active: data[h]["active"].length,
            upcoming: data[h]["upcoming"].length,
            attempted: data[h]["attempted"].length,
            missed: data[h]["missed"].length
          }
        }
      }
      setQuizCounts(counts);
      console.log(counts)
      setLoading(false);
    } catch (err) {
      console.log(err.message);
    }
  };
  
  

  const setGroupdata = (group) => {
    console.log(group);
    
    for(let y = 0; y < data.length ; y++){
      if(data[y].name === group){
          setindex(y);
      }
      console.log(index);
      
      setAttemptedQuiz(data[index]["attempted"]);
      setMissed(data[index]["missed"]);
      setUpcoming(data[index]["upcoming"]);
      setActiveQuiz(data[index]["active"]);
    }
  }
  
  // const setCounts = () => {
    
  // }

  const setgroups = () => {
    let groups = [];
    for(let x = 0; x < data.length; x++){
      groups.push(data[x].name);
    }
    setGroupnames(groups);
  }

  useEffect(() => {
    fetchquizzes();
  }, []);
  // console.log(data[index].name);
  useEffect(() => {
    setgroups();
  }, [groupnames.length]);

  // useEffect(() => {
  //   setGroupdata();
  // },[index]);

  // useEffect(() => {
  //   setCounts();
  // },[quizCounts.length]);

  //console.log(quizCounts);
  // console.log(upcomingquiz);
  return (
    <>
      {
        loading || !data ? 
        (
          <div className="quizquestion-loader">
            <Loader />
          </div>
        ) :
        (<div>
            {(
                  <div className="home-page">
                  {/* <NavBar /> */}
                  
                  <div className="content-home">
                    <div className="side-bar">
                        
                        { groupnames.length > 0 && (
                              groupnames.map((group,idx) => {
                                return (
                                  <>
                                    <div className="side-bar-item-advanced-1" onClick={() => {
                                      setopen(!open);
                                      setGroupdata(group);
                                    }}>
                                      {group}
                                    </div>
                                    <div className="tabs"  style={{display:(data[index].name === group && open) ? "block":"none"}}>
                                        <div className="type-count">
                                            <p className="side-bar-item" onClick={() => {
                                              setactive(true);
                                              setupcoming(false);
                                              setattempted(false);
                                              setmissed(false);
                                            }}>Active  </p>
                                            <p className="side-bar-item">{quizCounts[idx].active}</p>
                                        </div>
                                        <div className="type-count">
                                            <p className="side-bar-item" onClick={() => {
                                              setactive(false);
                                              setupcoming(true);
                                              setattempted(false);
                                              setmissed(false);
                                            }}>Upcoming</p>
                                            <p className="side-bar-item">{quizCounts[idx].upcoming}</p>
                                        </div>
        
                                        <div className="type-count">
                                            <p className="side-bar-item" onClick={() => {
                                              setactive(false);
                                              setupcoming(false);
                                              setattempted(true);
                                              setmissed(false);
                                            }}>Attempted</p>
                                            <p className="side-bar-item">{quizCounts[idx].attempted}</p>
                                        </div>
        
                                        <div className="type-count">
                                            
                                            <p className="side-bar-item" onClick={() => {
                                              setactive(false);
                                              setupcoming(false);
                                              setattempted(false);
                                              setmissed(true);
                                            }}>Missed</p>
                                            <p className="side-bar-item">{quizCounts[idx].missed}</p>
                                        </div> 
                                    </div>
                                  </>
                                )
                              })
                        )}
                        
                    </div>
                    <div className="main-bar">
                      {(activequiz.length > 0 && upcoming == false && attempted == false && missed == false && data.length > 0) && (
                        <div className="active">
                        <div className="active-active">
                            <p className="active-title">{data[index].name} - Active</p>
                        </div>
                        {activequiz.map((quiz,index) => {
                          return (
          
                            <div className="active-quiz">
                            <div className="active-quiz-description">
                              <p className="active-quiz-title">
                                  {ReactHtmlParser(quiz.quiz_name)}
                                </p>
                                <p className="active-quiz-des">
                                  {ReactHtmlParser(quiz.description)}
                                </p>
                                {/* <b>Instructions</b>
                              <p className="instructions-box">
                                {ReactHtmlParser(quiz.instructions)}
                              </p> */}
                                <p className="question-time">
                                  Duration :  {quiz.duration} 
                                </p>
                                <p className="start">
                                  Start Date : {quiz.start_date.slice(0,10) + "     " + quiz.start_date.slice(11,16) + " GMT"}
                                </p>
                                <p className="end">
                                  End Date : {quiz.expire_date.slice(0,10) + "     " + quiz.expire_date.slice(11,16)+ " GMT"}
                                </p>
                            </div>
                                  <StartTest 
                                  title={quiz.quiz_name} 
                                  des={quiz.description}
                                  start={quiz.start_date}
                                  end={quiz.expire_date}
                                  duration={quiz.duration}
                                  instructions={quiz.instructions}
                                  id={quiz.id}/>
                            
                          </div>
                            
                            
                          )
                        })}
                        
                      </div>
                      )}
          
                      {(activequiz.length == 0 && upcoming == false && attempted == false && missed == false && data.length > 0) && (
                              <div className="active">
                              <div className="active-active">
                                  <p className="active-title">{data[index].name} - Active</p>
                              </div>
                              <div className="active-quiz">
                                    <p className="empty">Currently no active quizzes to show.</p>
                              </div>
                            </div>
                        )}
          
                    
          
                      {(upcomingquiz.length > 0 && active == false && attempted == false && missed == false && data.length > 0)  && (
                        <div className="active">
                        <div className="active-active">
                            <p className="active-title">{data[index].name} - Upcoming</p>
                        </div>
                        {upcomingquiz.map((quiz,index) => {
                          return (
                            <div className="active-quiz">
                              <div className="active-quiz-description">
                                <p className="active-quiz-title">
                                    {ReactHtmlParser(quiz.quiz_name)}
                                  </p>
                                  <p className="active-quiz-des">
                                    {ReactHtmlParser(quiz.description)}
                                  </p>
                                  {/* <b>Instructions</b> */}
                                {/* <p className="instructions-box">
                                  {ReactHtmlParser(quiz.instructions)}
                                </p> */}
                                  <p className="question-time">
                                    Duration :  {quiz.duration} 
                                  </p>
                                  <p className="start">
                                    Start Date : {quiz.start_date.slice(0,10) + "     " + quiz.start_date.slice(11,16) + " GMT"}
                                  </p>
                                  <p className="end">
                                    End Date : {quiz.expire_date.slice(0,10) + "     " + quiz.expire_date.slice(11,16)+ " GMT"}
                                  </p>
                              </div>
                              {/* <div className="view-result">
                                <button className="view-result-button">View Result</button>
                              </div> */}
                            </div>
                          )
                        })}
                        
                      </div>
                      )}
          
                        {(upcomingquiz.length == 0 && active == false && attempted == false && missed == false && data.length > 0) && (
                              <div className="active">
                                <div className="active-active">
                                    <p className="active-title">{data[index].name} - Upcoming</p>
                                </div>
                                <div className="active-quiz">
                                      <p className="empty">Currently no upcoming quizzes to show.</p>
                              </div>
                              </div>
                        )}
          
                      {(missedquiz.length > 0 && active == false && attempted == false && upcoming == false && data.length > 0) && (
                        <div className="active">
                        <div className="active-active">
                            <p className="active-title">{data[index].name} - Missed</p>
                        </div>
                        {missedquiz.map((quiz,index) => {
                          return (
                            <div className="active-quiz">
                              <div className="active-quiz-description">
                              <p className="active-quiz-title">
                                    {ReactHtmlParser(quiz.quiz_name)}
                                  </p>
                                  <p className="active-quiz-des">
                                    {ReactHtmlParser(quiz.description)}
                                  </p>
                                  {/* <b>Instructions</b> */}
                                {/* <p className="instructions-box">
                                  {ReactHtmlParser(quiz.instructions)}
                                </p> */}
                                  <p className="question-time">
                                    Duration :  {quiz.duration} 
                                  </p>
                                  <p className="start">
                                    Start Date : {quiz.start_date.slice(0,10) + "     " + quiz.start_date.slice(11,16)+ " GMT"}
                                  </p>
                                  <p className="end">
                                    End Date : {quiz.expire_date.slice(0,10) + "     " + quiz.expire_date.slice(11,16)+ " GMT"}
                                  </p>
                              </div>
                                  <StartTest 
                                duration={quiz.duration}
                                instructions={quiz.instructions}
                                id={quiz.id}/>
                            </div>
                          )
                        })}

                      </div>
                      )}
          
                        {(missedquiz.length == 0 && active == false && attempted == false && upcoming == false && data.length > 0) && (
                              <div className="active">
                                <div className="active-active">
                                    <p className="active-title">{data[index].name} - Missed</p>
                                </div>
                                <div className="active-quiz">
                                      <p className="empty">Currently no missed quizzes to show.</p>
                                </div>
                            </div>
                        )}
          
                      
                      {(attemptedquiz.length > 0 && active == false && missed == false && upcoming == false && data) && (
                        <div className="active">
                        <div className="active-active">
                            <p className="active-title">{data[index].name} - Attempted</p>
                        </div>
                        {attemptedquiz.map((quiz,index) => {
                          return (
                            <div className="active-quiz">
                              <div className="active-quiz-description">
                                <p className="active-quiz-title">
                                  {ReactHtmlParser(quiz.quiz_name)}
                                </p>
                                <p className="active-quiz-des">
                                  {ReactHtmlParser(quiz.description)}
                                </p>
                                {/* <b>Instructions</b> */}
                                {/* <p className="instructions-box">
                                  {ReactHtmlParser(quiz.instructions)}
                                </p> */}
                                <p className="question-time">
                                  Duration :  {quiz.duration} 
                                </p>
                                <p className="start">
                                  Start Date : {quiz.start_date.slice(0,10) + "     " + quiz.start_date.slice(11,16)+ " GMT"}
                                </p>
                                <p className="end">
                                  End Date : {quiz.expire_date.slice(0,10) + "     " + quiz.expire_date.slice(11,16)+ " GMT"}
                                </p>
                              </div>
                              { quiz.id && (
                                <div className="view-result">
                                  <button className="view-result-button" 
                                  onClick={() => history.push(`/studentreport/${quiz.id}`)}>View Result</button>
                              </div>
                              )}
                            </div>
                          )
                        })}
                      
                      </div>
                      )}
          
                        {(attemptedquiz.length == 0 && active == false && missed == false && upcoming == false && data.length > 0) && (
                              <div className="active">
                                  <div className="active-active">
                                      <p className="active-title">{data[index].name} - Attempted</p>
                                  </div>
                                  <div className="active-quiz">
                                        <p className="empty">Currently no attempted quizzes to show.</p>
                                  </div>
                            </div>
                        )}
                    </div>
                    
                  </div>
              </div>
        )}
        </div>)
      }

    </>
  )
}

export default Quizzes;
