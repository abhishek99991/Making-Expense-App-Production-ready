# Expense Tracker Premium — Leaderboard API

Express + Sequelize + SQLite API that returns the top 10 users ranked by total expenses.

## Requirements
- Node.js (LTS recommended)
- npm

## Setup
1. Open a terminal in this folder.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
   Or run `npm start`.

The SQLite database file is created automatically at `database.sqlite`.

## Endpoint
`GET http://localhost:3000/api/leaderboard`

Example response:
```json
{
  "success": true,
  "count": 0,
  "leaderboard": []
}
```

## Important
The leaderboard is empty until users and expenses have been inserted into the database. This project includes the leaderboard endpoint and models, not signup/login or expense-creation endpoints. Add data using your existing app or a database tool.

The query uses SQL `SUM`, `GROUP BY`, a left join, and a limit of 10. The `Expenses.userId` field is indexed.
