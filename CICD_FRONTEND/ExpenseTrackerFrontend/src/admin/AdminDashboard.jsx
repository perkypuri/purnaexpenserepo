import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import config from "../config";
import "./AdminDashboard.css";

export default function AdminDashboard() {
  const [userCount, setUserCount] = useState(0);
  const [supervisorCount, setSupervisorCount] = useState(0);
  const [requestCount, setRequestCount] = useState(0);

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const u = await axios.get(`${config.backendUrl}/admin/users/count`);
        const s = await axios.get(`${config.backendUrl}/admin/supervisors/count`);
        const r = await axios.get(`${config.backendUrl}/admin/requests/count`);
        setUserCount(u.data);
        setSupervisorCount(s.data);
        setRequestCount(r.data);
      } catch (err) {
        console.error("Error fetching counts", err);
      }
    };

    fetchCounts();
  }, []);

  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>
      <div className="card-container">
        <Link to="/admin/viewallusers" className="card">
          <h2>Users</h2>
          <p>{userCount}</p>
        </Link>
        <Link to="/admin/viewallsupervisors" className="card">
          <h2>Supervisors</h2>
          <p>{supervisorCount}</p>
        </Link>
        <Link to="/admin/viewallrequests" className="card">
          <h2>All Requests</h2>
          <p>{requestCount}</p>
        </Link>
      </div>
    </div>
  );
}
