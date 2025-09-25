import React, { useEffect, useState } from "react";
import axios from "axios";

export default function ViewRequests() {
  const [requests, setRequests] = useState([]);
  const [error, setError] = useState("");

  const baseUrl = `${import.meta.env.VITE_API_URL}/admin`;

  // Fetch all supervisor requests
  const fetchRequests = async () => {
    try {
      const response = await axios.get(`${baseUrl}/requests`);
      setRequests(response.data);
      setError(""); // clear previous errors
    } catch (err) {
      console.error("Error fetching requests", err);
      setError("Failed to fetch requests");
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>All Supervisor Requests</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {requests.length === 0 ? (
        <p>No requests found</p>
      ) : (
        <table border="1" cellPadding="10" style={{ borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th>ID</th>
              <th>User Name</th>
              <th>Supervisor Name</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((req) => (
              <tr key={req.id}>
                <td>{req.id}</td>
                <td>{req.user?.username || "N/A"}</td>
                <td>{req.supervisor?.name || "N/A"}</td>
                <td>{req.status}</td>
                <td>
                  <button
                    onClick={async () => {
                      try {
                        await axios.delete(`${baseUrl}/requests?id=${req.id}`);
                        fetchRequests(); // refresh after delete
                      } catch (err) {
                        console.error("Failed to delete request", err);
                      }
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
