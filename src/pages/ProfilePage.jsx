import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
function ProfilePage (){
  const [profile, setProfile] = useState(null);
  const [editing, setEditing] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
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
      formData.append('image', profileImage); // Append the image file
  
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
    const { name, value } = e.target;
    if (name === 'image') {
      setProfileImage(e.target.files[0]);
    } else {
      setProfile({ ...profile, [name]: value });
    }
   // setProfile({ ...profile, [name]: value });

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
    <div className="max-w-lg mx-auto w-11/12 my-8 p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-4 text-[#008489] dark:text-[#008489]">Create a New Question</h2>
        <form>
        <div className="mb-4">
    <label className="block text-sm font-medium text-[#008489] dark:text-[#008489]">
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
    <label className="block text-sm font-medium text-[#008489] dark:text-[#008489]">
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
    <label className="block text-sm font-medium text-[#008489] dark:text-[#008489]">
      Date of Birth:
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
    <label className="block text-sm font-medium text-[#008489] dark:text-[#008489]">
     Upload your image :
      <input
        type="file"
        name="image"
        value={profile.image}
        accept="image/*" 
        className="mt-1 p-2 w-full border rounded-md"
        onChange={handleChange}
      />
    </label>
  </div>

  <div className="mb-4">
    <label className="block text-sm font-medium text-[#008489] dark:text-[#008489]">
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
    <label className="block text-sm font-medium text-[#008489] dark:text-[#008489]">
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
          <button type="button" className="bg-[#008489] mx-auto  hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline-blue active:bg-blue-800" onClick={handleUpdate}>
            Update 
          </button>
          <button type="button" className="bg-red-800 mx-auto  hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline-blue active:bg-blue-800" onClick={handleCancel}>
            Cancel 
          </button>
          </div>  
        </form>
        </div>
       </div>
      ) : (
        <div className="flex my-screen items-center">
    <div className="max-w-lg mx-auto w-11/12 my-8 p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
    <h2 className="text-2xl font-bold mb-4 text-[#008489] dark:text-[#008489] ">{`Profile : ${profile.name} ${profile.lastName}`}</h2>

         <p className="py-2">{`First Name: ${profile.name} `}</p>
         <p className="py-2" >{`Last Name: ${profile.lastName} `}</p>
          <p className="py-2" >{`Date of Birth: ${profile.dateOfBirth}`}</p>
          <p className="py-2" >{`Gender: ${profile.gender}`}</p>
          <p className="py-2" >{`Phone Number: ${profile.phoneNumber}`}</p>
          <img className="py-2 h-24 w-24 rounder-50"  src={profile.image}/>
          <button type="button" className="mt-3 bg-[#008489] mx-auto flex hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline-blue active:bg-blue-800" onClick={handleEdit}>
            Edit Profile
          </button>
        </div>
        </div>
      )}
    </div>
  );
}

export default ProfilePage;
