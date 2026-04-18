# Expense Tracker App — by Hxni

A premium dark-mode fintech expense tracker built with **React Native (Expo SDK 54)**.

---

## 📁 Project Structure

```
ExpenseTrackerApp/
├── App.js                        ← Entry point + navigation
├── package.json
│
├── screens/
│   └── DashboardScreen.js        ← Main dashboard
│
├── components/
│   ├── BalanceCard.js            ← Hero balance card
│   ├── SummaryCard.js            ← Income / Expense / Balance mini-cards
│   └── TransactionItem.js        ← Single transaction row
│
├── services/
│   └── api.js                    ← Axios client + API calls
│
└── utils/
    └── calculations.js           ← reduce helpers + formatters
```

---

## 🚀 Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Update the API base URL in services/api.js
#    Change localhost to your machine's LAN IP when using a physical device
#    e.g.  const BASE_URL = 'http://192.168.1.10:5000';

# 3. Start Expo
npx expo start
```

---

## 🎨 Design System

| Token           | Value       |
|-----------------|-------------|
| Background      | `#030304`   |
| Card Surface    | `#0F1115`   |
| Text            | `#FFFFFF`   |
| Muted Text      | `#94A3B8`   |
| Income          | `#22C55E`   |
| Expense         | `#EF4444`   |
| Balance / Gold  | `#FFD600`   |

---

## 🔌 Backend Contract

**GET** `/api/transactions`

Returns an array of:
```json
[
  {
    "id": 1,
    "amount": "1500.00",
    "category": "salary",
    "type": "income",
    "date": "2024-06-01T00:00:00.000Z"
  }
]
```

---

## ➕ Extending the App

- Add a new screen (e.g. `AddTransactionScreen`) and register it in `App.js`
- Connect the FAB `onPress` to `navigation.navigate('AddTransaction')`
- Add new categories to the `CATEGORY_ICONS` map in `TransactionItem.js`
