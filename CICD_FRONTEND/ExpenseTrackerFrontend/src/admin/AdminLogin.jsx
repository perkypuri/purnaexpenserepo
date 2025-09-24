import { Routes, Route, Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contextapi/AuthContext";
import AdminDashboard from "./AdminDashboard";
import ViewAllUsers from "./ViewAllUsers";
import ViewAllSupervisors from "./ViewAllSupervisors";
import ViewAllRequests from "./ViewRequests";
import AdminLogin from "./AdminLogin";
import "./AdminDashboard.css";

export default function AdminNavBar() {
  const { setIsAdminLoggedIn } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    setIsAdminLoggedIn(false);
    localStorage.removeItem("admin");
    navigate("/adminlogin"); // programmatic navigation to avoid 404
  };

  return (
    <div>
      {/* Navbar */}
      <nav className="navbar">
        <div className="logo">Expense Tracker Admin</div>
        <ul className="nav-links">
          <li>
            <Link to="/admindashboard">Dashboard</Link>
          </li>

          <li className="dropdown">
            <span>Manage▾</span>
            <ul className="dropdown-menu">
              <li>
                <Link to="/admin/viewallusers">Users</Link>
              </li>
              <li>
                <Link to="/admin/viewallsupervisors">Supervisors</Link>
              </li>
              <li>
                <Link to="/admin/viewallrequests">Requests</Link>
              </li>
            </ul>
          </li>

          <li>
            <button onClick={handleLogout} className="logout-btn">
              Logout
            </button>
          </li>
        </ul>
      </nav>

      {/* Routes */}
      <Routes>
        <Route path="/admindashboard" element={<AdminDashboard />} />
        <Route path="/admin/viewallusers" element={<ViewAllUsers />} />
        <Route path="/admin/viewallsupervisors" element={<ViewAllSupervisors />} />
        <Route path="/admin/viewallrequests" element={<ViewAllRequests />} />
        <Route path="/adminlogin" element={<AdminLogin />} />
        <Route path="*" element={<AdminLogin />} /> {/* fallback to login */}
      </Routes>
    </div>
  );
}
