import { useState, useEffect } from 'react';
import axios from 'axios';
import './Dashboard.css';

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
    setForm({ date: '', symptoms: '', medications: '', mood: '' }); // 🆕 Clear form after adding
    fetchEntries();
  };

  // 🆕 Delete entry function
  const deleteEntry = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`https://health-journal-backend-x3ql.onrender.com/api/entries/${id}`, {
        headers: { Authorization: token },
      });
      setEntries(entries.filter((entry) => entry._id !== id)); // update UI instantly
    } catch (error) {
      console.error('Error deleting entry:', error);
      alert('Failed to delete entry');
    }
  };

  useEffect(() => {
    fetchEntries();
  }, []);

  return (
    <div className="dashboard-container">
      <h2>Welcome to Your Health Journal</h2>

      <form onSubmit={addEntry} className="entry-form">
        <input
          placeholder="Date"
          value={form.date}
          onChange={(e) => setForm({ ...form, date: e.target.value })}
        />
        <input
          placeholder="Symptoms"
          value={form.symptoms}
          onChange={(e) => setForm({ ...form, symptoms: e.target.value })}
        />
        <input
          placeholder="Medications"
          value={form.medications}
          onChange={(e) => setForm({ ...form, medications: e.target.value })}
        />
        <input
          placeholder="Mood"
          value={form.mood}
          onChange={(e) => setForm({ ...form, mood: e.target.value })}
        />
        <button type="submit">Add Entry</button>
      </form>

      <ul className="entry-list">
        {entries.map((e) => (
          <li key={e._id} className="entry-item">
            <div>
              <strong>{e.date}</strong> — {e.symptoms}, {e.medications}, Mood: {e.mood}
            </div>
            <button className="delete-btn" onClick={() => deleteEntry(e._id)}>🗑 Delete</button> {/* 🆕 */}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Dashboard;
