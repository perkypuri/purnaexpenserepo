import React from "react";
import "./UserDashboard.css";

export default function UserDashboard() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="dashboard-container">
      <h2>Welcome, {user ? user.name : "User"}</h2>
      <p>This is your dashboard. Navigate using the menu above.</p>
    </div>
  );
}
