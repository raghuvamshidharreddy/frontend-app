import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import "./Auth.css";

function Register() {
  const [user, setUser] = useState({});
  const API_URL = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      const url = API_URL + "/auth/signup";
      const response = await axios.post(url, user);
      alert("Registration Successful");
      navigate("/login");
    } catch (error) {
      console.error("Registration failed:", error);
      alert("Registration failed. Please try again.");
    }
  };

  return (
    <div className="auth-container">
      <h2>Create Account</h2>
      <div className="auth-form">
        <p>
          <label>Full Name</label>
          <input
            type="text"
            onChange={(e) => setUser({ ...user, name: e.target.value })}
            placeholder="Enter your name"
          />
        </p>
        <p>
          <label>Email Address</label>
          <input
            type="text"
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            placeholder="Enter your email"
          />
        </p>
        <p>
          <label>Password</label>
          <input
            type="password"
            onChange={(e) => setUser({ ...user, password: e.target.value })}
            placeholder="Create a password"
          />
        </p>
        <button onClick={handleSubmit}>Create Account</button>
      </div>
      <div className="auth-footer">
        Already a member? <Link to="/login">Login here</Link>
      </div>
    </div>
  );
}

export default Register;