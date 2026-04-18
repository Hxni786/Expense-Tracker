/**
 * Given an array of transaction objects, calculates:
 *  - totalIncome   : sum of all "income" transactions
 *  - totalExpense  : sum of all "expense" transactions
 *  - balance       : totalIncome - totalExpense
 *
 * @param {Array<{type: 'income'|'expense', amount: number}>} transactions
 * @returns {{ totalIncome: number, totalExpense: number, balance: number }}
 */
export const calculateSummary = (transactions = []) => {
  const { totalIncome, totalExpense } = transactions.reduce(
    (acc, tx) => {
      const amount = parseFloat(tx.amount) || 0;
      if (tx.type === 'income') {
        acc.totalIncome += amount;
      } else if (tx.type === 'expense') {
        acc.totalExpense += amount;
      }
      return acc;
    },
    { totalIncome: 0, totalExpense: 0 }
  );

  return {
    totalIncome,
    totalExpense,
    balance: totalIncome - totalExpense,
  };
};

/**
 * Formats a number as a currency string without relying on Intl.
 * e.g.  1234.5  →  "$1,234.50"
 */
export const formatCurrency = (amount) => {
  const num = parseFloat(amount) || 0;
  const formatted = num.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
  return `$${formatted}`;
};

/**
 * Formats an ISO date string into a human-readable short date.
 * Avoids toLocaleDateString which can crash in some RN environments.
 * e.g.  "2024-06-15"  →  "Jun 15, 2024"
 */
export const formatDate = (dateString = '') => {
  if (!dateString) return '—';
  try {
    const parts = dateString.split(/[-T :]/);
    if (parts.length < 3) return dateString;

    const year = parts[0];
    const monthIndex = parseInt(parts[1], 10) - 1;
    const day = parseInt(parts[2], 10);

    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return `${months[monthIndex]} ${day}, ${year}`;
  } catch (err) {
    return dateString;
  }
};
