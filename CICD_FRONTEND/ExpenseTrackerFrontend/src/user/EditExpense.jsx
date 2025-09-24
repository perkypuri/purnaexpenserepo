import { useState, useEffect } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import axios from "axios";
import config from "../config";

export default function EditExpense() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const expenseFromState = location.state?.expense;
  const user = JSON.parse(localStorage.getItem("user"));

  const [formData, setFormData] = useState({
    category: "",
    amount: "",
    date: "",
    description: "",
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!user) {
      navigate("/userlogin");
      return;
    }

    if (expenseFromState) {
      setFormData({ ...expenseFromState });
      setLoading(false);
    } else {
      // Fetch from backend if state not available (refresh-safe)
      axios
        .get(`${config.url}/expenses/${id}`)
        .then((res) => setFormData(res.data))
        .catch(() => setError("Failed to load expense"))
        .finally(() => setLoading(false));
    }
  }, [id, expenseFromState, navigate, user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    setMessage("");

    try {
      await axios.put(`${config.url}/expenses/update/${id}`, { ...formData, user: { id: user.id } });
      setMessage("Expense updated successfully!");
      setTimeout(() => navigate("/viewexpenses"), 1000);
    } catch {
      setError("Failed to update expense");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div style={{ textAlign: "center", marginTop: "50px" }}>Loading...</div>;

  return (
    <div style={{ maxWidth: "450px", margin: "40px auto", padding: "25px", border: "1px solid #ddd", borderRadius: "10px", boxShadow: "0 4px 15px rgba(0,0,0,0.1)", backgroundColor: "#fff" }}>
      <h3 style={{ textAlign: "center", textDecoration: "underline", marginBottom: "20px" }}>Edit Expense</h3>
      {message && <p style={{ color: "green", textAlign: "center" }}>{message}</p>}
      {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "15px" }}>
          <label>Category</label>
          <input type="text" name="category" value={formData.category} onChange={handleChange} required style={{ width: "100%", padding: "8px", borderRadius: "5px", border: "1px solid #ccc" }} />
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label>Amount</label>
          <input type="number" name="amount" value={formData.amount} onChange={handleChange} required min="0" style={{ width: "100%", padding: "8px", borderRadius: "5px", border: "1px solid #ccc" }} />
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label>Date</label>
          <input type="date" name="date" value={formData.date} onChange={handleChange} required style={{ width: "100%", padding: "8px", borderRadius: "5px", border: "1px solid #ccc" }} />
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label>Description</label>
          <textarea name="description" value={formData.description} onChange={handleChange} style={{ width: "100%", padding: "8px", borderRadius: "5px", border: "1px solid #ccc", minHeight: "60px" }} />
        </div>

        <button type="submit" disabled={saving} style={{ width: "100%", padding: "10px", borderRadius: "5px", border: "none", backgroundColor: "#007bff", color: "#fff", cursor: saving ? "not-allowed" : "pointer" }}>
          {saving ? "Saving..." : "Update Expense"}
        </button>
      </form>
    </div>
  );
}
