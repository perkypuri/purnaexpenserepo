import { useEffect, useState } from "react";
import axios from "axios";
import config from "../config";

export default function ViewAllUsers() {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    const res = await axios.get(`${config.backendUrl}/admin/users`);
    setUsers(res.data);
  };

  const handleDelete = async (id) => {
    await axios.delete(`${config.backendUrl}/admin/users/${id}`);
    fetchUsers();
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div>
      <h2>All Users</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th><th>Name</th><th>Email</th><th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(u => (
            <tr key={u.id}>
              <td>{u.id}</td>
              <td>{u.name}</td>
              <td>{u.email}</td>
              <td>
                <button onClick={() => handleDelete(u.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
