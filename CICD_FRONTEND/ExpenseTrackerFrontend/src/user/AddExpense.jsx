import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import config from "../config";

export default function AddExpense() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    category: "",
    amount: "",
    date: "",
    description: "",
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setError("");

    const payload = {
      ...formData,
      user: { id: JSON.parse(localStorage.getItem("user")).id },
    };

    try {
      const response = await axios.post(`${config.url}/expenses/add`, payload);

      if (response.status === 200) {
        setMessage(response.data);
        setError("");
        setTimeout(() => {
          navigate("/userdashboard");
        }, 1000);
      }
    } catch (err) {
      if (err.response) {
        setError(err.response.data);
      } else {
        setError("An unexpected error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        maxWidth: "450px",
        margin: "40px auto",
        padding: "25px",
        border: "1px solid #ddd",
        borderRadius: "10px",
        boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
        backgroundColor: "#fff",
      }}
    >
      <h3 style={{ textAlign: "center", textDecoration: "underline", marginBottom: "20px" }}>
        Add Expense
      </h3>

      {message && <p style={{ color: "green", textAlign: "center" }}>{message}</p>}
      {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "15px" }}>
          <label>Category</label>
          <input
            type="text"
            id="category"
            value={formData.category}
            onChange={handleChange}
            required
            style={{ width: "100%", padding: "8px", borderRadius: "5px", border: "1px solid #ccc" }}
          />
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label>Amount</label>
          <input
            type="number"
            id="amount"
            value={formData.amount}
            onChange={handleChange}
            required
            min="0"
            style={{ width: "100%", padding: "8px", borderRadius: "5px", border: "1px solid #ccc" }}
          />
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label>Date</label>
          <input
            type="date"
            id="date"
            value={formData.date}
            onChange={handleChange}
            required
            style={{ width: "100%", padding: "8px", borderRadius: "5px", border: "1px solid #ccc" }}
          />
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label>Description</label>
          <textarea
            id="description"
            value={formData.description}
            onChange={handleChange}
            style={{ width: "100%", padding: "8px", borderRadius: "5px", border: "1px solid #ccc", minHeight: "60px" }}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          style={{
            width: "100%",
            padding: "10px",
            borderRadius: "5px",
            border: "none",
            backgroundColor: "#007bff",
            color: "#fff",
            cursor: loading ? "not-allowed" : "pointer",
          }}
        >
          {loading ? "Please wait..." : "Add Expense"}
        </button>
      </form>
    </div>
  );
}
