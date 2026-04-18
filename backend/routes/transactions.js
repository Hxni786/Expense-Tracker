const express = require('express');
const router  = express.Router();

const {
  getAllTransactions,
  getTransactionById,
  createTransaction,
  updateTransaction,
  deleteTransaction,
  getSummary,
  getCategorySummary,
} = require('../controllers/transactionController');

// ── Routes ───────────────────────────────────────────────────
// GET    /api/transactions/summary   ← must be before /:id
router.get('/summary', getSummary);
router.get('/categories', getCategorySummary);

// GET    /api/transactions
router.get('/', getAllTransactions);

// GET    /api/transactions/:id
router.get('/:id', getTransactionById);

// POST   /api/transactions
router.post('/', createTransaction);

// PUT    /api/transactions/:id
router.put('/:id', updateTransaction);

// DELETE /api/transactions/:id
router.delete('/:id', deleteTransaction);

module.exports = router;
