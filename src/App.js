import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { NotificationProvider } from './context/NotificationContext';
import Navbar from './components/common/Navbar';
import Home from './pages/Home';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DonorPage from './pages/DonorPage';
import RecipientPage from './pages/RecipientPage';
import AdminPage from './pages/AdminPage';
import NotFound from './pages/NotFound';
import './App.css';

const App = () => (
  <AuthProvider>
    <NotificationProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/donor" element={<DonorPage />} />
          <Route path="/recipient" element={<RecipientPage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </NotificationProvider>
  </AuthProvider>
);

export default App;