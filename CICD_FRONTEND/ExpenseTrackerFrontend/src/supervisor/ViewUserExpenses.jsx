import { useEffect, useState } from "react";
import axios from "axios";
import config from "../config";

export default function ViewUserExpenses() {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    const supervisor = JSON.parse(localStorage.getItem("supervisor"));
    const res = await axios.get(`${config.backendUrl}/supervisorRequests/supervisor/${supervisor.id}`);
    const accepted = res.data.filter(r => r.status === "ACCEPTED");
    setUsers(accepted.map(r => r.user));
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div>
      <h2>Users You Can Access</h2>
      <ul>
        {users.map(u => (
          <li key={u.id}>{u.name}</li>
        ))}
      </ul>
    </div>
  );
}
