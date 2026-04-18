# 💰 Expense Tracker App — by Hxni
### Full Stack: React Native (Expo) + Node.js/Express + MySQL

---

## 📁 Project Structure

```
Expense Tracker App by Hxni/
│
├── backend/                          ← Node.js + Express REST API
│   ├── server.js                     ← Entry point
│   ├── package.json
│   ├── .env.example                  ← Copy to .env and fill in values
│   │
│   ├── db/
│   │   ├── connection.js             ← MySQL connection pool
│   │   └── schema.sql                ← Table creation + seed data
│   │
│   ├── controllers/
│   │   └── transactionController.js  ← All CRUD logic
│   │
│   └── routes/
│       └── transactions.js           ← Express routes
│
└── frontend/                         ← React Native (Expo SDK 54)
    ├── App.js                        ← Entry point + navigation
    ├── package.json
    │
    ├── screens/
    │   └── DashboardScreen.js
    │
    ├── components/
    │   ├── BalanceCard.js
    │   ├── SummaryCard.js
    │   └── TransactionItem.js
    │
    ├── services/
    │   └── api.js                    ← Axios client → points to backend
    │
    └── utils/
        └── calculations.js           ← reduce helpers + formatters
```

---

## 🗄️ Step 1 — Set Up MySQL

1. Open **MySQL Workbench** or any MySQL client
2. Run the schema file:
   ```sql
   SOURCE path/to/backend/db/schema.sql;
   ```
   This will:
   - Create the `expense_tracker` database
   - Create the `transactions` table
   - Insert 15 sample transactions

---

## ⚙️ Step 2 — Run the Backend

```bash
cd backend

# 1. Install dependencies
npm install

# 2. Create your .env file
cp .env.example .env
# Then open .env and fill in your MySQL password

# 3. Start the server
npm run dev          # development (auto-restart)
# or
npm start            # production
```

Server runs at → `http://localhost:5000`

### API Endpoints

| Method | Endpoint                        | Description              |
|--------|---------------------------------|--------------------------|
| GET    | `/api/transactions`             | Get all transactions     |
| GET    | `/api/transactions/:id`         | Get single transaction   |
| GET    | `/api/transactions/summary`     | Get income/expense totals|
| POST   | `/api/transactions`             | Create new transaction   |
| PUT    | `/api/transactions/:id`         | Update a transaction     |
| DELETE | `/api/transactions/:id`         | Delete a transaction     |
| GET    | `/health`                       | Server health check      |

### POST Body Example
```json
{
  "title": "Monthly Salary",
  "amount": 3500.00,
  "type": "income",
  "category": "salary",
  "date": "2024-06-01",
  "note": "June salary"
}
```

---

## 📱 Step 3 — Run the Frontend

```bash
cd frontend

# 1. Install dependencies
npm install

# 2. Update API base URL in services/api.js
#    → If using a physical device, replace localhost with your machine's LAN IP
#    → e.g. const BASE_URL = 'http://192.168.1.10:5000';

# 3. Start Expo
npx expo start
```

Scan the QR code with the **Expo Go** app on your phone, or press `a` for Android emulator / `i` for iOS simulator.

---

## 🎨 Design System

| Token          | Value      |
|----------------|------------|
| Background     | `#030304`  |
| Card Surface   | `#0F1115`  |
| Text           | `#FFFFFF`  |
| Muted Text     | `#94A3B8`  |
| Income (Green) | `#22C55E`  |
| Expense (Red)  | `#EF4444`  |
| Balance (Gold) | `#FFD600`  |

---

## 🔧 Environment Variables (backend/.env)

```env
PORT=5000
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_password_here
DB_NAME=expense_tracker
```

---

## ✅ Tech Stack

| Layer     | Technology                    |
|-----------|-------------------------------|
| Frontend  | React Native, Expo SDK 54     |
| Navigation| React Navigation v6           |
| HTTP      | Axios                         |
| Backend   | Node.js, Express 4            |
| Database  | MySQL 8 + mysql2 driver       |
| Security  | Helmet, CORS                  |
| Logging   | Morgan                        |
