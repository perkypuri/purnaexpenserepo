import { useState } from "react";
import axios from "axios";

export default function SendRequest() {
  const [userId, setUserId] = useState("");
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState("");

  const supervisor = JSON.parse(localStorage.getItem("supervisor"));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess("");

    try {
      await axios.post("/supervisorRequests/send", {
        user: { id: parseInt(userId) },
        supervisor: { id: supervisor.id },
        status: "PENDING",
      });
      setSuccess("Request sent successfully!");
      setUserId("");
      setMessage("");
    } catch (err) {
      console.error("Failed to send request", err);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Send Request</h2>
      {success && <p style={{ color: "green" }}>{success}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>User ID:</label>
          <input
            type="number"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Message:</label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </div>
        <button type="submit">Send Request</button>
      </form>
    </div>
  );
}
