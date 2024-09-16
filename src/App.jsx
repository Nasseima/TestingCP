// App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './components/Homepage';
import HotelsPage from './components/HotelsPage';
import ActivitiesPage from './components/ActivitiesPage';
import LawsPage from './components/LawsPage';
import DestinationsPage from './components/DestinationsPage';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import Navbar from './components/Navbar';
import CalenderPage from './components/CalenderPage';

const App = () => {
  return (
    <>
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/hotels" element={<HotelsPage />} />
        <Route path="/activities" element={<ActivitiesPage />} />
        <Route path="/laws" element={<LawsPage />} />
        <Route path="/destinations" element={<DestinationsPage />} />
        <Route path="/calender" element={<CalenderPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </Router>
    <footer className="bg-gray-800 text-white text-center py-4 mt-8 w-full">
  <p>&copy; 2024 Your Company Name. All rights reserved.</p>
</footer>
    </>
    
  );
  
};

export default App;

