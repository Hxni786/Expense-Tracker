-- ─────────────────────────────────────────────────────────────
-- Expense Tracker App by Hxni — Database Schema
-- ─────────────────────────────────────────────────────────────

CREATE DATABASE IF NOT EXISTS expense_tracker;
USE expense_tracker;

-- ── Transactions Table ──────────────────────────────────────
CREATE TABLE IF NOT EXISTS transactions (
  id          INT AUTO_INCREMENT PRIMARY KEY,
  title       VARCHAR(100)                        NOT NULL,
  amount      DECIMAL(10, 2)                      NOT NULL,
  type        ENUM('income', 'expense')           NOT NULL,
  category    VARCHAR(50)                         NOT NULL DEFAULT 'other',
  date        DATE                                NOT NULL,
  note        TEXT                                DEFAULT NULL,
  created_at  TIMESTAMP                           DEFAULT CURRENT_TIMESTAMP,
  updated_at  TIMESTAMP                           DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- ── Seed Data (Sample Transactions) ────────────────────────
INSERT INTO transactions (title, amount, type, category, date, note) VALUES
  ('Monthly Salary',        3500.00, 'income',  'salary',        '2024-06-01', 'June salary deposit'),
  ('Freelance Project',      800.00, 'income',  'freelance',     '2024-06-05', 'Web design project'),
  ('Grocery Shopping',       120.50, 'expense', 'groceries',     '2024-06-03', 'Weekly groceries'),
  ('Netflix Subscription',    15.99, 'expense', 'entertainment', '2024-06-04', 'Monthly subscription'),
  ('Electricity Bill',        85.00, 'expense', 'utilities',     '2024-06-06', 'June utility bill'),
  ('Restaurant Dinner',       62.00, 'expense', 'food',          '2024-06-07', 'Dinner with family'),
  ('Gym Membership',          40.00, 'expense', 'health',        '2024-06-08', 'Monthly gym fee'),
  ('Investment Return',      250.00, 'income',  'investment',    '2024-06-10', 'Stock dividend'),
  ('Uber Ride',               18.50, 'expense', 'transport',     '2024-06-11', 'Airport trip'),
  ('Online Course',           29.99, 'expense', 'education',     '2024-06-12', 'React Native course'),
  ('Bonus Payment',          500.00, 'income',  'salary',        '2024-06-15', 'Performance bonus'),
  ('Shopping Mall',          134.75, 'expense', 'shopping',      '2024-06-16', 'Clothes & accessories'),
  ('Birthday Gift',           50.00, 'expense', 'gift',          '2024-06-18', "Friend's birthday"),
  ('Rental Income',          700.00, 'income',  'other',         '2024-06-20', 'Apartment rental'),
  ('Flight Ticket',          210.00, 'expense', 'travel',        '2024-06-22', 'Business trip');
