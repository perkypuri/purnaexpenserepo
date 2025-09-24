import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import config from "../config";
import { useAuth } from "../contextapi/AuthContext";
import "./UserDashboard.css";

export default function UserLogin() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { setIsUserLoggedIn } = useAuth();

  const handleChange = (e) => setFormData({ ...formData, [e.target.id]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post(
        `${config.url}/users/login`,
        null,
        { params: { email: formData.email, password: formData.password } }
      );

      localStorage.setItem("user", JSON.stringify(response.data));
      setIsUserLoggedIn(true);

      navigate("/user/dashboard");
    } catch (err) {
      setError(err.response?.data.message || "Invalid email or password");
    }
  };

  return (
    <div className="profile-container">
      <form onSubmit={handleSubmit}>
        <h3 style={{ textAlign: "center" }}>User Login</h3>
        {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}
        <div>
          <label>Email</label>
          <input type="email" id="email" value={formData.email} onChange={handleChange} required />
        </div>
        <div>
          <label>Password</label>
          <input type="password" id="password" value={formData.password} onChange={handleChange} required />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}
