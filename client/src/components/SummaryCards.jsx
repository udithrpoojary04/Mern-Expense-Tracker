import React from 'react';

function SummaryCards({ summary }) {
  const { totalIncome = 0, totalExpenses = 0, balance = 0 } = summary || {};

  // Helper to format currency
  const formatAmount = (value) => {
    return Number(value || 0).toLocaleString('en-IN', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  return (
    <div className="summary-grid">
      {/* Total Income Card */}
      <div className="summary-card card-income">
        <div className="card-header">
          <span className="card-title">Total Income</span>
          <span className="card-icon">📈</span>
        </div>
        <div className="card-amount text-income">+ ₹{formatAmount(totalIncome)}</div>
        <p className="card-hint">Total money earned / received</p>
      </div>

      {/* Total Expenses Card */}
      <div className="summary-card card-expense">
        <div className="card-header">
          <span className="card-title">Total Expenses</span>
          <span className="card-icon">📉</span>
        </div>
        <div className="card-amount text-expense">- ₹{formatAmount(totalExpenses)}</div>
        <p className="card-hint">Total money spent so far</p>
      </div>

      {/* Available Balance Card */}
      <div className={`summary-card card-balance ${balance < 0 ? 'card-balance-negative' : ''}`}>
        <div className="card-header">
          <span className="card-title">Available Balance</span>
          <span className="card-icon">💰</span>
        </div>
        <div className={`card-amount ${balance < 0 ? 'text-expense' : 'text-balance'}`}>
          {balance < 0 ? `- ₹${formatAmount(Math.abs(balance))}` : `₹${formatAmount(balance)}`}
        </div>
        <p className="card-hint">
          {balance >= 0 ? 'Healthy balance' : 'Warning: Expenses exceed income'}
        </p>
      </div>
    </div>
  );
}

export default SummaryCards;
