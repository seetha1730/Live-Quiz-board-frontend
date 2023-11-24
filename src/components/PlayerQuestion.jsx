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
        {
          score && score.map((item, index) => (
            <p key={index}>{item.userName} - {item.score}</p>
          ))
        }
      </>
    </>
  );
}

export default PlayerQuestion;
