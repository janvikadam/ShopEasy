import React, { useState } from "react";
import axios from "axios";
import "./login.css";

const Login = () => {
  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("http://127.0.0.1:5000/api/login", form)
      .then((res) => {
        alert(res.data.message);

        // Save user info in localStorage (for session)
        localStorage.setItem("user", JSON.stringify(res.data));

        // Redirect to products page
        window.location.href = "/profile";
      })
      .catch((err) => {
        alert(err.response?.data?.error || "Something went wrong");
      });
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Login</h2>
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
        <button type="submit">Login</button>
        <p className="signup-link">
          <a href="/signup">Don't have an account? Sign Up</a>
        </p>
      </form>
    </div>
  );
};

export default Login;
