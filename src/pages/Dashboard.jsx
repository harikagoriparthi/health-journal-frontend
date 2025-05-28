import { useState, useEffect } from 'react';
import axios from 'axios';
import './Dashboard.css'; // Import custom CSS

function Dashboard() {
  const [entries, setEntries] = useState([]);
  const [form, setForm] = useState({ date: '', symptoms: '', medications: '', mood: '' });

  const fetchEntries = async () => {
    const token = localStorage.getItem('token');
    const res = await axios.get('https://health-journal-backend-x3ql.onrender.com/api/entries', {
      headers: { Authorization: token },
    });
    setEntries(res.data);
  };

  const addEntry = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    await axios.post('https://health-journal-backend-x3ql.onrender.com/api/entries', form, {
      headers: { Authorization: token },
    });
    fetchEntries();
  };

  useEffect(() => {
    fetchEntries();
  }, []);

  return (
    <div className="dashboard-container">
      <h2>Welcome to Your Health Journal</h2>
      <form onSubmit={addEntry} className="entry-form">
        <input placeholder="Date" onChange={(e) => setForm({ ...form, date: e.target.value })} />
        <input placeholder="Symptoms" onChange={(e) => setForm({ ...form, symptoms: e.target.value })} />
        <input placeholder="Medications" onChange={(e) => setForm({ ...form, medications: e.target.value })} />
        <input placeholder="Mood" onChange={(e) => setForm({ ...form, mood: e.target.value })} />
        <button type="submit">Add Entry</button>
      </form>

      <ul className="entry-list">
        {entries.map((e) => (
          <li key={e._id}>
            <strong>{e.date}</strong> - {e.symptoms}, {e.medications}, Mood: {e.mood}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Dashboard;
