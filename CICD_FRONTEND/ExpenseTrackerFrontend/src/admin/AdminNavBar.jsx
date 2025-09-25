import { Routes, Route, Link, useNavigate, Navigate } from "react-router-dom";
import { useAuth } from "../contextapi/AuthContext";
import AdminDashboard from "./AdminDashboard";
import AdminLogin from "./AdminLogin";
import ViewAllUsers from "./ViewAllUsers"; 
import ViewAllSupervisors from "./ViewAllSupervisors"; 
import ViewAllRequests from "./ViewRequests"; 

export default function AdminNavBar() {
  const { isAdminLoggedIn, setIsAdminLoggedIn } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    setIsAdminLoggedIn(false);
    localStorage.removeItem("admin");
    navigate("/adminlogin");
  };

  return (
    <div>
      {isAdminLoggedIn && (
        <nav className="navbar">
          <div className="logo">Expense Tracker Admin</div>
          <ul className="nav-links">
            <li><Link to="/admindashboard">Dashboard</Link></li>
            <li className="dropdown">
              <span>Manage▾</span>
              <ul className="dropdown-menu">
                <li><Link to="/admin/viewallusers">Users</Link></li>
                <li><Link to="/admin/viewallsupervisors">Supervisors</Link></li>
                <li><Link to="/admin/viewallrequests">Requests</Link></li>
              </ul>
            </li>
            <li>
              <button onClick={handleLogout} className="logout-btn">Logout</button>
            </li>
          </ul>
        </nav>
      )}

      <Routes>
        <Route
          path="/admindashboard"
          element={isAdminLoggedIn ? <AdminDashboard /> : <Navigate to="/adminlogin" />}
        />
        <Route
          path="/admin/viewallusers"
          element={isAdminLoggedIn ? <ViewAllUsers /> : <Navigate to="/adminlogin" />}
        />
        <Route
          path="/admin/viewallsupervisors"
          element={isAdminLoggedIn ? <ViewAllSupervisors /> : <Navigate to="/adminlogin" />}
        />
        <Route
          path="/admin/viewallrequests"
          element={isAdminLoggedIn ? <ViewAllRequests /> : <Navigate to="/adminlogin" />}
        />
        <Route path="/adminlogin" element={<AdminLogin />} />
        <Route path="*" element={<Navigate to="/adminlogin" />} />
      </Routes>
    </div>
  );
}
