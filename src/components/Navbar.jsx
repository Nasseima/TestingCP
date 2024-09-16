// Navbar.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const isAuthenticated = false; // Replace with your authentication logic
  const username = "User"; // Replace with your username logic

  const handleLogout = () => {
    // Handle logout logic
  };

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-lg font-bold">
          <Link to="/">SafeScape</Link>
        </div>
        <div className="flex items-center space-x-4">
          {isAuthenticated ? (
            <UserDropdown username={username} />
          ) : (
            <>
              <Link to="/Calender" className="text-white">Calender</Link>
              <Link to="/login" className="text-white">Login</Link>
              <Link to="/register" className="text-white">Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

const UserDropdown = ({ username }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 bg-gray-800 text-white px-4 py-2 rounded"
      >
        <span>{username}</span>
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
        </svg>
      </button>
      {isOpen && (
        <div className="absolute mt-2 w-48 bg-white rounded shadow-lg">
          <button onClick={handleLogout} className="block px-4 py-2 text-gray-800 hover:bg-gray-200 w-full text-left">
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default Navbar;
