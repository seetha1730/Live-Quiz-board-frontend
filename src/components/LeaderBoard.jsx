// Leaderboard.js
import PropTypes from 'prop-types';

const Leaderboard = ({ score, theme, trophyImage }) => {
  return (
    <section className="rounded-lg h-screen w-full block items-start " id="leaderboard">
      <div className="row">
        <div className="block w-full text-white">
          <h2 className={` ${theme === 'dark' ? ' bg-gray-700' : ' text-gradient '} text-2xl font-bold mb-4 text-center `}>
            Current Leaderboard <p className="capitalize">Created by {score[0].userName}</p>
          </h2>

          <div className="m-5 scoreList">
            <div className="grid grid-cols-12">
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
                <div key={index} className="grid p-5 grid-cols-12 items-center bg-dull-purple border-light-purple m-3">
                  <div className="col-span-2 flex flex-row items-center">
                    {index < 3 && (
                      <img className="w-10 mr-2" src={trophyImage} alt="Trophy" />
                    )}
                    {index}
                  </div>
                  <div className="col-span-8">
                    <p>{item.userName}</p>
                    <p className="text-xs text-gray-500">{item.email}</p>
                  </div>
                  <div className="col-span-2">
                    {item.score}
                  </div>
                </div>
              ))}
          </div>
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

