const mysql = require('mysql2/promise');
require('dotenv').config();

// ── Mock Data for in-memory fallback ─────────────────────────
const mockTransactions = [
  { id: 1, title: 'Mock Salary', amount: 5000, type: 'income', category: 'salary', date: '2024-06-01', note: 'Monthly pay', created_at: new Date() },
  { id: 2, title: 'Mock Rent', amount: 1500, type: 'expense', category: 'rent', date: '2024-06-02', note: 'June rent', created_at: new Date() },
  { id: 3, title: 'Mock Groceries', amount: 200, type: 'expense', category: 'food', date: '2024-06-03', note: 'Weekly shop', created_at: new Date() },
];

const mockPool = {
    query: async (sql, params) => {
      console.log('📝  SQL Query [MOCK]:', sql, params);
      if (sql.includes('SELECT') && sql.includes('FROM transactions')) {
        if (sql.includes('GROUP BY type')) {
          const income = mockTransactions.filter(t => t.type === 'income').reduce((s, t) => s + t.amount, 0);
          const expense = mockTransactions.filter(t => t.type === 'expense').reduce((s, t) => s + t.amount, 0);
          return [[{ type: 'income', total: income }, { type: 'expense', total: expense }]];
        }
        if (sql.includes('WHERE id = ?')) return [mockTransactions.filter(t => t.id == params[0])];
        return [mockTransactions];
      }
      if (sql.includes('INSERT INTO')) {
        const newId = mockTransactions.length + 1;
        const newTx = { id: newId, title: params[0], amount: params[1], type: params[2], category: params[3], date: params[4], note: params[5], created_at: new Date() };
        mockTransactions.push(newTx);
        return [{ insertId: newId }];
      }
      if (sql.includes('DELETE')) {
        const idx = mockTransactions.findIndex(t => t.id == params[0]);
        if (idx !== -1) mockTransactions.splice(idx, 1);
        return [{}];
      }
      return [[]];
    },
    execute: async (sql, params) => mockPool.query(sql, params),
    getConnection: async () => ({ release: () => {} })
};

console.log('⚠️  Using IN-MEMORY MOCK DATABASE for Demo');

module.exports = mockPool;
