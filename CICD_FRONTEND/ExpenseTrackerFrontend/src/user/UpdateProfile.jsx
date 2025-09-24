import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import config from '../config';

export default function UpdateProfile() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    id: '',
    name: '',
    email: '',
    password: '',
    mobile: '',
    status: '',
  });

  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setFormData(JSON.parse(storedUser));
    }
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`${config.url}/users/update`, formData);
      if (response.status === 200) {
        setMessage(response.data);
        setError('');
        localStorage.setItem('user', JSON.stringify(formData));
        navigate('/userprofile'); // Redirect to profile after update
      }
    } catch (err) {
      setMessage('');
      if (err.response) {
        setError(err.response.data);
      } else {
        setError('An unexpected error occurred.');
      }
    }
  };

  return (
    <div>
      <h3 style={{ textAlign: 'center', textDecoration: 'underline' }}>Update Profile</h3>
      {message ? (
        <p style={{ textAlign: 'center', color: 'green', fontWeight: 'bolder' }}>{message}</p>
      ) : (
        <p style={{ textAlign: 'center', color: 'red', fontWeight: 'bolder' }}>{error}</p>
      )}

      <form onSubmit={handleSubmit}>
        <div>
          <label>Full Name</label>
          <input type="text" id="name" value={formData.name} onChange={handleChange} required />
        </div>

        <div>
          <label>Email</label>
          <input type="email" id="email" value={formData.email} onChange={handleChange} required />
        </div>

        <div>
          <label>Password</label>
          <input type="password" id="password" value={formData.password} onChange={handleChange} required />
        </div>

        <div>
          <label>Mobile No</label>
          <input type="number" id="mobile" value={formData.mobile} onChange={handleChange} required />
        </div>

        <button type="submit">Update</button>
      </form>
    </div>
  );
}
