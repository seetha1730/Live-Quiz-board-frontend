import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { ThemeContext } from '../context/theme.context';
import ProfileCard from '../components/ProfileCard';


function ProfilePage() {
  const { theme } = useContext(ThemeContext);
  const [profile, setProfile] = useState(null);
  const [editing, setEditing] = useState(false);
  const [profileImage, setProfileImage] = useState(null);

  console.log("profile:", profile)

  const { userId } = useParams();
  useEffect(() => {
    const fetchProfile = async () => {
      try {

        const response = await axios.get(`${import.meta.env.VITE_BASE_URL_API}/profile/${userId}`);
        setProfile(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProfile();
  }, [userId]);

  const handleEdit = () => {
    setEditing(true);
  };

  const handleUpdate = async () => {
    try {
      const formData = new FormData();
      formData.append('name', profile.name);
      formData.append('lastName', profile.lastName);
      formData.append('dateOfBirth', profile.dateOfBirth);
      formData.append('gender', profile.gender);
      formData.append('phoneNumber', profile.phoneNumber);
      formData.append('image', profileImage);

      const response = await axios.put(`${import.meta.env.VITE_BASE_URL_API}/profile/${userId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data', // Set the content type to multipart/form-data
        },
      });

      setProfile(response.data);
      setEditing(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === 'image') {
      setProfileImage(files[0]);
    } else {
      setProfile({ ...profile, [name]: value });
    }
  };

  const handleCancel = () => {
    setEditing(false);
  };

  if (!profile) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {editing ? (
        <div className="flex my-screen items-center">
          <div className={` ${theme === 'dark' ? ' bg-gray-700' : 'bg-base-purple border-light-purple'} max-w-lg mx-auto w-11/12 my-8 p-6  text-white-900 shadow-lg rounded-lg `}>
            <h2 className={` ${theme === 'dark' ? ' bg-gray-700' : ' text-gradient '} text-2xl font-bold mb-4 text-center `}>Update my Profile </h2>
            <form>
              <div className="mb-4">
                <label className="block text-sm font-medium ">
                  First Name:
                  <input
                    type="text"
                    name="name"
                    value={profile.name}
                    className="mt-1 p-2 w-full border rounded-md"
                    onChange={handleChange}
                  />
                </label>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium ">
                  Last Name:
                  <input
                    type="text"
                    name="lastName"
                    value={profile.lastName}
                    className="mt-1 p-2 w-full border rounded-md"
                    onChange={handleChange}
                  />
                </label>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium ">
                  Date of Birth:<span className="ml-2">*</span>
                  <input
                    type="date"
                    name="dateOfBirth"
                    value={profile.dateOfBirth}
                    className="mt-1 p-2 w-full border rounded-md"
                    onChange={handleChange}
                  />
                </label>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium ">
                  Upload your image :
                  <input
                    type="file"
                    name="image"
                    accept="image/*"
                    className="mt-1 p-2 w-full border rounded-md"
                    onChange={handleChange}
                  />
                </label>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium ">
                  Gender:
                  <input
                    type="text"
                    name="gender"
                    value={profile.gender}
                    className="mt-1 p-2 w-full border rounded-md"
                    onChange={handleChange}
                  />
                </label>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium">
                  Phone Number:
                  <input
                    type="text"
                    name="phoneNumber"
                    value={profile.phoneNumber}
                    className="mt-1 p-2 w-full border rounded-md"
                    onChange={handleChange}
                  />
                </label>
              </div>

              <div className="flex">
                <button
                  type="button"
                  onClick={handleUpdate}
                  className={` ${theme === 'dark' ? ' bg-gray-800 border-white ' : 'gradient-button'}  text-white mx-auto flex   font-bold py-2 px-4 rounded-3xl focus:outline-none `}
                >
                  Update
                </button>

                <button type="button" className="bg-white mx-auto  hover:bg-blue-700 text-gray-700 font-bold mx-auto flex   font-bold py-2 px-4 rounded-3xl focus:outline-none" onClick={handleCancel}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : (
        <ProfileCard
          theme={theme}
          profile={profile}
          handleEdit={handleEdit}
        />


      )}
    </div>
  );
}

export default ProfilePage;
