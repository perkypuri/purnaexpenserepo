import { useState } from "react";
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

export default function UserNavBar() {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/userlogin");
  };

  const toggleDropdown = (e) => {
    e.stopPropagation();
    setDropdownOpen(!dropdownOpen);
  };

  const closeDropdown = () => setDropdownOpen(false);

  const styles = {
    navbar: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      backgroundColor: "#ff6f61", // coral
      padding: "10px 20px",
      borderRadius: "8px",
      fontFamily: "Arial, sans-serif",
      color: "#fff",
      marginBottom: "30px",
      boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
    },
    logo: { fontWeight: "bold", fontSize: "20px" },
    links: { display: "flex", alignItems: "center", gap: "20px" },
    link: { color: "#fff", textDecoration: "none", fontWeight: "bold", cursor: "pointer" },
    dropdownMenu: {
      position: "absolute",
      top: "40px",
      backgroundColor: "#fff",
      color: "#333",
      borderRadius: "8px",
      boxShadow: "0 4px 8px rgba(0,0,0,0.15)",
      padding: "10px 0",
      display: dropdownOpen ? "block" : "none",
      minWidth: "150px",
      zIndex: 1000,
    },
    dropdownItem: {
      padding: "10px 20px",
      cursor: "pointer",
      textDecoration: "none",
      color: "#333",
      display: "block",
    },
    logoutBtn: {
      backgroundColor: "#fff",
      color: "#ff6f61",
      border: "none",
      padding: "6px 12px",
      borderRadius: "6px",
      cursor: "pointer",
      fontWeight: "bold",
    },
  };

  return (
    <div onClick={closeDropdown}>
      <nav style={styles.navbar} onClick={(e) => e.stopPropagation()}>
        <div style={styles.logo}>Expense Tracker</div>
        <div style={styles.links}>
          <Link to="/user/profile" style={styles.link}>Profile</Link>

          <div style={{ position: "relative" }}>
            <span onClick={toggleDropdown} style={{ ...styles.link, cursor: "pointer" }}>
              Expenses ▾
            </span>
            <div style={styles.dropdownMenu}>
              <Link to="/user/addexpense" style={styles.dropdownItem}>Add Expense</Link>
              <Link to="/user/viewexpenses" style={styles.dropdownItem}>View Expenses</Link>
            </div>
          </div>

          <Link to="/user/requests" style={styles.link}>Requests</Link>
         
          <button onClick={handleLogout} style={styles.logoutBtn}>Logout</button>
        </div>
      </nav>

      {/* Routes */}
      <Routes>
        <Route path="/user/dashboard" element={<UserDashboard />} />
        <Route path="/user/profile" element={<UserProfile />} />
        <Route path="/user/addexpense" element={<AddExpense />} />
        <Route path="/editexpense/:id" element={<EditExpense />} />
        <Route path="/user/viewexpenses" element={<ViewExpenses />} />
        <Route path="/user/requests" element={<UserRequests />} />
        <Route path="/updateprofile" element={<UpdateProfile />} />
        <Route path="/userlogin" element={<UserLogin />} />
        <Route path="/userregister" element={<UserRegistration />} />
      </Routes>
    </div>
  );
}
