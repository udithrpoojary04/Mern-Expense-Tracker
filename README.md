# Student Expense Tracker (MERN Stack)

A simple, practical, full-stack Expense Tracker web application built using the **MERN** stack (**M**ongoDB, **E**xpress.js, **R**eact.js, and **N**ode.js).

This project is designed with clean, understandable code and practical features—ideal for college submissions, semester projects, and vivas/demonstrations.

---

## 📌 Features

1. **Add Income & Expense**: Easily record both income and expense transactions.
2. **Complete Details**: Input title, amount, category, date, and optional description/notes.
3. **Transaction History Table**: Clean and readable table displaying all past transactions with status badges.
4. **Edit & Delete**: Update existing transactions or remove them with confirmation.
5. **Real-time Financial Summary**:
   - Total Income
   - Total Expenses
   - Net Available Balance (with deficit alert if expenses exceed income)
6. **Search & Filter**:
   - Live search by title
   - Filter by transaction type (Income / Expense / All)
   - Filter by category
   - Quick "Reset Filters" button
7. **Persistent Database Storage**: Data is saved in MongoDB using Mongoose, keeping records intact across restarts.
8. **Responsive Layout**: Designed using standard CSS with a neutral, clean card layout that adapts seamlessly to desktop and mobile screens.

---

## 🛠️ Tech Stack

- **Frontend**:
  - React.js (via Vite)
  - Plain / Vanilla CSS (no complex frameworks)
  - Axios (for REST API communication)
- **Backend**:
  - Node.js & Express.js
  - RESTful API architecture
  - CORS middleware
  - dotenv for environment variables
- **Database**:
  - MongoDB
  - Mongoose (Object Data Modeling)

---

## 📂 Project Structure

```text
MERN Project/
│
├── server/                        # Backend (Node.js & Express)
│   ├── config/
│   │   └── db.js                 # MongoDB connection using Mongoose
│   ├── controllers/
│   │   └── transactionController.js # CRUD logic & summary calculations
│   ├── models/
│   │   └── Transaction.js        # Mongoose Schema & validation
│   ├── routes/
│   │   └── transactionRoutes.js  # Express REST API routes
│   ├── .env                      # Environment config (local)
│   ├── .env.example              # Example environment variables
│   ├── package.json              # Backend dependencies
│   └── server.js                 # Main server entry file
│
├── client/                        # Frontend (React + Vite)
│   ├── index.html                # Main HTML template
│   ├── vite.config.js            # Vite configuration
│   ├── package.json              # Frontend dependencies
│   ├── .env.example              # Frontend environment variables example
│   └── src/
│       ├── main.jsx              # React root entry
│       ├── App.jsx               # Main state & layout component
│       ├── App.css               # Application styling
│       ├── index.css             # Base CSS reset
│       ├── components/
│       │   ├── Navbar.jsx        # Navigation header
│       │   ├── SummaryCards.jsx  # Income, expense & balance cards
│       │   ├── TransactionForm.jsx # Add / Edit form
│       │   ├── FilterBar.jsx     # Search & category/type filters
│       │   └── TransactionTable.jsx # Transaction history list
│       └── services/
│           └── api.js            # Axios API calls
│
└── README.md                     # Documentation & setup guide
```

---

## ⚙️ Prerequisites

Before running the application, make sure you have installed:
1. **Node.js** (v16 or higher) – [Download Node.js](https://nodejs.org/)
2. **MongoDB**:
   - **Option A (Local)**: [Download MongoDB Community Server](https://www.mongodb.com/try/download/community) & MongoDB Compass. Ensure the MongoDB service is running on `mongodb://localhost:27017`.
   - **Option B (Cloud)**: Create a free cluster on [MongoDB Atlas](https://www.mongodb.com/atlas) and get your connection string.

---

## 🚀 Getting Started & Installation

Open two terminal windows: one for the **backend (`server`)** and one for the **frontend (`client`)**.

### Step 1: Backend Setup (`server`)

1. Open your terminal and navigate to the `server` directory:
   ```bash
   cd server
   ```

2. Install backend dependencies:
   ```bash
   npm install
   ```

3. Configure environment variables:
   A `.env` file is already created. If needed, configure `server/.env`:
   ```env
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/expense_tracker
   ```
   *(If using MongoDB Atlas, replace `MONGO_URI` with your cloud connection string, e.g., `mongodb+srv://<username>:<password>@cluster0.mongodb.net/expense_tracker?retryWrites=true&w=majority`)*

4. Start the backend server:
   ```bash
   # Development mode with nodemon:
   npm run dev

   # Or standard start:
   npm start
   ```
   You should see:
   ```
   Server is running on port 5000
   MongoDB Connected: 127.0.0.1
   ```

---

### Step 2: Frontend Setup (`client`)

1. Open a second terminal and navigate to the `client` directory:
   ```bash
   cd client
   ```

2. Install frontend dependencies:
   ```bash
   npm install
   ```

3. Start the Vite development server:
   ```bash
   npm run dev
   ```

4. Open your browser and visit:
   ```
   http://localhost:5173
   ```

---

## 📡 REST API Documentation

Base URL: `http://localhost:5000/api/transactions`

| Method | Endpoint | Description | Request Body Example |
| :--- | :--- | :--- | :--- |
| **GET** | `/` | Fetch all transactions + calculated summary | None |
| **POST** | `/` | Add a new transaction | `{"title": "Books", "amount": 450, "type": "expense", "category": "Books & Stationery", "date": "2026-10-20", "description": "Semester 5 books"}` |
| **PUT** | `/:id` | Update an existing transaction | `{"title": "Updated Title", "amount": 500, ...}` |
| **DELETE** | `/:id` | Delete a transaction by ID | None |

---

## 🎓 College Viva / Project Q&A Guide

When presenting this project to your professor or evaluator, here are key points and common questions:

### 1. What is the role of each technology in this MERN project?
- **MongoDB**: NoSQL database that stores transaction records as JSON-like documents.
- **Express.js**: Lightweight Node.js web application framework that manages API routes and middleware.
- **React.js**: Frontend library using reusable components and state hooks (`useState`, `useEffect`) for an interactive single-page application.
- **Node.js**: The JavaScript runtime environment executing backend server code.

### 2. How does the frontend communicate with the backend?
The React frontend uses **Axios** to send asynchronous HTTP requests (GET, POST, PUT, DELETE) to Express API endpoints. The Express server processes the request, interacts with MongoDB through Mongoose, and responds with JSON data.

### 3. How are Total Income, Expenses, and Balance calculated?
The backend controller calculates these in the `getTransactions` function by iterating through all stored transactions. This ensures single-source-of-truth calculations directly based on verified database records.

### 4. What is CORS and why is it needed?
CORS (Cross-Origin Resource Sharing) allows the React client running on port `5173` to safely make requests to the Express server running on port `5000`. We configured it using `app.use(cors())`.

---

## 📄 License
This project is open-source and free to use for educational and academic purposes.
