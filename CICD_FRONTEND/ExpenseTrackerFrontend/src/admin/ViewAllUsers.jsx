import { useEffect, useState } from "react";
import axios from "axios";

export default function ViewAllUsers() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");
  const baseUrl = `${import.meta.env.VITE_API_URL}/admin`;

  const fetchUsers = async () => {
    try {
      const res = await axios.get(`${baseUrl}/users`);
      setUsers(res.data);
      setError("");
    } catch (err) {
      console.error("Error fetching users:", err);
      setError("Failed to fetch users. Check backend URL and server status.");
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${baseUrl}/users?id=${id}`);
      fetchUsers();
    } catch (err) {
      console.error("Error deleting user:", err);
      alert("Failed to delete user.");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "40px",
        backgroundColor: "#ffe5e3",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h2
        style={{
          textAlign: "center",
          color: "#FFB1AC",
          marginBottom: "30px",
        }}
      >
        All Users
      </h2>

      {error && (
        <p
          style={{
            color: "#fff",
            background: "rgba(255, 0, 0, 0.6)",
            padding: "10px",
            borderRadius: "8px",
            textAlign: "center",
            marginBottom: "20px",
          }}
        >
          {error}
        </p>
      )}

      {users.length > 0 ? (
        <div
          style={{
            overflowX: "auto",
            background: "#fff",
            borderRadius: "15px",
            boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
            padding: "20px",
          }}
        >
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ backgroundColor: "#FFB1AC", color: "#fff" }}>
                <th style={{ padding: "12px", textAlign: "left" }}>ID</th>
                <th style={{ padding: "12px", textAlign: "left" }}>Name</th>
                <th style={{ padding: "12px", textAlign: "left" }}>Email</th>
                <th style={{ padding: "12px", textAlign: "center" }}>
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr
                  key={u.id}
                  style={{
                    borderBottom: "1px solid #ddd",
                    transition: "background 0.3s",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.backgroundColor = "#ffe0df")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.backgroundColor = "transparent")
                  }
                >
                  <td style={{ padding: "12px" }}>{u.id}</td>
                  <td style={{ padding: "12px" }}>{u.name}</td>
                  <td style={{ padding: "12px" }}>{u.email}</td>
                  <td style={{ padding: "12px", textAlign: "center" }}>
                    <button
                      onClick={() => handleDelete(u.id)}
                      style={{
                        padding: "8px 16px",
                        borderRadius: "8px",
                        border: "none",
                        backgroundColor: "#FFB1AC",
                        color: "#fff",
                        cursor: "pointer",
                        fontWeight: "bold",
                        transition: "0.3s",
                      }}
                      onMouseOver={(e) =>
                        (e.currentTarget.style.backgroundColor = "#ff8f85")
                      }
                      onMouseOut={(e) =>
                        (e.currentTarget.style.backgroundColor = "#FFB1AC")
                      }
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        !error && (
          <p
            style={{
              textAlign: "center",
              padding: "20px",
              color: "#888",
              background: "#fff",
              borderRadius: "12px",
              boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
              maxWidth: "400px",
              margin: "0 auto",
            }}
          >
            No users found.
          </p>
        )
      )}
    </div>
  );
}
