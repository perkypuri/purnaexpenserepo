import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import config from "../config";

export default function ViewExpenses() {
  const navigate = useNavigate();
  const [expenses, setExpenses] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);

  const user = JSON.parse(localStorage.getItem("user"));

  const fetchExpenses = async () => {
    try {
      const response = await axios.get(`${config.url}/expenses/user/${user.id}`);
      setExpenses(response.data);
    } catch (err) {
      setError("Failed to fetch expenses");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!user || !user.id) {
      navigate("/userlogin");
    } else {
      fetchExpenses();
    }
  }, []);

  const handleEdit = (expense) => {
    navigate(`/editexpense/${expense.id}`, { state: { expense } });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this expense?")) return;
    try {
      setDeletingId(id);
      await axios.delete(`${config.url}/expenses/delete/${id}`);
      setExpenses(expenses.filter((exp) => exp.id !== id));
    } catch (err) {
      setError("Failed to delete expense");
    } finally {
      setDeletingId(null);
    }
  };

  if (loading) return <div style={{ textAlign: "center", marginTop: "50px" }}>Loading...</div>;
  if (!user) return <div style={{ textAlign: "center", marginTop: "50px" }}>No user found.</div>;

  return (
    <div style={{ maxWidth: "900px", margin: "20px auto", fontFamily: "Arial, sans-serif", padding: "10px" }}>
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Your Expenses</h2>
      {error && <p style={{ textAlign: "center", color: "red" }}>{error}</p>}

      {expenses.length === 0 ? (
        <p style={{ textAlign: "center" }}>No expenses found.</p>
      ) : (
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", minWidth: "600px" }}>
            <thead>
              <tr style={{ borderBottom: "1px solid #ccc", backgroundColor: "#f9f9f9" }}>
                <th style={{ padding: "10px" }}>Category</th>
                <th style={{ padding: "10px" }}>Amount</th>
                <th style={{ padding: "10px" }}>Date</th>
                <th style={{ padding: "10px" }}>Description</th>
                <th style={{ padding: "10px" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {expenses.map((expense) => (
                <tr key={expense.id} style={{ borderBottom: "1px solid #eee" }}>
                  <td style={{ padding: "10px" }}>{expense.category}</td>
                  <td style={{ padding: "10px" }}>{expense.amount}</td>
                  <td style={{ padding: "10px" }}>{expense.date}</td>
                  <td style={{ padding: "10px" }}>{expense.description}</td>
                  <td style={{ padding: "10px" }}>
                    <button
                      onClick={() => handleEdit(expense)}
                      style={{
                        marginRight: "10px",
                        padding: "5px 12px",
                        border: "none",
                        borderRadius: "5px",
                        backgroundColor: "#007bff",
                        color: "white",
                        cursor: "pointer",
                      }}
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(expense.id)}
                      disabled={deletingId === expense.id}
                      style={{
                        padding: "5px 12px",
                        border: "none",
                        borderRadius: "5px",
                        backgroundColor: "#dc3545",
                        color: "white",
                        cursor: deletingId === expense.id ? "not-allowed" : "pointer",
                      }}
                    >
                      {deletingId === expense.id ? "Deleting..." : "Delete"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
