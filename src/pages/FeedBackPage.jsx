// components/Feedback.js
import { useState, useEffect,useContext } from 'react';
import axios from 'axios';
import { ThemeContext } from '../context/theme.context';

const FeedbackPage = () => {
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

  return (
    <div className="w-11/12 pb-8 sm:w-8/12 mx-auto">
  <h2 className={` ${theme === 'dark' ? ' text-gray-300 ' : ' text-gradient '} text-2xl m-5 font-bold mb-4 text-center `}>

     Feedback</h2>
      <ul>
        {feedback.map((item) => (
          <li key={item.id}>
            <p>{item.comment}</p>
            <p>Rating: {item.rating}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FeedbackPage;
