import { useState } from "react";
import axios from "axios";
import config from "../config";
import "./UserDashboard.css";

export default function UserRegistration() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    mobile: ""
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${config.url}/users/register`, formData);
      if (response.status === 200) {
        setMessage(response.data.message || "Registration successful!");
        setError("");
        setFormData({
          name: "",
          email: "",
          password: "",
          mobile: ""
        });
      }
    } catch (err) {
      setMessage("");
      if (err.response) {
        const msg = err.response.data.message || err.response.data;
        setError(msg);
      } else {
        setError("An unexpected error occurred.");
      }
    }
  };

  return (
    <div>
      <h3 style={{ textAlign: "center", textDecoration: "underline" }}>User Registration</h3>
      {message ? (
        <p style={{ textAlign: "center", color: "green", fontWeight: "bolder" }}>{message}</p>
      ) : (
        <p style={{ textAlign: "center", color: "red", fontWeight: "bolder" }}>{error}</p>
      )}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Full Name</label>
          <input
            type="text"
            id="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Email</label>
          <input
            type="email"
            id="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            id="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Mobile</label>
          <input
            type="text"
            id="mobile"
            value={formData.mobile}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
}
