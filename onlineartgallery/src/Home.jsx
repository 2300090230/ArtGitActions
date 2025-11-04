import React, { useState, useEffect } from 'react';
import config from './config';

export default function Home() {
  const [arts, setArts] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchArts = async () => {
    try {
      const res = await fetch(`${config.url}/artapi/`);
      const data = await res.text(); 
      setArts(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArts();
  }, []);

  return (
    <div>
      <h1 style={{ textAlign: 'center', marginTop: '20px' }}>
        {loading ? 'Loading...' : arts}
      </h1>
    </div>
  );
}
