import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../contextapi/AuthContext";

export default function SupervisorDashboard() {
  const [sentRequests, setSentRequests] = useState([]);
  const supervisor = JSON.parse(localStorage.getItem("supervisor"));
  const { isSupervisorLoggedIn } = useAuth();

  useEffect(() => {
    if (supervisor) {
      fetchSentRequests();
    }
  }, [supervisor]);

  const fetchSentRequests = async () => {
    try {
      const res = await axios.get(`/supervisorRequests/supervisor/${supervisor.id}`);
      setSentRequests(res.data || []);
    } catch (err) {
      console.error("Failed to fetch supervisor requests", err);
    }
  };

  if (!isSupervisorLoggedIn) {
    return <p>Please log in to see the dashboard.</p>;
  }

  return (
    <div style={{ padding: "20px" }}>
      <h2>Supervisor Dashboard</h2>
      <p>Total Sent Requests: {sentRequests.length}</p>
    </div>
  );
}
