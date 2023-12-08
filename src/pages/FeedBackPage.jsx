// components/Feedback.js
import { useState, useEffect } from 'react';
import axios from 'axios';

const Feedback = () => {
  const [feedback, setFeedback] = useState([]);

  useEffect(() => {
    // Fetch feedback from your API
    const fetchFeedback = async () => {
      try {
        const response = await axios.get( `${import.meta.env.VITE_BASE_URL_API}/feedback/user`);
        setFeedback(response.data);
      } catch (error) {
        console.error('Error fetching feedback:', error);
      }
    };

    fetchFeedback();
  }, []);

  return (
    <div>
      <h2>Feedback</h2>
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

export default Feedback;
