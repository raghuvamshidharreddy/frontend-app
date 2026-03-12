import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "../App";
import axios from "axios";
import "./Auth.css";

function Login() {
  const { user, setUser } = useContext(AppContext);
  const API_URL = import.meta.env.VITE_API_URL;
  const Navigate = useNavigate()
  
  const handleLogin = async () => {
    try {
      const url = API_URL + "/auth/signin";
      const response = await axios.post(url, user);
      if (response.data.error) {
        alert(response.data.error);
      } else {
        setUser(response.data);
        Navigate("/");
      }
    } catch (error) {
      console.error("Login failed:", error);
      alert("Something went wrong during login.");
    }
  };

  return (
    <div className="auth-container">
      <h2>Welcome Back</h2>
      <div className="auth-form">
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
            placeholder="Enter your password"
          />
        </p>
        <button onClick={handleLogin}>Sign In</button>
      </div>
      <div className="auth-footer">
        Don't have an account? <Link to="/register">Register here</Link>
      </div>
    </div>
  );
}

export default Login;