import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import axios from 'axios';
import { setUser } from '../redux/userSlice';
import * as authApi from '../api/auth';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000';

function Home() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const [backendStatus, setBackendStatus] = useState('checking');

  useEffect(() => {
    axios
      .get(`${API_BASE}/health`, { withCredentials: true })
      .then((res) => {
        if (res.data?.status === 'ok') setBackendStatus('ok');
        else setBackendStatus('failed');
      })
      .catch(() => setBackendStatus('failed'));
  }, []);

  async function handleLogout() {
    try {
      await authApi.logout();
      dispatch(setUser(null));
      toast.success('Logged out');
    } catch {
      dispatch(setUser(null));
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-blue-600">Home</h1>
        <p className="mt-2 text-gray-600">
          {user ? `Welcome, ${user.name}.` : 'Welcome.'}
        </p>
        <p className="mt-3 text-sm text-gray-500">
          Backend: {backendStatus === 'checking' && 'checking...'}
          {backendStatus === 'ok' && <span className="text-green-600">ok</span>}
          {backendStatus === 'failed' && <span className="text-red-600">failed</span>}
        </p>
        <div className="mt-6 flex gap-3 justify-center">
          {user ? (
            <button
              type="button"
              onClick={handleLogout}
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
            >
              Log out
            </button>
          ) : (
            <>
              <Link
                to="/login"
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Log in
              </Link>
              <Link
                to="/signup"
                className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100"
              >
                Sign up
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
