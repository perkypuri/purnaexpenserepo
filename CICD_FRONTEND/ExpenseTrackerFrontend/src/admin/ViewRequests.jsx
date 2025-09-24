import { useEffect, useState } from "react";
import axios from "axios";
import config from "../config";

export default function ViewRequests() {
  const [requests, setRequests] = useState([]);

  const fetchRequests = async () => {
    try {
      const res = await axios.get(`${config.backendUrl}/admin/requests`);
      setRequests(res.data); // no filtering, show all
    } catch (err) {
      console.error("Failed to fetch requests", err);
    }
  };

  const handleDelete = async (id) => {
    await axios.delete(`${config.backendUrl}/admin/requests/${id}`);
    fetchRequests();
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  return (
    <div>
      <h2>All Supervisor Requests</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Supervisor</th>
            <th>User</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {requests.map((r) => (
            <tr key={r.id}>
              <td>{r.id}</td>
              <td>{r.supervisor.name}</td>
              <td>{r.user.name}</td>
              <td>{r.status}</td>
              <td>
                <button onClick={() => handleDelete(r.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
