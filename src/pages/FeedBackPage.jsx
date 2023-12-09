// components/Feedback.js
import { useState, useEffect,useContext} from 'react';
import axios from 'axios';
import { ThemeContext } from '../context/theme.context';
import Star from '../components/Star';

const FeedBackPage = () => {
  const [feedback, setFeedback] = useState([]);
  const { theme } = useContext(ThemeContext);
  useEffect(() => {
    // Fetch feedback from your API
    const fetchFeedback = async () => {
      try {
        const response = await axios.get( `${import.meta.env.VITE_BASE_URL_API}/feedback/all`);
        setFeedback(response.data);
      } catch (error) {
        console.error('Error fetching feedback:', error);
      }
    };

    fetchFeedback();
  }, []);
  const renderStars = (rating) => {
    const filledStars = Array.from({ length: 5 }, (_, index) => <Star key={index} filled={index < rating} />);
    return filledStars;
  };
  return (
    <div className="w-11/12 pb-8 sm:w-8/12 mx-auto">
  <h2 className={` ${theme === 'dark' ? ' text-gray-300  ' : ' text-gradient '} text-2xl m-5 font-bold mb-4 text-center `}>

     Feedback</h2>
     <div  className=' '>
  
        {feedback.map((item) => (
     <div key={item._id} className={` ${theme === 'dark' ? '  text-gray-300 bg-gray-800 border border-white ' : ' bg-base-purple border-light-purple '}   p-5  m-2 rounded-md`}>
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
      
    </div>
  );
};

export default FeedBackPage;
