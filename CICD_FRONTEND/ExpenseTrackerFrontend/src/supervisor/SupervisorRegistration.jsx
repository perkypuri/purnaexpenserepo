import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function SupervisorRegistration() {
  const [form, setForm] = useState({ name: "", email: "", password: "", mobile: "" });
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/supervisors/register", form);
      setSuccess("Registration successful!");
      navigate("/supervisorlogin");
    } catch (err) {
      console.error("Failed to register", err);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Supervisor Registration</h2>
      {success && <p style={{ color: "green" }}>{success}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input name="name" value={form.name} onChange={handleChange} required />
        </div>
        <div>
          <label>Email:</label>
          <input name="email" value={form.email} onChange={handleChange} required />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" name="password" value={form.password} onChange={handleChange} required />
        </div>
        <div>
          <label>Mobile:</label>
          <input name="mobile" value={form.mobile} onChange={handleChange} required />
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
}
