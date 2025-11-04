import React, { useState } from 'react';
import config from './config';

export default function AddArt() {
    const [artname, setArtname] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('');
    const [message, setMessage] = useState('');

    const formStyle = {
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        maxWidth: '400px',
        margin: 'auto',
        padding: '20px',
        border: '1px solid #ccc',
        borderRadius: '8px',
        backgroundColor: '#f9f9f9'
    };

    const inputStyle = {
        padding: '8px',
        borderRadius: '4px',
        border: '1px solid #ccc'
    };

    const buttonStyle = {
        padding: '10px',
        borderRadius: '4px',
        border: 'none',
        backgroundColor: '#007bff',
        color: 'white',
        fontWeight: 'bold',
        cursor: 'pointer'
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const art = { artname, price: parseInt(price), category };

        try {
            const res = await fetch(`${config.url}/artapi/add`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(art)
            });

            if (res.ok) {
                setMessage("Art added successfully!");
                setArtname('');
                setPrice('');
                setCategory('');
            } else {
                setMessage("Failed to add art");
            }
        } catch (error) {
            console.error(error);
            setMessage("Error: " + error.message);
        }
    };

    return (
        <div>
            <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Add Art</h2>
            <form style={formStyle} onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Art Name"
                    value={artname}
                    onChange={e => setArtname(e.target.value)}
                    style={inputStyle}
                    required
                />
                <input
                    type="number"
                    placeholder="Price"
                    value={price}
                    onChange={e => setPrice(e.target.value)}
                    style={inputStyle}
                    required
                />
                <input
                    type="text"
                    placeholder="Category"
                    value={category}
                    onChange={e => setCategory(e.target.value)}
                    style={inputStyle}
                    required
                />
                <button type="submit" style={buttonStyle}>Add Art</button>
            </form>
            {message && <p style={{ textAlign: 'center', marginTop: '15px', color: 'green' }}>{message}</p>}
        </div>
    );
}
