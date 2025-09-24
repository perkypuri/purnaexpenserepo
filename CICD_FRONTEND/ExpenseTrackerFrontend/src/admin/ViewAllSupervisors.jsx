import { useEffect, useState } from "react";
import axios from "axios";
import config from "../config";

export default function ViewAllSupervisors() {
  const [supervisors, setSupervisors] = useState([]);

  const fetchSupervisors = async () => {
    const res = await axios.get(`${config.backendUrl}/admin/supervisors`);
    setSupervisors(res.data);
  };

  const handleDelete = async (id) => {
    await axios.delete(`${config.backendUrl}/admin/supervisors/${id}`);
    fetchSupervisors();
  };

  useEffect(() => {
    fetchSupervisors();
  }, []);

  return (
    <div>
      <h2>All Supervisors</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th><th>Name</th><th>Email</th><th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {supervisors.map(s => (
            <tr key={s.id}>
              <td>{s.id}</td>
              <td>{s.name}</td>
              <td>{s.email}</td>
              <td>
                <button onClick={() => handleDelete(s.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
