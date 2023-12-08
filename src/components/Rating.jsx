import  { useState } from "react";
import PropTypes from 'prop-types';
const Rating = ({ onRate, onComment }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const handleRate = (value) => {
    setRating(value);
    onRate(value);
  };

  const handleCommentChange = (event) => {
    setComment(event.target.value);
    onComment(event.target.value);
  };
  const handleSubmit = () => {
    
  };

  return (
    <div className="row">
      <p className="text-sm p-3">Select your rating:</p>
      <div className="flex justify-center items-stretch self-end">
        {[1, 2, 3, 4, 5].map((value) => (
          <button
            className="btn border-white bg-purple-500 bg-transparent rounded-full"
            key={value}
            onClick={() => handleRate(value)}
            style={{
              color: value <= rating ? "gold" : "white",
              cursor: "pointer",
            }}
          >
            ★
          </button>
        ))}
      </div>
      <div className="mt-3">
        <label htmlFor="comment" className="text-sm">
          Add a comment / Improve:
        </label>
        <textarea
          id="comment"
          name="comment"
          value={comment}
          onChange={handleCommentChange}
          className="border p-2 w-full rounded"
        ></textarea>
      </div>

        {/* Submit button */}
        <button
        className="btn mt-3 bg-purple-600 text-white rounded-full"
        onClick={handleSubmit}
      >
        Submit
      </button>
    </div>
  );
};
Rating.propTypes = {
  onRate: PropTypes.node.isRequired,
  onComment: PropTypes.node.isRequired,
}

export default Rating;
