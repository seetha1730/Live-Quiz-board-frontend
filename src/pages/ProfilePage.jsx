import React, { useState, useEffect } from "react";
import axios from "axios";

function ProfilePage ({ userId }){
  const [profile, setProfile] = useState(null);
  const [editing, setEditing] = useState(false);
  const [updatedProfile, setUpdatedProfile] = useState({});

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/profile/${userId}`);
        setProfile(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProfile();
  }, [userId]);

  const handleEdit = () => {
    setEditing(true);
    setUpdatedProfile({ ...profile });
  };

  const handleUpdate = async () => {
    try {
      const response = await axios.put(`http://localhost:3000/profile/${userId}`, updatedProfile);
      setProfile(response.data);
      setEditing(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedProfile({ ...updatedProfile, [name]: value });
  };

  if (!profile) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {editing ? (
        <form>
          <label>
            First Name:
            <input
              type="text"
              name="firstName"
              value={updatedProfile.firstName}
              onChange={handleChange}
            />
          </label>
          <label>
            Last Name:
            <input
              type="text"
              name="lastName"
              value={updatedProfile.lastName}
              onChange={handleChange}
            />
          </label>
          <label>
            Age:
            <input
              type="number"
              name="age"
              value={updatedProfile.age}
              onChange={handleChange}
            />
          </label>
          <button type="button" onClick={handleUpdate}>
            Save
          </button>
        </form>
      ) : (
        <div>
          <h1>{`${profile.firstName} ${profile.lastName}`}</h1>
          <p>{`Age: ${profile.age}`}</p>
          <button type="button" onClick={handleEdit}>
            Edit Profile
          </button>
        </div>
      )}
    </div>
  );
}

export default ProfilePage;
