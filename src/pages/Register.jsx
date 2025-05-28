import { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Register.css'; // Import external stylesheet

function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("Sending form:", form);
      const res = await axios.post('https://health-journal-backend-x3ql.onrender.com/api/auth/register', form);
      console.log("Server response:", res.data);
      alert('Registered! Now login.');
    } catch (err) {
      console.error("Registration error:", err.response?.data || err.message);
      alert('Registration failed. ' + (err.response?.data?.message || 'Try another email.'));
    }
  };
  

  return (
    <div className="register-container">
      <form onSubmit={handleSubmit} className="register-box">
        <h2>Register</h2>
        <input
          className="input"
          placeholder="Name"
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <input
          className="input"
          placeholder="Email"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <input
          className="input"
          type="password"
          placeholder="Password"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />
        <button className="btn" type="submit">Register</button>
        <p>Already have an account? <Link to="/">Login here</Link></p>
      </form>
    </div>
  );
}

export default Register;
