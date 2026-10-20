const mongoose = require('mongoose');

// Define Schema for Transactions
const transactionSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please enter a transaction title'],
      trim: true,
    },
    amount: {
      type: Number,
      required: [true, 'Please enter an amount'],
      min: [0.01, 'Amount must be greater than zero'],
    },
    type: {
      type: String,
      required: [true, 'Please select a transaction type'],
      enum: ['income', 'expense'],
    },
    category: {
      type: String,
      required: [true, 'Please select a category'],
      trim: true,
    },
    date: {
      type: Date,
      required: [true, 'Please enter a date'],
      default: Date.now,
    },
    description: {
      type: String,
      trim: true,
      default: '',
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Transaction', transactionSchema);
