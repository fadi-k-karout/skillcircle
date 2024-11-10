import React, { useState } from "react";
import Avatar from "react-avatar";
import { useUserService } from "../services/useUserService";
import { useAuth } from "../context/AuthContext";
import { useUser } from "../context/UserContext";
import styles from "./ProfilePhotoUpdate.module.css";

const ProfilePhotoUpdate: React.FC = () => {
  const { user, updateUser } = useUser();
  const { isAuthenticated } = useAuth();
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const {uploadProfilePhoto} = useUserService();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
      setError(null);
    }
  };

  const handleUpload = async () => {
    if (file && isAuthenticated && user) {
      setLoading(true);
      try {
        const formData = new FormData();
        formData.append("file", file);
        const result = await uploadProfilePhoto(
          user.id,
          formData
        );

        if (result.success && result.data) {
          updateUser({ ...user, photoUrl: result.data?.photoUrl });
        }
        setLoading(false);
      } catch (error) {
        setLoading(false);
        setError("Failed to upload photo. Please try again later.");
        console.error(error);
      }
    } else {
      setError("Please select a file to upload.");
    }
  };

  return (
    <div className={styles.profilePhotoUpdate}>
      <h3>Profile Photo</h3>
      {error && <p style={{ color: "red" }}>{error}</p>}

      <div className={styles.avatarContainer}>
        <Avatar
          name={user?.firstName + " " + user?.lastName}
          src={user?.photoUrl}
          round
          size="100"
          className={styles.profileAvatar}
        />

        <label className={styles.uploadLabel}>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            hidden
          />
          <div className={styles.uploadOverlay}>
            <span role="img" aria-label="camera" className="camera-icon">
              📷
            </span>
          </div>
        </label>
      </div>

      <button onClick={handleUpload} disabled={loading}>
        {loading ? "Uploading..." : "Upload Photo"}
      </button>
    </div>
  );
};

export default ProfilePhotoUpdate;
