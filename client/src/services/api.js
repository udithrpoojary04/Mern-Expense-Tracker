import axios from 'axios';

// Base API URL pointing to the Express server
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/transactions';

// Fetch all transactions and summary
export const fetchTransactions = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

// Add a new transaction
export const createTransaction = async (transactionData) => {
  const response = await axios.post(API_URL, transactionData);
  return response.data;
};

// Update an existing transaction by ID
export const updateTransaction = async (id, updatedData) => {
  const response = await axios.put(`${API_URL}/${id}`, updatedData);
  return response.data;
};

// Delete a transaction by ID
export const deleteTransaction = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};
