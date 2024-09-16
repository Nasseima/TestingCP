// LoginPage.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const LoginPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full bg-white shadow-md rounded p-8">
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        <form>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Username</label>
            <input type="text" className="w-full px-4 py-2 border rounded" placeholder="Enter your username" />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Password</label>
            <input type="password" className="w-full px-4 py-2 border rounded" placeholder="Enter your password" />
          </div>
          <button type="submit" className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Login</button>
          <p className="mt-4 text-center">
            Don't have an account? <Link to="/register" className="text-blue-500 hover:underline">Register</Link>
          </p>
        </form>
        <Link to="/" className="text-blue-500 hover:underline block mt-4 text-center">Back to Home</Link>
      </div>
    </div>
  );
};

export default LoginPage