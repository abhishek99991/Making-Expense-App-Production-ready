const express = require("express");
require("dotenv").config();

const sequelize = require("./config/database");
const { User, Expense } = require("./models");
const leaderboardRoutes = require("./routes/leaderboardRoutes");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Expense Tracker API is running",
  });
});

app.use("/api/leaderboard", leaderboardRoutes);

async function startServer() {
  try {
    await sequelize.authenticate();
    await sequelize.sync();

    console.log(`Database connected. Models: ${User.name}, ${Expense.name}`);

    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
}

startServer();
