import { useState, useEffect } from 'react';
import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:8000';

function Home() {
  const [loading, setLoading] = useState(true);
  const [statusText, setStatusText] = useState('Checking backend...');

  useEffect(() => {
    setLoading(true);
    setStatusText('Checking backend...');

    axios
      .get(`${API_BASE}/health`, { withCredentials: true })
      .then((res) => {
        if (res.data?.status === 'ok') {
          setStatusText('Backend connected');
        } else {
          setStatusText('Backend not reachable');
        }
      })
      .catch(() => {
        setStatusText('Backend not reachable');
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="text-center">
        <h1 className="text-2xl font-semibold text-gray-900">LMS Home</h1>
        <p className="mt-4 text-sm text-gray-600">
          {loading ? 'Checking backend...' : statusText}
        </p>
      </div>
    </div>
  );
}

export default Home;
