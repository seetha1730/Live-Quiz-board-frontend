// Leaderboard.js
import { useState,useEffect,useContext } from "react";
import PropTypes from 'prop-types';
import Rating from './Rating';
import { useNavigate } from "react-router-dom";

import { GameContext} from "../context/game.context";
const Leaderboard = ({ score, theme, trophyImage }) => {
  const [showRating, setShowRating] = useState(false);
  const [selectedRating, setSelectedRating] = useState(0);
  const [comment, setComment] = useState("");
  const [overallRating, setOverallRating] = useState(0);
  const [difficultyRating, setDifficultyRating] = useState(0);
  const [enjoymentRating, setEnjoymentRating] = useState(0);
  const { playerDetail } = useContext(GameContext)

  const navigate = useNavigate();

  const handleOverallRate = (value) => {
    setOverallRating(value);
  };

  const handleEnjoymentRate = (value) => {
    setEnjoymentRating(value);
  };

  const handleDifficultyRate = (value) => {
    setDifficultyRating(value);
  };

  const handleCommentChange = (value) => {
    setComment(value);
  };
  const handleRate = (value) => {
    setSelectedRating(value);
  };
 
  useEffect(() => {
    let ratingTimeout;


      // Set a timeout to show the rating after 5 seconds
      ratingTimeout = setTimeout(() => {
        setShowRating(true);
      }, 5000);


    return () => {
      // Clear the timeout when the component unmounts or when it is updated
      clearTimeout(ratingTimeout);
    };
  }, []);

  useEffect(() => {
console.log(score)
  },[score])

 
    const handleSumbit = async () => {
      try {
        
 
const response = await fetch(`${ import.meta.env.VITE_BASE_URL_API}/feedback/user`, {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                  game:playerDetail.room,
                  player:playerDetail.userName,
                  feedbackText: comment,
                  rating: {
                      overall: overallRating,
                      difficulty: difficultyRating ,
                      enjoyment: enjoymentRating,
                  },
              }),
          });
  
          const data = await response.json();
          navigate("/");
          console.log('Feedback submitted:', data);
      } catch (error) {
          console.error('Error submitting feedback:', error);
      }
  };



  return (
    <section className="rounded-lg h-screen w-full block items-start " id="leaderboard">
      <div className="row">
        <div className="block w-full h-screen text-white">
          <h2 className={` ${theme === 'dark' ? ' bg-gray-700' : ' text-gradient '} text-2xl font-bold mb-4 text-center `}>
            Current Leaderboard <p className="capitalize">Created by {score[0].userName}</p>
          </h2>

          <div className="sm:m-5 m-0 scoreList">
            <div className="grid grid-cols-12 mb-2">
              <div className="col-span-2">
                Rank
              </div>
              <div className="col-span-8">
                Player Name
              </div>
              <div className="col-span-2">
                Score
              </div>
            </div>
            {score
              .sort((a, b) => b.score - a.score)
              .map((item, index) => item.score && (
                <div key={index} className="grid p-5 grid-cols-12 items-center bg-dull-purple border-light-purple m-0 sm:m-3">
                  <div className="col-span-2 flex flex-row items-center">
                    {index < 3 && (
                      <img className="w-10 mr-2" src={trophyImage} alt="Trophy" />
                    )}
                    {index}
                  </div>
                  <div className="col-span-8">
                    <p className='capitalize'>{item.userName}</p>
                    <p className="text-xs text-gray-500">{item.email}</p>
                  </div>
                  <div className="col-span-2">
                    {item.score}
                  </div>
                </div>
              ))}
          </div>
          {showRating && score.length > 0 && (
          <div className="bg-white text-gray-700 border-light-purple rounded-lg p-5">
      <h5>Game Feedback</h5>
      <p>Your Rating: {selectedRating}</p>
      <Rating onRate={handleRate} 
      difficultyRating={difficultyRating}
      overallRating ={overallRating} 
      enjoymentRating={enjoymentRating}
      onOverallRate={handleOverallRate}
      onDifficultyRate={handleDifficultyRate}
      onEnjoymentRate={handleEnjoymentRate}
      onComment={handleCommentChange}
      comment={comment}
       onSubmit={handleSumbit}/>
       </div>
          
        )}
      
        </div>
      </div>
    </section>
  );
};
Leaderboard.propTypes = {
    score: PropTypes.array.isRequired, 
  theme: PropTypes.string.isRequired,
  trophyImage: PropTypes.string.isRequired,
  }

export default Leaderboard;

