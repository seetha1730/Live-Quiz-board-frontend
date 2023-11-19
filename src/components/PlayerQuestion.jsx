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

  useEffect(() => {
    socket.on("question", (question) => {
      console.log("Received question:", question);
      setQuestion(question);
      setSelectedAnswer(null);
      setAnswerSubmitted(false);
      setTimer(500);
    });
  }, []);

  useEffect(() => {
    console.log("Timer:", timer, "Answer Submitted:", answerSubmitted);
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
    console.log("Answer Clicked:", selectedOption);
    if (!answerSubmitted) {
      setAnswerSubmitted(true);
      if (selectedOption === question.answer) {
        socket.emit("submitAnswer", { playerDetail });
      }
    }
  };

  console.log(
    "Rendering with Answer Submitted:",
    answerSubmitted,
    "Question:",
    question
  );

  return (
    <>
      {!answerSubmitted && question ? (
        <div className="flex flex-col px-5 bg-grey text-gray-700">
        <div className="animated-box bg-[#717ec3] in">
  <h1 className="text-white">{question.question}</h1>

</div>
      {["A", "B", "C", "D"].map((option, index) => (
  <div key={`${index}-${option}`}>
    <FancyButton
      className={`${selectedAnswer === option ? "bg-green-300" : ""}`}
      option={option}
      text={question[`option${option}`]}
      answerClick={(option) => handleAnswerClick(option)}
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
        <p>
          {question
            ? "Answer submitted. Please wait for the next question."
            : "Waiting for the questions..."}
        </p>
      )}
    </>
  );
}

export default PlayerQuestion;
