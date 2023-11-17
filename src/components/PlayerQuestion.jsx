import React, { useState, useEffect, useContext } from "react";
import { socket } from "../services/socket.service";
import { GameContext } from "../context/game.context";

function PlayerQuestion() {
  const [question, setQuestion] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [answerSubmitted, setAnswerSubmitted] = useState(false);
  const [timer, setTimer] = useState(0)
  const { playerDetail } = useContext(GameContext);
  useEffect(() => {
    socket.on("question", (question) => {
      setQuestion(question);


      // Reset selected answer and submission status when a new question is received
      setSelectedAnswer(null);
      setAnswerSubmitted(false);
      setTimer(25);
    });
  }, []);

  useEffect(() => {
    console.log(timer)
    let timerInterval;

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

  const handleAnswerClick = (selectedOption) => {
    if (!answerSubmitted) {
      setAnswerSubmitted(true);
    }
    if (selectedOption === question.answer) {
      socket.emit("submitAnswer", { playerDetail });
    }
    setAnswerSubmitted(true);

    
  };

  return (
    <>
      {!answerSubmitted &&
        (question ? (
          <div className="flex flex-col px-5 bg-white text-gray-700">
            <h3 className="bg-blue-500 p-3 mt-4">{question.question}</h3>
            <ul>
              {["A", "B", "C", "D"].map((option, index) => (
                <li className="p-3" key={index}>
                  <button
                    className={`p-3 flex w-full bg-violet-500 hover:bg-blue-600 active:bg-blue-700 focus:outline-none focus:ring focus:ring-green-300 ${
                      selectedAnswer === option ? "bg-green-300" : ""
                    }`}
                    onClick={() => handleAnswerClick(option)}
                  >
                    <span>{option} </span>
                    <span className="ml-8">{question[`option${option}`]}</span>
                  </button>
                </li>
              ))}
            </ul>

            <div>
              
                <span className="countdown font-mono text-6xl">
                  <span style={{ "--value": timer }}></span>
                </span>
              
            </div>
          </div>
        ) : (
          <p>Waiting for the questions...</p>
        ))}
      {answerSubmitted && (
        <p className="text-blue-500 mt-2">
          Answer submitted. Please wait for the next question.
        </p>
      )}
    </>
  );
}

export default PlayerQuestion;
