
import PropTypes from "prop-types";

function ProfileCard({ theme, profile, handleEdit }) {
  return (
    <div className="flex my-screen items-center">
      <div className={` ${theme === 'dark' ? 'bg-gray-700' : 'bg-base-purple border-light-purple'} max-w-lg mx-auto w-11/12 my-8 p-6 text-white-900 shadow-lg rounded-lg `}>
        <h2 className={` ${theme === 'dark' ? 'bg-gray-700' : 'text-gradient'} text-2xl font-bold mb-4 text-center capitalize`}>
          {`Profile: ${profile.name} ${profile.lastName || ''}`}
        </h2>
        <p className="py-2 capitalize ">{`First Name: ${profile.name || ' '}`}</p>
        <p className="py-2 capitalize">{`Last Name: ${profile.lastName || ' '}`}</p>
        <p className="py-2">{`Date of Birth: ${new Date(profile.dateOfBirth).toLocaleDateString()}`}</p>

        <p className="py-2 capitalize">{`Gender: ${profile.gender}`}</p>
        <p className="py-2">{`Phone Number: ${profile.phoneNumber || ' '}`}</p>
        <img className="py-2 h-24 w-24 rounder-50" src={profile.image} alt="Profile" />

        <button
          type="button"
          onClick={handleEdit}
          className={` ${theme === 'dark' ? ' bg-gray-800 border-white ' : 'gradient-button'}  text-white mx-auto flex   font-bold py-2 px-4 rounded-3xl focus:outline-none `}
        >
          Edit Profile
        </button>


      </div>
    </div>
  );
}

ProfileCard.propTypes = {
  theme: PropTypes.string.isRequired,
  profile: PropTypes.shape({
    name: PropTypes.string.isRequired,
    lastName: PropTypes.string,
    dateOfBirth: PropTypes.instanceOf(Date).isRequired,
    gender: PropTypes.string.isRequired,
    phoneNumber: PropTypes.string,
    image: PropTypes.string.isRequired,
  }).isRequired,
  handleEdit: PropTypes.func.isRequired,
};
export default ProfileCard;
