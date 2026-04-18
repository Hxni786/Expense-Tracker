const db = require('../db/connection');

// ─────────────────────────────────────────────────────────────
// GET /api/transactions
// Returns all transactions ordered by date descending
// ─────────────────────────────────────────────────────────────
const getAllTransactions = async (req, res) => {
  try {
    const [rows] = await db.query(
      `SELECT
          id,
          title,
          amount,
          type,
          category,
          DATE_FORMAT(date, '%Y-%m-%d') AS date,
          note,
          created_at
       FROM transactions
       ORDER BY date DESC, created_at DESC`
    );

    res.status(200).json({
      success: true,
      count: rows.length,
      data: rows,
    });
  } catch (err) {
    console.error('getAllTransactions error:', err);
    res.status(500).json({ success: false, message: 'Server error fetching transactions.' });
  }
};

// ─────────────────────────────────────────────────────────────
// GET /api/transactions/:id
// ─────────────────────────────────────────────────────────────
const getTransactionById = async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await db.query(
      `SELECT id, title, amount, type, category,
              DATE_FORMAT(date, '%Y-%m-%d') AS date, note, created_at
       FROM transactions WHERE id = ?`,
      [id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ success: false, message: 'Transaction not found.' });
    }

    res.status(200).json({ success: true, data: rows[0] });
  } catch (err) {
    console.error('getTransactionById error:', err);
    res.status(500).json({ success: false, message: 'Server error.' });
  }
};

// ─────────────────────────────────────────────────────────────
// POST /api/transactions
// Body: { title, amount, type, category, date, note? }
// ─────────────────────────────────────────────────────────────
const createTransaction = async (req, res) => {
  try {
    const { title, amount, type, category, date, note } = req.body;

    // ── Validation ──────────────────────────────────────────
    if (!title || !amount || !type || !category || !date) {
      return res.status(400).json({
        success: false,
        message: 'title, amount, type, category, and date are all required.',
      });
    }

    if (!['income', 'expense'].includes(type)) {
      return res.status(400).json({
        success: false,
        message: "type must be 'income' or 'expense'.",
      });
    }

    if (isNaN(parseFloat(amount)) || parseFloat(amount) <= 0) {
      return res.status(400).json({
        success: false,
        message: 'amount must be a positive number.',
      });
    }

    // ── Insert ──────────────────────────────────────────────
    const [result] = await db.query(
      `INSERT INTO transactions (title, amount, type, category, date, note)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [title.trim(), parseFloat(amount), type, category.toLowerCase().trim(), date, note || null]
    );

    const [newRow] = await db.query(
      `SELECT id, title, amount, type, category,
              DATE_FORMAT(date, '%Y-%m-%d') AS date, note, created_at
       FROM transactions WHERE id = ?`,
      [result.insertId]
    );

    res.status(201).json({ success: true, data: newRow[0] });
  } catch (err) {
    console.error('createTransaction error:', err);
    res.status(500).json({ success: false, message: 'Server error creating transaction.' });
  }
};

// ─────────────────────────────────────────────────────────────
// PUT /api/transactions/:id
// ─────────────────────────────────────────────────────────────
const updateTransaction = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, amount, type, category, date, note } = req.body;

    // Check exists
    const [existing] = await db.query('SELECT id FROM transactions WHERE id = ?', [id]);
    if (existing.length === 0) {
      return res.status(404).json({ success: false, message: 'Transaction not found.' });
    }

    if (type && !['income', 'expense'].includes(type)) {
      return res.status(400).json({ success: false, message: "type must be 'income' or 'expense'." });
    }

    await db.query(
      `UPDATE transactions
       SET title    = COALESCE(?, title),
           amount   = COALESCE(?, amount),
           type     = COALESCE(?, type),
           category = COALESCE(?, category),
           date     = COALESCE(?, date),
           note     = COALESCE(?, note)
       WHERE id = ?`,
      [
        title    ? title.trim()    : null,
        amount   ? parseFloat(amount) : null,
        type     || null,
        category ? category.toLowerCase().trim() : null,
        date     || null,
        note     !== undefined ? note : null,
        id,
      ]
    );

    const [updated] = await db.query(
      `SELECT id, title, amount, type, category,
              DATE_FORMAT(date, '%Y-%m-%d') AS date, note, created_at
       FROM transactions WHERE id = ?`,
      [id]
    );

    res.status(200).json({ success: true, data: updated[0] });
  } catch (err) {
    console.error('updateTransaction error:', err);
    res.status(500).json({ success: false, message: 'Server error updating transaction.' });
  }
};

// ─────────────────────────────────────────────────────────────
// DELETE /api/transactions/:id
// ─────────────────────────────────────────────────────────────
const deleteTransaction = async (req, res) => {
  try {
    const { id } = req.params;

    const [existing] = await db.query('SELECT id FROM transactions WHERE id = ?', [id]);
    if (existing.length === 0) {
      return res.status(404).json({ success: false, message: 'Transaction not found.' });
    }

    await db.query('DELETE FROM transactions WHERE id = ?', [id]);

    res.status(200).json({ success: true, message: `Transaction ${id} deleted.` });
  } catch (err) {
    console.error('deleteTransaction error:', err);
    res.status(500).json({ success: false, message: 'Server error deleting transaction.' });
  }
};

// ─────────────────────────────────────────────────────────────
// GET /api/transactions/summary
// Returns pre-computed income / expense / balance totals
// ─────────────────────────────────────────────────────────────
const getSummary = async (req, res) => {
  try {
    const [rows] = await db.query(
      `SELECT
         type,
         SUM(amount) AS total
       FROM transactions
       GROUP BY type`
    );

    const totals = rows.reduce(
      (acc, row) => {
        acc[row.type] = parseFloat(row.total);
        return acc;
      },
      { income: 0, expense: 0 }
    );

    res.status(200).json({
      success: true,
      data: {
        totalIncome:  totals.income,
        totalExpense: totals.expense,
        balance:      totals.income - totals.expense,
      },
    });
  } catch (err) {
    console.error('getSummary error:', err);
    res.status(500).json({ success: false, message: 'Server error fetching summary.' });
  }
};

// ─────────────────────────────────────────────────────────────
// GET /api/transactions/categories
// Returns total amount per category
// ─────────────────────────────────────────────────────────────
const getCategorySummary = async (req, res) => {
  try {
    const [rows] = await db.query(
      `SELECT
         category,
         SUM(amount) AS total
       FROM transactions
       GROUP BY category`
    );

    res.status(200).json({
      success: true,
      data: rows.map(r => ({ category: r.category, total: parseFloat(r.total) })),
    });
  } catch (err) {
    console.error('getCategorySummary error:', err);
    res.status(500).json({ success: false, message: 'Server error fetching category summary.' });
  }
};

module.exports = {
  getAllTransactions,
  getTransactionById,
  createTransaction,
  updateTransaction,
  deleteTransaction,
  getSummary,
  getCategorySummary,
};
