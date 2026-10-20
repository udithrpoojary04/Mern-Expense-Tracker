import React from 'react';

function TransactionTable({
  transactions,
  totalCount,
  onEdit,
  onDelete,
  loading,
}) {
  // Format date cleanly
  const formatDate = (dateString) => {
    if (!dateString) return '-';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  // Format currency
  const formatAmount = (val) => {
    return Number(val).toLocaleString('en-IN', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  const handleDeleteClick = (transaction) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${transaction.title}" (₹${transaction.amount})?`
    );
    if (confirmed) {
      onDelete(transaction._id);
    }
  };

  return (
    <div className="card table-card">
      <div className="table-header-bar">
        <h2 className="table-title">📋 Transaction History</h2>
        <span className="table-counter">
          Showing {transactions.length} of {totalCount} records
        </span>
      </div>

      {loading ? (
        <div className="loading-state">
          <p>Loading transactions...</p>
        </div>
      ) : transactions.length === 0 ? (
        <div className="empty-state">
          <p className="empty-title">No transactions found</p>
          <p className="empty-desc">
            {totalCount === 0
              ? 'Add your first income or expense transaction using the form above.'
              : 'No transactions match your current search and filter criteria.'}
          </p>
        </div>
      ) : (
        <div className="table-responsive">
          <table className="transaction-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Title</th>
                <th>Category</th>
                <th>Type</th>
                <th className="text-right">Amount</th>
                <th>Description</th>
                <th className="text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((item) => (
                <tr key={item._id}>
                  <td className="cell-date">{formatDate(item.date)}</td>
                  <td className="cell-title font-medium">{item.title}</td>
                  <td>
                    <span className="badge badge-category">{item.category}</span>
                  </td>
                  <td>
                    <span
                      className={`badge ${
                        item.type === 'income' ? 'badge-income' : 'badge-expense'
                      }`}
                    >
                      {item.type === 'income' ? 'Income' : 'Expense'}
                    </span>
                  </td>
                  <td
                    className={`cell-amount text-right font-bold ${
                      item.type === 'income' ? 'text-income' : 'text-expense'
                    }`}
                  >
                    {item.type === 'income' ? '+' : '-'} ₹{formatAmount(item.amount)}
                  </td>
                  <td className="cell-desc text-muted">
                    {item.description ? item.description : '—'}
                  </td>
                  <td className="cell-actions text-center">
                    <button
                      type="button"
                      className="btn-action btn-edit"
                      onClick={() => onEdit(item)}
                      title="Edit transaction"
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      className="btn-action btn-delete"
                      onClick={() => handleDeleteClick(item)}
                      title="Delete transaction"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default TransactionTable;
