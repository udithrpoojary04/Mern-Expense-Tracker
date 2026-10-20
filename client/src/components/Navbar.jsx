import React from 'react';

function Navbar() {
  return (
    <header className="navbar">
      <div className="navbar-container">
        <div className="navbar-brand">
          <span className="navbar-logo">📊</span>
          <div>
            <h1 className="navbar-title">Student Expense Tracker</h1>
            <p className="navbar-subtitle">MERN Stack College Project</p>
          </div>
        </div>
        <div className="navbar-badge">
          <span>Track & Manage Finances</span>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
