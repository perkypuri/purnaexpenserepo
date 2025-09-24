import { useEffect, useState } from "react";
import axios from "axios";
import config from "../config";
import "./UserDashboard.css";

export default function UserRequests() {
  const [requests, setRequests] = useState([]);
  const [error, setError] = useState("");
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (user) {
      fetchRequests();
    } else {
      setError("User not logged in.");
    }
  }, []);

  const fetchRequests = async () => {
    try {
      const response = await axios.get(
        `${config.url}/supervisorRequests/user/${user.id}`
      );
      setRequests(response.data);
      setError("");
    } catch {
      setError("Failed to fetch requests");
    }
  };

  const updateStatus = async (requestId, status) => {
    try {
      await axios.put(
        `${config.url}/supervisorRequests/updateStatus/${requestId}`,
        null,
        { params: { status } }
      );
      alert(`Request ${status.toLowerCase()}!`);
      fetchRequests(); // refresh list
    } catch {
      alert("Failed to update request");
    }
  };

  return (
    <div className="requests-container">
      <h3 className="requests-heading">Supervisor Requests</h3>

      {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}

      {requests.length === 0 ? (
        <p style={{ textAlign: "center" }}>No requests found.</p>
      ) : (
        <table className="requests-table">
          <thead>
            <tr>
              <th>Request ID</th>
              <th>Supervisor Name</th>
              <th>Email</th>
              <th>Mobile</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((req) => (
              <tr key={req.id}>
                <td>{req.id}</td>
                <td>{req.supervisor.name}</td>
                <td>{req.supervisor.email}</td>
                <td>{req.supervisor.mobile}</td>
                <td
                  className={
                    req.status === "APPROVED"
                      ? "status-approved"
                      : req.status === "REJECTED"
                      ? "status-rejected"
                      : "status-pending"
                  }
                >
                  {req.status}
                </td>
                <td>
                  {req.status === "PENDING" && (
                    <>
                      <button
                        className="action-btn accept-btn"
                        onClick={() => updateStatus(req.id, "APPROVED")}
                      >
                        Accept
                      </button>
                      <button
                        className="action-btn reject-btn"
                        onClick={() => updateStatus(req.id, "REJECTED")}
                      >
                        Reject
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
