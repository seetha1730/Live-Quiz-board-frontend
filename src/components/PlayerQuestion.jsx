import React, { useState, useEffect, useContext } from "react";
import { socket } from "../services/socket.service";
import { GameContext } from "../context/game.context";
import FancyButton from "./button/FancyButton";

function PlayerQuestion() {
  const [question, setQuestion] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [answerSubmitted, setAnswerSubmitted] = useState(false);
  const [timer, setTimer] = useState(0);
  const { playerDetail } = useContext(GameContext);
  const [score, setScore] = useState([]);
  const [gameEnded, setGameEnded] = useState(false); 
  const {manageContext} = useContext(GameContext)
console.log(playerDetail)
  useEffect(() => {
    socket.on("question", (question) => {
    console.log(question)
      setQuestion(question);
      setSelectedAnswer(null);
      setAnswerSubmitted(false);
      setTimer(500);
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
        <div className="flex flex-col px-5 bg-grey text-gray-700">
          <div className="animated-box bg-[#717ec3] in">
            <h1 className="text-white">{question.questionText}</h1>
          </div>
          {question.options.map((option, index) => (
            <div key={`${index}`}>
              <FancyButton
                className={`${selectedAnswer === option ? "bg-green-300" : ""}`}
                text={option}
                answerClick={(option) => handleAnswerClick(option, index)}
              />
            </div>
          ))}

          <div>
            <span className="countdown font-mono text-6xl">
              <span style={{ "--value": timer }}></span>
            </span>
          </div>
        </div>
      ) : (
        !score.length &&
        (<p>
          {question 
            ? "Answer submitted. Please wait for the next question."
            : "Waiting for the questions..."}
        </p>)
      )}
      <>
      { gameEnded && score.length > 0 && (
      //  manageContext('creator',userName, roomName)
      <section className="bg-[#008489] rounded-lg " id="leaderboard">
   <div className="row   ">
    <div className="block  w-full  text-white grid content-start">
     <h2 className="py-5 ">
      Current Leaderboard
    
     </h2>
     {score.map((item, index) => (
     <p key={index}>Created by {item[0].userName}</p>
       ) )}
     <div className="m-5 bg-white text-[#008489] ">
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
        .sort((a, b) => b.score - a.score) // Sort in descending order based on scores
        .map((item, index) => (
      <tr key={index} >
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">{index+1}</td>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">{item.userName}</td>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">{item.score}</td>
              </tr>
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

