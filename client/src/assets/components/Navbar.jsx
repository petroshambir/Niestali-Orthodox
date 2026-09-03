import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-white border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        <Link to="/" className="text-2xl font-bold text-blue-700">
          Student<span className="text-slate-800">System</span>
        </Link>

        <div className="hidden md:flex items-center gap-7">
          <Link to="/" className="text-slate-700 hover:text-blue-600 transition">
            Home
          </Link>

          <Link to="/courses" className="text-slate-700 hover:text-blue-600 transition">
            Courses
          </Link>

          <Link to="/about" className="text-slate-700 hover:text-blue-600 transition">
            About
          </Link>

          <Link to="/register" className="text-slate-700 hover:text-blue-600 transition">
            Register
          </Link>

          <Link to="/student-login" className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition">
            Student Login
          </Link>
        </div>

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-2xl text-slate-700"
        >
          ☰
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-6 py-4 space-y-3">

          <Link
            to="/"
            onClick={() => setMenuOpen(false)}
            className="block text-slate-700"
          >
            Home
          </Link>

          <Link
            to="/courses"
            onClick={() => setMenuOpen(false)}
            className="block text-slate-700"
          >
            Courses
          </Link>

          <Link
            to="/about"
            onClick={() => setMenuOpen(false)}
            className="block text-slate-700"
          >
            About
          </Link>

          <Link
            to="/register"
            onClick={() => setMenuOpen(false)}
            className="block text-slate-700"
          >
            Register
          </Link>

          <Link
            to="/student-login"
            onClick={() => setMenuOpen(false)}
            className="block bg-blue-600 text-white px-4 py-2 rounded-lg text-center"
          >
            Student Login
          </Link>

        </div>
      )}
    </nav>
  );
}

export default Navbar;