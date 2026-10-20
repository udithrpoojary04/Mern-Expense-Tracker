const Transaction = require('../models/Transaction');

// @desc    Get all transactions and financial summary
// @route   GET /api/transactions
exports.getTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find().sort({ date: -1, createdAt: -1 });

    // Calculate total income, total expenses, and balance
    let totalIncome = 0;
    let totalExpenses = 0;

    transactions.forEach((item) => {
      if (item.type === 'income') {
        totalIncome += item.amount;
      } else if (item.type === 'expense') {
        totalExpenses += item.amount;
      }
    });

    const balance = totalIncome - totalExpenses;

    res.status(200).json({
      success: true,
      count: transactions.length,
      summary: {
        totalIncome: Number(totalIncome.toFixed(2)),
        totalExpenses: Number(totalExpenses.toFixed(2)),
        balance: Number(balance.toFixed(2)),
      },
      data: transactions,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error: Unable to fetch transactions',
      error: error.message,
    });
  }
};

// @desc    Add a new transaction
// @route   POST /api/transactions
exports.addTransaction = async (req, res) => {
  try {
    const { title, amount, type, category, date, description } = req.body;

    // Basic validation
    if (!title || !amount || !type || !category || !date) {
      return res.status(400).json({
        success: false,
        message: 'Please fill in all required fields: title, amount, type, category, and date',
      });
    }

    if (isNaN(amount) || Number(amount) <= 0) {
      return res.status(400).json({
        success: false,
        message: 'Amount must be a valid positive number',
      });
    }

    if (!['income', 'expense'].includes(type)) {
      return res.status(400).json({
        success: false,
        message: 'Type must be either "income" or "expense"',
      });
    }

    const transaction = await Transaction.create({
      title: title.trim(),
      amount: Number(amount),
      type,
      category: category.trim(),
      date,
      description: description ? description.trim() : '',
    });

    res.status(201).json({
      success: true,
      message: 'Transaction added successfully',
      data: transaction,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message || 'Failed to add transaction',
    });
  }
};

// @desc    Update an existing transaction
// @route   PUT /api/transactions/:id
exports.updateTransaction = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, amount, type, category, date, description } = req.body;

    const existingTransaction = await Transaction.findById(id);

    if (!existingTransaction) {
      return res.status(404).json({
        success: false,
        message: 'Transaction not found',
      });
    }

    if (amount !== undefined && (isNaN(amount) || Number(amount) <= 0)) {
      return res.status(400).json({
        success: false,
        message: 'Amount must be a valid positive number',
      });
    }

    if (type !== undefined && !['income', 'expense'].includes(type)) {
      return res.status(400).json({
        success: false,
        message: 'Type must be either "income" or "expense"',
      });
    }

    const updatedTransaction = await Transaction.findByIdAndUpdate(
      id,
      {
        title: title ? title.trim() : existingTransaction.title,
        amount: amount !== undefined ? Number(amount) : existingTransaction.amount,
        type: type || existingTransaction.type,
        category: category ? category.trim() : existingTransaction.category,
        date: date || existingTransaction.date,
        description: description !== undefined ? description.trim() : existingTransaction.description,
      },
      { new: true, runValidators: true }
    );

    res.status(200).json({
      success: true,
      message: 'Transaction updated successfully',
      data: updatedTransaction,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message || 'Failed to update transaction',
    });
  }
};

// @desc    Delete a transaction
// @route   DELETE /api/transactions/:id
exports.deleteTransaction = async (req, res) => {
  try {
    const { id } = req.params;
    const transaction = await Transaction.findById(id);

    if (!transaction) {
      return res.status(404).json({
        success: false,
        message: 'Transaction not found',
      });
    }

    await Transaction.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: 'Transaction deleted successfully',
      id: id,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to delete transaction',
      error: error.message,
    });
  }
};
