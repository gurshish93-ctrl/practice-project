import { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LoginTwoColumnPrime from "./LoginTwoColumn";
import MainPage from './MainPage';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  return (
    <Routes>
      <Route path="/login" element={<LoginTwoColumnPrime onLogin={handleLogin} />} />
      <Route 
        path="/" 
        element={isLoggedIn ? <MainPage /> : <Navigate to="/login" />}
      />
      <Route path="*" element={<Navigate to={isLoggedIn ? "/" : "/login"} />} />
    </Routes>
  );
}

export default App;
