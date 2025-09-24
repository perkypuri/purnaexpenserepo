import React from "react";
import NotFoundImage from "./notfound.jpg";
import "./HomePage.css";

export default function NotFound() {
  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>404 - Page Not Found</h1>
      <img
        src={NotFoundImage}
        alt="Not Found"
        style={{ width: "300px", marginTop: "20px" }}
      />
    </div>
  );
}
