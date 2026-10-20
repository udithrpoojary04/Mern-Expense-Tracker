const express = require('express');
const router = express.Router();
const {
  getTransactions,
  addTransaction,
  updateTransaction,
  deleteTransaction,
} = require('../controllers/transactionController');

// Routes for /api/transactions
router.route('/')
  .get(getTransactions)
  .post(addTransaction);

// Routes for /api/transactions/:id
router.route('/:id')
  .put(updateTransaction)
  .delete(deleteTransaction);

module.exports = router;
