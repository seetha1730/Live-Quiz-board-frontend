import { useState, useEffect, useContext } from "react";
import { socket } from "../services/socket.service";
import { GameContext } from "../context/game.context";
import FancyButton from "./button/FancyButton";
import { ThemeContext } from '../context/theme.context';

function PlayerQuestion() {
  const [question, setQuestion] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [answerSubmitted, setAnswerSubmitted] = useState(false);
  const [timer, setTimer] = useState(0);
  const { playerDetail } = useContext(GameContext);
  const [score, setScore] = useState([]);
  const [gameEnded, setGameEnded] = useState(false); 
  const { theme } = useContext(ThemeContext);

console.log(playerDetail)
  useEffect(() => {
    socket.on("question", (question) => {
    console.log(question)
      setQuestion(question);
      setSelectedAnswer(null);
      setAnswerSubmitted(false);
      setTimer(50);
    });
  }, []);

  useEffect(() => {

    let timerInterval;
    socket.on("result", (data) => {
      setScore(data);
      setGameEnded(true);
    });
    
    if (timer > 0 && !answerSubmitted) {
      timerInterval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    } else if (timer === 0 && !answerSubmitted) {
      setAnswerSubmitted(true);
    }

    return () => {
      clearInterval(timerInterval);
    };
  }, [timer, answerSubmitted]);

  const handleAnswerClick = (selectedOption, index) => {
   

    if (!answerSubmitted) {
      setAnswerSubmitted(true);

      if (index === question.correctOption) {
        socket.emit("submitAnswer", { playerDetail });
      }
    }
  };


  return (
    <>
      {!answerSubmitted && question ? (
        <div className={` ${theme === 'dark' ? ' bg-gray-700' :' bg-base-purple border-light-purple '} flex flex-col rounded-2xl px-5 text-white `}>
         <div className="p-5 rounded-2xl">
          <h2 className={` ${theme === 'dark' ? ' bg-gray-700' :' text-gradient '} text-2xl   font-bold text-center `}>{question.questionText}</h2>
          </div>
          {question.options.map((option, index) => (
            <div key={`${index}`}>
              <FancyButton
                className={`${selectedAnswer === option ? "bg-green-300" : ""} ${theme === 'dark' ? ' bg-gray-700' :' bg-base-purple border-light-purple '} text-center `}
                text={option}
                answerClick={(option) => handleAnswerClick(option, index)}
              />
            </div>
          ))}

          <div>   
            <span className="countdown  bg-black-900 text-white font-mono text-6xl w-3/12 p-5 mb-3 rounded-2xl mx-auto border-white-800 border-solid border-2">
      
              <span style={{ "--value": timer }}></span>
            </span>
          </div>
        </div>
      ) : (
        !score.length &&
        (
          <div className={` ${theme === 'dark' ? ' bg-gray-700 border-solid border-2 border-white-500' :'bg-dull-purple border-light-purple' } gap-3 text-white p-7 col-span-4 m-5 rounded-lg top-[3.8125rem]`}>

          {question 
            ? "Answer submitted. Please wait for the next question."
            : "Waiting for the questions..."}
        </div>)
      )}
      <>
      { gameEnded && score.length > 0 && (
      <section className=" rounded-lg w-full   " id="leaderboard">
   <div className="row   ">
    <div className="block  w-full  text-white ">
     <h2 className="py-5 ">
      Current Leaderboard
    
     </h2>
     
     <p>Created by {score[0].userName}</p>
      
     <div className="m-5 ">
     <table className="table-auto items-center w-full bg-transparent border-collapse">
      <thead>
       <tr>
       <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-center ">Rank</th>
       <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-center ">Name</th>
       <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-center ">Score</th>

       </tr>
      </thead>
      <tbody  id="leaderboardTableBody">
      {score
        .sort((a, b) => b.score - a.score)
        .map((item, index) => (
          item.score && (
      <tr key={index} >
               
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">{index+1}</td>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">{item.userName}</td>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">{item.score}</td>
              
                </tr>)
              ))}
      </tbody>
     </table>
     </div>
     </div>
     </div>
   </section>
      )}
       
      </>
    </>
  );
}

export default PlayerQuestion;

