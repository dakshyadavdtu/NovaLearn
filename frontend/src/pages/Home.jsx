import { useState, useEffect } from 'react';
import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000';

function Home() {
  const [backendStatus, setBackendStatus] = useState('checking'); // 'checking' | 'ok' | 'failed'

  useEffect(() => {
    axios
      .get(`${API_BASE}/health`, { withCredentials: true })
      .then((res) => {
        if (res.data?.status === 'ok') setBackendStatus('ok');
        else setBackendStatus('failed');
      })
      .catch(() => setBackendStatus('failed'));
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-blue-600">Home</h1>
        <p className="mt-2 text-gray-600">Welcome.</p>
        <p className="mt-3 text-sm text-gray-500">
          Backend: {backendStatus === 'checking' && 'checking...'}
          {backendStatus === 'ok' && <span className="text-green-600">ok</span>}
          {backendStatus === 'failed' && <span className="text-red-600">failed</span>}
        </p>
      </div>
    </div>
  );
}

export default Home;
