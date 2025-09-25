import { useEffect, useState } from "react";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL; // changed URL

export default function ViewSentRequests() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const supervisor = JSON.parse(localStorage.getItem("supervisor"));

  useEffect(() => {
    fetchSentRequests();
  }, []);

  const fetchSentRequests = async () => {
    try {
      const res = await axios.get(`${API_URL}/supervisorRequests/supervisor/${supervisor.id}`);
      setRequests(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error("Failed to fetch sent requests", err);
      setRequests([]);
    } finally {
      setLoading(false);
    }
  };

  const styles = {
    container: {
      padding: "20px",
      maxWidth: "800px",
      margin: "40px auto",
      backgroundColor: "#fff5f0",
      borderRadius: "12px",
      boxShadow: "0 6px 15px rgba(0,0,0,0.1)",
      fontFamily: "Arial, sans-serif",
    },
    title: {
      textAlign: "center",
      marginBottom: "20px",
      color: "#ff6f61",
    },
    table: {
      width: "100%",
      borderCollapse: "collapse",
    },
    th: {
      backgroundColor: "#ff7f50",
      color: "#fff",
      padding: "12px",
      textAlign: "left",
    },
    td: {
      padding: "10px",
      borderBottom: "1px solid #ffd1c1",
    },
    trHover: {
      backgroundColor: "#ffe4e1",
    },
    noRequests: {
      textAlign: "center",
      color: "#ff6f61",
      fontWeight: "bold",
    },
  };

  if (loading) return <p style={{ textAlign: "center" }}>Loading sent requests...</p>;

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Sent Requests</h2>
      {requests.length === 0 ? (
        <p style={styles.noRequests}>No sent requests.</p>
      ) : (
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>ID</th>
              <th style={styles.th}>User ID</th>
              <th style={styles.th}>Status</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((req) => (
              <tr
                key={req.id}
                style={{ cursor: "pointer" }}
                onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#ffe4e1")}
                onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
              >
                <td style={styles.td}>{req.id}</td>
                <td style={styles.td}>{req.user?.id}</td>
                <td style={styles.td}>{req.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
