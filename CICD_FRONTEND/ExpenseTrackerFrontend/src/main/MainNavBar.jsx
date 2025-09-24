import { Routes, Route, Link } from "react-router-dom";
import HomePage from "./HomePage";
import UserLogin from "./../user/UserLogin";
import UserRegister from "./../user/UserRegistration";
import SupervisorRegister from "./../supervisor/SupervisorRegistration";
import AdminLogin from "./../admin/AdminLogin";
import SupervisorLogin from "./../supervisor/SupervisorLogin";
import NotFound from "./NotFound";
import "./HomePage.css";

export default function MainNavBar() {
  return (
    <div>
      {/* Navbar */}
      <nav className="navbar">
        <div className="logo">
          <Link to="/">Expense Tracker</Link>
        </div>
        <ul className="nav-links">
          <li><Link to="/">Home</Link></li>

          {/* Register dropdown */}
          <li className="dropdown">
            <span className="dropbtn">
              Register <span className="arrow">▾</span>
            </span>
            <ul className="dropdown-menu">
              <li><Link to="/userregister">User</Link></li>
              <li><Link to="/supervisorregister">Supervisor</Link></li>
            </ul>
          </li>

          {/* Login dropdown */}
          <li className="dropdown">
            <span className="dropbtn">
              Login <span className="arrow">▾</span>
            </span>
            <ul className="dropdown-menu">
              <li><Link to="/userlogin">User</Link></li>
              <li><Link to="/supervisorlogin">Supervisor</Link></li>
              <li><Link to="/adminlogin">Admin</Link></li>
            </ul>
          </li>
        </ul>
      </nav>

      {/* Routes */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/userregister" element={<UserRegister />} />
        <Route path="/supervisorregister" element={<SupervisorRegister />} />
        <Route path="/userlogin" element={<UserLogin />} />
        <Route path="/supervisorlogin" element={<SupervisorLogin />} />
        <Route path="/adminlogin" element={<AdminLogin />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}
