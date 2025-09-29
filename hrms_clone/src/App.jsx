import { useState, useEffect } from 'react';
import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
import LoginTwoColumnPrime from "./LoginTwoColumn";
import MainPage from './MainPage';
import Layout from './Layout'; // Import the Layout component

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    setIsLoggedIn(false);
  };

  // Wrapper for protected routes
  const ProtectedLayout = () => {
    if (!isLoggedIn) {
      return <Navigate to="/login" />;
    }
    return (
      <Layout onLogout={handleLogout}>
        <Outlet />
      </Layout>
    );
  };

  return (
    <Routes>
      <Route path="/login" element={isLoggedIn ? <Navigate to="/" /> : <LoginTwoColumnPrime onLogin={handleLogin} />} />
      
      {/* Protected Routes with Layout */}
      <Route element={<ProtectedLayout />}>
        <Route path="/" element={<MainPage />} />
        {/* Add other nested routes here. For example: */}
        {/* <Route path="/dashboard" element={<div>Dashboard</div>} /> */}
      </Route>

      <Route path="*" element={<Navigate to={isLoggedIn ? "/" : "/login"} />} />
    </Routes>
  );
}

export default App;
