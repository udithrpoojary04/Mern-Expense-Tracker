import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import SummaryCards from './components/SummaryCards';
import TransactionForm from './components/TransactionForm';
import FilterBar from './components/FilterBar';
import TransactionTable from './components/TransactionTable';
import {
  fetchTransactions,
  createTransaction,
  updateTransaction,
  deleteTransaction,
} from './services/api';
import './App.css';

function App() {
  const [transactions, setTransactions] = useState([]);
  const [summary, setSummary] = useState({ totalIncome: 0, totalExpenses: 0, balance: 0 });
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [editItem, setEditItem] = useState(null);


  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterCategory, setFilterCategory] = useState('all');

  
  useEffect(() => {
    loadTransactions();
  }, []);

  
  const loadTransactions = async () => {
    try {
      setLoading(true);
      setErrorMessage('');
      const response = await fetchTransactions();
      if (response && response.success) {
        setTransactions(response.data || []);
        setSummary(response.summary || { totalIncome: 0, totalExpenses: 0, balance: 0 });
      }
    } catch (err) {
      console.error('Error fetching transactions:', err);
      setErrorMessage(
        'Could not connect to the backend server. Make sure MongoDB and Node.js backend are running on port 5000.'
      );
    } finally {
      setLoading(false);
    }
  };

  
  const showNotification = (msg) => {
    setSuccessMessage(msg);
    setTimeout(() => {
      setSuccessMessage('');
    }, 3500);
  };

  
  const handleAddTransaction = async (formData) => {
    try {
      setErrorMessage('');
      const result = await createTransaction(formData);
      if (result && result.success) {
        showNotification('Transaction added successfully!');
        loadTransactions();
      }
    } catch (err) {
      console.error('Error adding transaction:', err);
      const msg = err.response?.data?.message || 'Failed to add transaction';
      setErrorMessage(msg);
    }
  };

  
  const handleUpdateTransaction = async (id, updatedData) => {
    try {
      setErrorMessage('');
      const result = await updateTransaction(id, updatedData);
      if (result && result.success) {
        showNotification('Transaction updated successfully!');
        setEditItem(null);
        loadTransactions();
      }
    } catch (err) {
      console.error('Error updating transaction:', err);
      const msg = err.response?.data?.message || 'Failed to update transaction';
      setErrorMessage(msg);
    }
  };

  
  const handleDeleteTransaction = async (id) => {
    try {
      setErrorMessage('');
      const result = await deleteTransaction(id);
      if (result && result.success) {
        showNotification('Transaction deleted successfully!');
        if (editItem && editItem._id === id) {
          setEditItem(null);
        }
        loadTransactions();
      }
    } catch (err) {
      console.error('Error deleting transaction:', err);
      const msg = err.response?.data?.message || 'Failed to delete transaction';
      setErrorMessage(msg);
    }
  };

  
  const handleStartEdit = (item) => {
    setEditItem(item);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCancelEdit = () => {
    setEditItem(null);
  };

  const handleResetFilters = () => {
    setSearchQuery('');
    setFilterType('all');
    setFilterCategory('all');
  };

  
  const defaultCategories = [
    'Allowance',
    'Salary',
    'Freelance',
    'Pocket Money',
    'Scholarship',
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
    'Other Income',
  ];

  const transactionCategories = transactions.map((t) => t.category).filter(Boolean);
  const allCategories = Array.from(new Set([...defaultCategories, ...transactionCategories])).sort();

  // Filter transactions based on search and filters
  const filteredTransactions = transactions.filter((t) => {
    const matchesSearch =
      t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (t.description && t.description.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesType = filterType === 'all' || t.type === filterType;

    const matchesCategory = filterCategory === 'all' || t.category === filterCategory;

    return matchesSearch && matchesType && matchesCategory;
  });

  return (
    <div className="app-container">
      <Navbar />

      <main className="main-content">
        {/* Success / Error alerts */}
        {errorMessage && (
          <div className="alert alert-danger">
            <span>{errorMessage}</span>
            <button
              type="button"
              className="btn-close"
              onClick={() => setErrorMessage('')}
            >
              ✕
            </button>
          </div>
        )}

        {successMessage && (
          <div className="alert alert-success">
            <span>{successMessage}</span>
            <button
              type="button"
              className="btn-close"
              onClick={() => setSuccessMessage('')}
            >
              ✕
            </button>
          </div>
        )}

        {/* Financial Summary Cards */}
        <SummaryCards summary={summary} />

        {/* Add / Edit Form */}
        <TransactionForm
          onAdd={handleAddTransaction}
          onUpdate={handleUpdateTransaction}
          editItem={editItem}
          onCancelEdit={handleCancelEdit}
        />

        {/* Filter and Search Bar */}
        <FilterBar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          filterType={filterType}
          setFilterType={setFilterType}
          filterCategory={filterCategory}
          setFilterCategory={setFilterCategory}
          categoriesList={allCategories}
          onResetFilters={handleResetFilters}
        />

        {/* Transactions Table */}
        <TransactionTable
          transactions={filteredTransactions}
          totalCount={transactions.length}
          onEdit={handleStartEdit}
          onDelete={handleDeleteTransaction}
          loading={loading}
        />
      </main>

      <footer className="footer">
        <p>Student Expense Tracker &bull; Developed using MERN Stack (MongoDB, Express, React, Node.js)</p>
      </footer>
    </div>
  );
}

export default App;
