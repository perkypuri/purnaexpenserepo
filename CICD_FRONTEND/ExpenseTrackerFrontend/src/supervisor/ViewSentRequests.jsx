import { useEffect, useState } from "react";
import axios from "axios";

export default function ViewSentRequests() {
  const [requests, setRequests] = useState([]);
  const supervisor = JSON.parse(localStorage.getItem("supervisor"));

  useEffect(() => {
    fetchSentRequests();
  }, []);

  const fetchSentRequests = async () => {
    try {
      const res = await axios.get(`/supervisorRequests/supervisor/${supervisor.id}`);
      setRequests(res.data || []);
    } catch (err) {
      console.error("Failed to fetch sent requests", err);
      setRequests([]);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Sent Requests</h2>
      {requests.length === 0 ? (
        <p>No sent requests.</p>
      ) : (
        <table border="1" cellPadding="8">
          <thead>
            <tr>
              <th>ID</th>
              <th>User ID</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((req) => (
              <tr key={req.id}>
                <td>{req.id}</td>
                <td>{req.user.id}</td>
                <td>{req.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
