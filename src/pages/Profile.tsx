import React, { useState, useEffect } from "react";
import { useUser } from "../context/UserContext"; // Import the custom hook
import { UserDetailsDto, UpdateUserProfileDto } from "../dtos/UserDtos";
import { useUserService } from "../services/useUserService";
import ProfilePhotoUpdate from "../components/ProfilePhotoUpdate";

const Profile: React.FC = () => {
  const { user, updateUser } = useUser();
  const [isEditing, setIsEditing] = useState(false);

  const [userDetails, setUserDetails] = useState<UpdateUserProfileDto>({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    userName: user?.userName || "",
    email: user?.email || "",
  });

  const {updateUserProfile} = useUserService();

  useEffect(() => {
    if (user) {
      setUserDetails({
        firstName: user.firstName,
        lastName: user.lastName,
        userName: user.userName,
        email: user.email,
      });
    }
  }, [user]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserDetails((prevDetails) => ({ ...prevDetails, [name]: value }));
  };

  const handleEditToggle = () => setIsEditing(!isEditing);

  const handleSave = async () => {
    if (user) {
      const success = await updateUserProfile(userDetails);

      if (success) {
        setIsEditing(false);
        updateUser({ ...user, ...userDetails });
      } else {
        console.error("Failed to update profile");
      }
    }
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {/* Separate Section or Component for Photo Update */}
      <ProfilePhotoUpdate />
      <h1>Profile</h1>

      <div>
        <label>First Name:</label>
        {isEditing ? (
          <input
            name="firstName"
            value={userDetails.firstName}
            onChange={handleInputChange}
          />
        ) : (
          <span>{user.firstName}</span>
        )}
      </div>

      <div>
        <label>Last Name:</label>
        {isEditing ? (
          <input
            name="lastName"
            value={userDetails.lastName}
            onChange={handleInputChange}
          />
        ) : (
          <span>{user.lastName}</span>
        )}
      </div>

      <div>
        <label>Username:</label>
        {isEditing ? (
          <input
            name="userName"
            value={userDetails.userName}
            onChange={handleInputChange}
          />
        ) : (
          <span>{user.userName}</span>
        )}
      </div>

      <div>
        <label>Email:</label>
        {isEditing ? (
          <input
            name="email"
            value={userDetails.email}
            onChange={handleInputChange}
          />
        ) : (
          <span>{user.email}</span>
        )}
        {user.isEmailConfirmed ? (
          <span style={{ color: "green" }}>✔️ Email Confirmed</span>
        ) : (
          <span style={{ color: "red" }}>❌ Email Not Confirmed</span>
        )}
      </div>

      <button onClick={isEditing ? handleSave : handleEditToggle}>
        {isEditing ? "Save" : "Edit"}
      </button>
    </div>
  );
};

export default Profile;
