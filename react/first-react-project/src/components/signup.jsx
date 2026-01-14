import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // for redirect
import axios from "axios";
import "./signup.css";

const Signup = () => {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    axios
      .post("http://127.0.0.1:5000/api/signup", {
        username: form.username,
        email: form.email,
        password: form.password
      })
      .then((res) => {
        alert(res.data.message);
        navigate("/login"); // redirect to login after signup
      })
      .catch((err) => {
        alert(err.response?.data?.error || "Something went wrong");
      });
  };

  return (
    <div className="signup-container">
      <form className="signup-form" onSubmit={handleSubmit}>
        <h2>Create Account</h2>
        <input
          type="text"
          name="username"
          placeholder="Full Name"
          value={form.username}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={form.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={form.confirmPassword}
          onChange={handleChange}
          required
        />
        <button type="submit">Sign Up</button>
        <p className="login-link">
          <Link to="/login">Already have an account? Login</Link>
        </p>
      </form>
    </div>
  );
};

export default Signup;

