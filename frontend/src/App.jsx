import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { setUser, setLoading } from './redux/userSlice';
import * as authApi from './api/auth';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import Login from './pages/Login';
import SignUp from './pages/SignUp';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setLoading(true));
    authApi
      .getMe()
      .then(({ user }) => dispatch(setUser(user))
      .catch(() => dispatch(setUser(null)))
      .finally(() => dispatch(setLoading(false)));
  }, [dispatch]);

  return (
    <>
      <Routes>
        <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
      <ToastContainer position="top-center" theme="light" />
    </>
  );
}

export default App;
