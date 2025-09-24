import { Routes, Route, Link, useNavigate } from "react-router-dom";
import AddExpense from "./AddExpense";
import EditExpense from "./EditExpense";
import UpdateProfile from "./UpdateProfile";
import UserDashboard from "./UserDashboard";
import UserLogin from "./UserLogin";
import UserProfile from "./UserProfile";
import UserRegistration from "./UserRegistration";
import UserRequests from "./UserRequests";
import ViewExpenses from "./ViewExpenses";
import { useAuth } from "../contextapi/AuthContext";
import "./UserDashboard.css";

export default function UserNavBar() {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/"); // redirect to main page
  };

  return (
    <div>
      {/* Navbar */}
      <nav className="user-navbar">
        <div className="logo">Expense Tracker User</div>
        <ul className="navbar-links">
          <li><Link to="/user/dashboard">Dashboard</Link></li>
          <li><Link to="/user/profile">Profile</Link></li>
          <li className="dropdown">
            <span>Expenses ▾</span>
            <ul className="dropdown-menu">
              <li><Link to="/user/addexpense">Add Expense</Link></li>
              <li><Link to="/user/viewexpenses">View Expenses</Link></li>
            </ul>
          </li>
          <li><Link to="/user/requests">Requests</Link></li>
          <li><Link to="/user/updateprofile">Update Profile</Link></li>
          <li><button onClick={handleLogout} className="logout-btn">Logout</button></li>
        </ul>
      </nav>

      {/* Routes */}
      <Routes>
        <Route path="/user/dashboard" element={<UserDashboard />} />
        <Route path="/user/profile" element={<UserProfile />} />
        <Route path="/user/addexpense" element={<AddExpense />} />
        <Route path="/user/editexpense/:id" element={<EditExpense />} />
        <Route path="/user/viewexpenses" element={<ViewExpenses />} />
        <Route path="/user/requests" element={<UserRequests />} />
        <Route path="/user/updateprofile" element={<UpdateProfile />} />
        <Route path="/userlogin" element={<UserLogin />} />
        <Route path="/userregister" element={<UserRegistration />} />
      </Routes>
    </div>
  );
}
