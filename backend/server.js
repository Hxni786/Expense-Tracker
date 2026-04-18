const express = require('express');
const cors    = require('cors');
const helmet  = require('helmet');
const morgan  = require('morgan');
require('dotenv').config();

const transactionRoutes = require('./routes/transactions');

const app  = express();
const PORT = process.env.PORT || 5000;

// ── Middleware ───────────────────────────────────────────────
// app.use(helmet());           // security headers
app.use(cors());             // allow all origins (restrict in production)
app.use(morgan('dev'));       // request logging
app.use(express.json());     // parse JSON bodies
app.use(express.urlencoded({ extended: true }));

// ── Routes ───────────────────────────────────────────────────
app.use('/api/transactions', transactionRoutes);

// ── Health check ─────────────────────────────────────────────
app.get('/health', (req, res) => {
  res.status(200).json({
    status:  'ok',
    app:     'Expense Tracker API — by Hxni',
    version: '1.0.0',
  });
});

// ── 404 Handler ──────────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({ success: false, message: `Route ${req.originalUrl} not found.` });
});

// ── Global Error Handler ─────────────────────────────────────
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ success: false, message: 'Internal server error.' });
});

// ── Start Server ─────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`\n🚀  Expense Tracker API running on http://localhost:${PORT}`);
  console.log(`📋  Health check → http://localhost:${PORT}/health`);
  console.log(`💳  Transactions  → http://localhost:${PORT}/api/transactions\n`);
});
