import React, { useState, useEffect } from 'react';

const INCOME_CATEGORIES = [
  'Allowance',
  'Salary',
  'Freelance',
  'Pocket Money',
  'Scholarship',
  'Gift',
  'Other Income',
];

const EXPENSE_CATEGORIES = [
  'Food & Snacks',
  'Hostel / Rent',
  'College Fees',
  'Books & Stationery',
  'Transportation',
  'Mobile & Internet',
  'Entertainment',
  'Shopping',
  'Health',
  'Other Expense',
];

function TransactionForm({ onAdd, onUpdate, editItem, onCancelEdit }) {
  // Get today's date formatted as YYYY-MM-DD
  const getTodayString = () => new Date().toISOString().split('T')[0];

  const [formData, setFormData] = useState({
    title: '',
    amount: '',
    type: 'expense',
    category: EXPENSE_CATEGORIES[0],
    date: getTodayString(),
    description: '',
  });

  const [formError, setFormError] = useState('');

  
  useEffect(() => {
    if (editItem) {
      setFormData({
        title: editItem.title || '',
        amount: editItem.amount || '',
        type: editItem.type || 'expense',
        category: editItem.category || (editItem.type === 'income' ? INCOME_CATEGORIES[0] : EXPENSE_CATEGORIES[0]),
        date: editItem.date ? new Date(editItem.date).toISOString().split('T')[0] : getTodayString(),
        description: editItem.description || '',
      });
      setFormError('');
    } else {
      resetForm();
    }
  }, [editItem]);

  const resetForm = () => {
    setFormData({
      title: '',
      amount: '',
      type: 'expense',
      category: EXPENSE_CATEGORIES[0],
      date: getTodayString(),
      description: '',
    });
    setFormError('');
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    // When type changes, adjust default category accordingly
    if (name === 'type') {
      const defaultCategory = value === 'income' ? INCOME_CATEGORIES[0] : EXPENSE_CATEGORIES[0];
      setFormData((prev) => ({
        ...prev,
        type: value,
        category: defaultCategory,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation
    if (!formData.title.trim()) {
      setFormError('Please enter a transaction title');
      return;
    }
    if (!formData.amount || Number(formData.amount) <= 0) {
      setFormError('Please enter a valid amount greater than 0');
      return;
    }
    if (!formData.date) {
      setFormError('Please pick a date');
      return;
    }

    setFormError('');

    const submissionData = {
      title: formData.title.trim(),
      amount: parseFloat(formData.amount),
      type: formData.type,
      category: formData.category,
      date: formData.date,
      description: formData.description.trim(),
    };

    if (editItem) {
      onUpdate(editItem._id, submissionData);
    } else {
      onAdd(submissionData);
      resetForm();
    }
  };

  const categories = formData.type === 'income' ? INCOME_CATEGORIES : EXPENSE_CATEGORIES;

  return (
    <div className="card form-card">
      <div className="form-header">
        <h2 className="form-title">
          {editItem ? '✏️ Edit Transaction' : '➕ Add New Transaction'}
        </h2>
        {editItem && (
          <button type="button" className="btn btn-secondary btn-sm" onClick={onCancelEdit}>
            Cancel Edit
          </button>
        )}
      </div>

      {formError && <div className="alert alert-danger">{formError}</div>}

      <form onSubmit={handleSubmit} className="transaction-form">
        {/* Type Selector (Income vs Expense) */}
        <div className="form-group">
          <label className="form-label">Transaction Type</label>
          <div className="type-toggle-group">
            <button
              type="button"
              className={`type-btn ${formData.type === 'expense' ? 'type-btn-expense-active' : ''}`}
              onClick={() => handleChange({ target: { name: 'type', value: 'expense' } })}
            >
              Expense
            </button>
            <button
              type="button"
              className={`type-btn ${formData.type === 'income' ? 'type-btn-income-active' : ''}`}
              onClick={() => handleChange({ target: { name: 'type', value: 'income' } })}
            >
              Income
            </button>
          </div>
        </div>

        <div className="form-row">
          {/* Title */}
          <div className="form-group flex-1">
            <label className="form-label" htmlFor="title">
              Title <span className="required">*</span>
            </label>
            <input
              id="title"
              type="text"
              name="title"
              className="form-input"
              placeholder="e.g. Canteen Lunch, Bus Pass, Monthly Allowance"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>

          {/* Amount */}
          <div className="form-group flex-1">
            <label className="form-label" htmlFor="amount">
              Amount (₹) <span className="required">*</span>
            </label>
            <input
              id="amount"
              type="number"
              step="0.01"
              min="0.01"
              name="amount"
              className="form-input"
              placeholder="0.00"
              value={formData.amount}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="form-row">
          {/* Category */}
          <div className="form-group flex-1">
            <label className="form-label" htmlFor="category">
              Category <span className="required">*</span>
            </label>
            <select
              id="category"
              name="category"
              className="form-input"
              value={formData.category}
              onChange={handleChange}
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Date */}
          <div className="form-group flex-1">
            <label className="form-label" htmlFor="date">
              Date <span className="required">*</span>
            </label>
            <input
              id="date"
              type="date"
              name="date"
              className="form-input"
              value={formData.date}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        {/* Description / Notes */}
        <div className="form-group">
          <label className="form-label" htmlFor="description">
            Description / Notes (Optional)
          </label>
          <input
            id="description"
            type="text"
            name="description"
            className="form-input"
            placeholder="Add brief details (e.g., shared with friend, semester note)"
            value={formData.description}
            onChange={handleChange}
          />
        </div>

        {/* Action Buttons */}
        <div className="form-actions">
          <button type="submit" className="btn btn-primary">
            {editItem ? 'Save Changes' : 'Add Transaction'}
          </button>
          {editItem && (
            <button type="button" className="btn btn-secondary" onClick={onCancelEdit}>
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

export default TransactionForm;
