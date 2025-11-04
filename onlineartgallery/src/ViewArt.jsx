import React, { useEffect, useState } from 'react';
import config from './config';

export default function ViewArt() {
  const [arts, setArts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editArt, setEditArt] = useState(null); // store current art being edited

  // Fetch all arts
  const fetchArts = async () => {
    try {
      const res = await fetch(`${config.url}/artapi/view`);
      const data = await res.json();
      setArts(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // Delete art
  const handleDelete = async (id) => {
    try {
      const res = await fetch(`${config.url}/artapi/delete/${id}`, { method: 'DELETE' });
      if (res.ok) setArts(arts.filter((art) => art.id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  // Update art
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${config.url}/artapi/update`, {
        method: 'PUT', // or POST depending on your backend
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editArt),
      });

      if (res.ok) {
        alert('Art updated successfully!');
        setEditArt(null);
        fetchArts();
      } else {
        alert('Update failed');
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchArts();
  }, []);

  if (loading) return <p style={{ textAlign: 'center' }}>Loading...</p>;

  const tableStyle = { width: '100%', borderCollapse: 'collapse' };
  const thStyle = { border: '1px solid #ccc', padding: '8px', backgroundColor: '#f0f0f0' };
  const tdStyle = { border: '1px solid #ccc', padding: '8px', textAlign: 'center' };
  const deleteBtn = { padding: '5px 10px', backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' };
  const editBtn = { padding: '5px 10px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', marginRight: '5px' };

  return (
    <div style={{ padding: '20px' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>View Arts</h2>

      {editArt && (
        <form onSubmit={handleUpdate} style={{ marginBottom: '20px', textAlign: 'center' }}>
          <h3>Edit Art</h3>
          <input
            type="text"
            placeholder="Art Name"
            value={editArt.artname}
            onChange={(e) => setEditArt({ ...editArt, artname: e.target.value })}
            required
          />{' '}
          <input
            type="number"
            placeholder="Price"
            value={editArt.price}
            onChange={(e) => setEditArt({ ...editArt, price: e.target.value })}
            required
          />{' '}
          <input
            type="text"
            placeholder="Category"
            value={editArt.category}
            onChange={(e) => setEditArt({ ...editArt, category: e.target.value })}
            required
          />{' '}
          <button type="submit" style={{ ...editBtn, backgroundColor: 'green' }}>
            Update
          </button>{' '}
          <button type="button" style={deleteBtn} onClick={() => setEditArt(null)}>
            Cancel
          </button>
        </form>
      )}

      {arts.length === 0 ? (
        <p style={{ textAlign: 'center' }}>No arts found.</p>
      ) : (
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={thStyle}>ID</th>
              <th style={thStyle}>Art Name</th>
              <th style={thStyle}>Price</th>
              <th style={thStyle}>Category</th>
              <th style={thStyle}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {arts.map((art) => (
              <tr key={art.id}>
                <td style={tdStyle}>{art.id}</td>
                <td style={tdStyle}>{art.artname}</td>
                <td style={tdStyle}>{art.price}</td>
                <td style={tdStyle}>{art.category}</td>
                <td style={tdStyle}>
                  <button style={editBtn} onClick={() => setEditArt(art)}>
                    Edit
                  </button>
                  <button style={deleteBtn} onClick={() => handleDelete(art.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
