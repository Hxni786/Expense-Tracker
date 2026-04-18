# Expense Tracker App — by Hxni

![Hero Banner](./assets/banner.png)

> A premium, high-performance mobile application for personal finance management. 
> Built with a sleek dark-mode aesthetic and a robust full-stack architecture.

---

## 📸 Preview

<p align="center">
  <img src="./assets/mockup.png" width="450" alt="Mobile Mockup" />
</p>

---

## 🚀 Key Features

- **Intuitive Dashboard:** Get a bird's-eye view of your net balance, income, and expenses.
- **Transaction History:** Seamlessly track spending with categorized lists and real-time updates.
- **Smart Summary:** Automatic calculation of financial health across 15+ pre-defined categories.
- **Cloud Connectivity:** Full-stack integration with a Node.js/Express backend and persistent storage.
- **Aesthetic UI:** Designed with a premium "Glassmorphism" theme featuring gold accents (#FFD600).

---

## 🛠️ Tech Stack

| Layer      | Technology                                |
|------------|-------------------------------------------|
| **Mobile** | React Native · Expo SDK 54                |
| **UI**     | Vanilla StyleSheet · Custom Components    |
| **Network**| Axios · LocalTunnel                       |
| **Backend**| Node.js · Express.js                      |
| **Database**| MySQL 8 / Mock fallback                  |
| **Security**| Helmet · CORS · Error Boundaries         |

---

## 📂 Project Navigation

```text
FullStackApp/
├── assets/                 # Premium branding images
├── backend/                # Server API (Node/Express)
│   ├── db/                 # SQL schemas & MySQL connection
│   ├── routes/             # API Endpoint definitions
│   └── controllers/        # Business logic handler
└── frontend/               # Mobile Client (Expo)
    ├── components/         # Reusable UI elements
    ├── screens/            # Full-page screen layouts
    ├── services/           # API communication layer
    └── utils/              # Calculation & formatting helpers
```

---

## ⚙️ Quick Start

### 1 — Backend Setup
1. Enter the backend directory: `cd backend`
2. Install dependencies: `npm install`
3. Configure Environment: `cp .env.example .env` (fill in your DB credentials)
4. Start Server: `npm start` (Runs on port 5000)

### 2 — Frontend Setup
1. Enter the frontend directory: `cd frontend`
2. Install dependencies: `npm install`
3. Update API Endpoint: In `services/api.js`, update the `BASE_URL` to your tunnel or local IP.
4. Launch Mobile App: `npx expo start`

---

## 📐 Design Tokens

| Property    | Value      | Usage                  |
|-------------|------------|------------------------|
| **Primary** | `#FFD600`   | Accents, FAB, Balance  |
| **Dark**    | `#030304`   | Main background        |
| **Surface** | `#0F1115`   | Cards & Containers     |
| **Success** | `#22C55E`   | Income markers         |
| **Error**   | `#EF4444`   | Expense markers        |

---

<p align="center">
  Made with 🖤 by <strong>Hxni</strong>
</p>
