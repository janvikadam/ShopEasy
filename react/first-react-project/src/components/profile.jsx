import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import "./profile.css";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      setForm(parsedUser);
    } else {
      navigate("/login");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    setUser(form);
    localStorage.setItem("user", JSON.stringify(form)); // Save updated data
    setIsEditing(false);
  };

  if (!user) return null;

  return (
    <div className="profile-page">
      <div className="profile-header">
        <FaUserCircle size={80} className="profile-icon" />
        <h2>{user.username}</h2>
        <p>{user.email}</p>
      </div>

      <div className="profile-details">
        <h3>Profile Information</h3>
        {isEditing ? (
          <div className="edit-form">
            <input
              type="text"
              name="username"
              value={form.username}
              onChange={handleChange}
            />
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
            />
            <button onClick={handleSave}>Save</button>
            <button onClick={() => setIsEditing(false)}>Cancel</button>
          </div>
        ) : (
          <ul>
            <li><strong>Username:</strong> {user.username}</li>
            <li><strong>Email:</strong> {user.email}</li>
          </ul>
        )}
      </div>

      <div className="profile-actions">
        {!isEditing && <button onClick={() => setIsEditing(true)}>Edit Profile</button>}
        <button onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
};

export default Profile;

