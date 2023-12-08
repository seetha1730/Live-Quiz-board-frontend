
import PropTypes from "prop-types";

const Rating = ({ onOverallRate, onDifficultyRate, onEnjoymentRate, onComment, onSubmit ,comment ,overallRating,difficultyRating,enjoymentRating}) => {

  return (
    <div className="row">
      <div className="mt-3">
        <p className="text-sm p-3">Overall Rating:</p>
        <div className="flex justify-center items-stretch self-end">
          {[1, 2, 3, 4, 5].map((value) => (
            <button
              className="btn border-white bg-purple-500 bg-transparent rounded-full"
              key={value}
              onClick={()=>onOverallRate(value)}
              style={{
                color: value <= overallRating ? "gold" : "white",
                cursor: "pointer",
              }}
            >
              ★
            </button>
          ))}
        </div>
      </div>

      <div className="mt-3">
        <p className="text-sm p-3">Difficulty Rating:</p>
        <div className="flex justify-center items-stretch self-end">
          {[1, 2, 3, 4, 5].map((value) => (
            <button
              className="btn border-white bg-purple-500 bg-transparent rounded-full"
              key={value}
              onClick={()=>onDifficultyRate(value)}
              style={{
                color: value <= difficultyRating ? "gold" : "white",
                cursor: "pointer",
              }}
            >
              ★
            </button>
          ))}
        </div>
      </div>

      <div className="mt-3">
        <p className="text-sm p-3">Enjoyment Rating:</p>
        <div className="flex justify-center items-stretch self-end">
          {[1, 2, 3, 4, 5].map((value) => (
            <button
              className="btn border-white bg-purple-500 bg-transparent rounded-full"
              key={value}
              onClick={() => onEnjoymentRate(value)}
              style={{
                color: value <= enjoymentRating ? "gold" : "white",
                cursor: "pointer",
              }}
            >
              ★
            </button>
          ))}
        </div>
      </div>

      <div className="mt-3">
        <label htmlFor="comment" className="text-sm">
          Add a comment / Improve:
        </label>
        <textarea
          id="comment"
          name="comment"
          value={comment}
          onChange={(event) => onComment(event.target?.value || "")}
          className="border p-2 w-full rounded"
        ></textarea>
      </div>

      <button
        className="btn mt-3 bg-purple-600 text-white rounded-full"
        onClick={()=> onSubmit()}
      >
        Submit
      </button>
    </div>
  );
};

Rating.propTypes = {
  onOverallRate: PropTypes.func.isRequired,
  onDifficultyRate: PropTypes.func.isRequired,
  onEnjoymentRate: PropTypes.func.isRequired,
  onComment: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default Rating;
