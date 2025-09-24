import React from "react";

export default function UserDashboard() {
  const user = JSON.parse(localStorage.getItem("user"));

  const styles = {
    container: {
      maxWidth: "800px",
      margin: "40px auto",
      padding: "30px",
      borderRadius: "12px",
      backgroundColor: "#fff5f0",
      boxShadow: "0 6px 12px rgba(0,0,0,0.1)",
      textAlign: "center",
      fontFamily: "Arial, sans-serif",
    },
    title: {
      fontSize: "28px",
      fontWeight: "bold",
      color: "#ff6f61", // coral
      marginBottom: "20px",
    },
    text: {
      fontSize: "16px",
      color: "#555",
    },
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Welcome, {user ? user.name : "User"}</h2>
      <p style={styles.text}>This is your dashboard. Navigate using the menu above.</p>
    </div>
  );
}
