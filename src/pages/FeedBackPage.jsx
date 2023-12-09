import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { ThemeContext } from '../context/theme.context';
import { GameContext } from '../context/game.context';
import Star from '../components/Star';
import Rating from '../components/Rating';
import { useNavigate } from 'react-router-dom';

const FeedBackPage = () => {
  const [feedback, setFeedback] = useState([]);
  const [selectedRating, setSelectedRating] = useState(0);
  const [comment, setComment] = useState('');
  const [overallRating, setOverallRating] = useState(0);
  const [difficultyRating, setDifficultyRating] = useState(0);
  const [enjoymentRating, setEnjoymentRating] = useState(0);
  const { theme } = useContext(ThemeContext);
  const { playerDetail } = useContext(GameContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL_API}/feedback/all`);
        setFeedback(response.data);
      } catch (error) {
        console.error('Error fetching feedback:', error);
      }
    };

    fetchFeedback();
  }, []);

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

  

  const handleSumbit = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BASE_URL_API}/feedback/user`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          game: playerDetail.room,
          player: playerDetail.userName,
          feedbackText: comment,
          rating: {
            overall: overallRating,
            difficulty: difficultyRating,
            enjoyment: enjoymentRating,
          },
        }),
      });

      const data = await response.json();
      navigate('/');
      console.log('Feedback submitted:', data);
    } catch (error) {
      console.error('Error submitting feedback:', error);
    }
  };

  const renderStars = (rating) => {
    const filledStars = Array.from({ length: 5 }, (_, index) => <Star key={index} filled={index < rating} />);
    return filledStars;
  };

  return (
    <div className="w-11/12 pb-8 sm:w-8/12 mx-auto">
      <h2 className={` ${theme === 'dark' ? ' text-gray-300 ' : ' text-gradient '} text-2xl m-5 font-bold mb-4 text-center `}>
        Feedback
      </h2>
      <div className=" ">
        {feedback.map((item) => (
          <div
            key={item._id}
            className={` ${theme === 'dark' ? ' text-gray-300 bg-gray-800 border border-white ' : ' bg-base-purple border-light-purple '} p-5 m-2 rounded-md`}
          >
            <p>Game Room: {item?.game}</p>
            <p>Player: {item?.player}</p>
            <p>Feedback Text: {item?.feedbackText}</p>
            <p>
              Overall Rating: {renderStars(item?.rating.overall)} ({item?.rating.overall})
            </p>
            <p>
              Difficulty Rating: {renderStars(item?.rating.difficulty)} ({item?.rating.difficulty})
            </p>
            <p>
              Enjoyment Rating: {renderStars(item?.rating.enjoyment)} ({item?.rating.enjoyment})
            </p>
          </div>
        ))}
      </div>
      <div className="bg-white text-gray-700 my-3 border-light-purple rounded-lg p-5">
        <h5>Game Feedback</h5>
        <p>Your Rating: {selectedRating}</p>
        <Rating
          onRate={handleRate}
          difficultyRating={difficultyRating}
          overallRating={overallRating}
          enjoymentRating={enjoymentRating}
          onOverallRate={handleOverallRate}
          onDifficultyRate={handleDifficultyRate}
          onEnjoymentRate={handleEnjoymentRate}
          onComment={handleCommentChange}
          comment={comment}
          onSubmit={handleSumbit}
        />
      </div>
    </div>
  );
};

export default FeedBackPage;
