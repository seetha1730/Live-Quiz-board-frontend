import { useState, useEffect, useContext } from "react";
import { socket } from "../services/socket.service";
import { GameContext } from "../context/game.context";
import FancyButton from "./button/FancyButton";
import { ThemeContext } from '../context/theme.context';
import trophyImage from '/public/trophy-icon.png';
import Leaderboard from "./LeaderBoard";


function PlayerRoom() {
  const [question, setQuestion] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [answerSubmitted, setAnswerSubmitted] = useState(false);
  const [timer, setTimer] = useState(0);
  const { playerDetail } = useContext(GameContext);
  const [score, setScore] = useState([]);
  const [gameEnded, setGameEnded] = useState(false);
  const { theme } = useContext(ThemeContext);


  useEffect(() => {
    socket.on("question", (question) => {
      setQuestion(question);
      setSelectedAnswer(null);
      setAnswerSubmitted(false);
      setTimer(40);
    });
  }, []);

  useEffect(() => {

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

  useEffect(() => {
    socket.on("result", (data) => {
      console.log(data)
      setScore(data);
      setGameEnded(true);
    });
  },[answerSubmitted])

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
      {!answerSubmitted && question && !score.length ? (
        <div className={` ${theme === 'dark' ? ' bg-gray-700' : ' question bg-base-purple border-light-purple '} flex flex-col rounded-2xl px-5 text-white `}>
          <div className="p-5 rounded-2xl">
            <h2 className={` ${theme === 'dark' ? ' bg-gray-700' : ' text-gradient '} text-2xl   font-bold text-center `}>{question.questionText}</h2>
          </div>
          {question.options.map((option, index) => (
            <div key={`${index}`}>
              <FancyButton
                className={`${selectedAnswer === option ? "bg-green-300" : ""} ${theme === 'dark' ? ' bg-gray-700' : ' bg-base-purple border-light-purple '} text-center `}
                text={option}
                answerClick={(option) => handleAnswerClick(option, index)}
              />
            </div>
          ))}

          <div>
            <span className="countdown  bg-black-900 text-white font-mono text-6xl w-[120px] p-5 mb-3 rounded-2xl mx-auto border-white-800 border-solid border-2">

              <span style={{ "--value": timer }}></span>
            </span>
          </div>
        </div>
      ) : (
        !score.length &&
        (
          <div className={` ${theme === 'dark' ? ' bg-gray-700 border-solid border-2 border-white-500' : 'bg-dull-purple border-light-purple'} gap-3 text-white p-7 col-span-4 m-5 rounded-lg top-[3.8125rem]`}>

            {question
              ? "Answer submitted. Please wait for the next question."
              : "Waiting for the questions..."}
          </div>)
      )}
      <>
        {gameEnded && score.length > 0 && (
          <Leaderboard score={score} theme={theme} trophyImage={trophyImage} />
         
        )}
        

       


      </>
    </>
  );
}

export default PlayerRoom;

