const { fn, col, literal } = require("sequelize");
const { User, Expense } = require("../models");

const getLeaderboard = async (req, res) => {
  try {
    const leaderboard = await User.findAll({
      attributes: [
        "id",
        "name",
        [
          fn("COALESCE", fn("SUM", col("expenses.amount")), 0),
          "totalExpenses",
        ],
      ],
      include: [
        {
          model: Expense,
          as: "expenses",
          attributes: [],
          required: false,
        },
      ],
      group: ["User.id", "User.name"],
      order: [
        [literal('COALESCE(SUM("expenses"."amount"), 0)'), "DESC"],
        ["id", "ASC"],
      ],
      limit: 10,
      subQuery: false,
      raw: true,
    });

    return res.status(200).json({
      success: true,
      count: leaderboard.length,
      leaderboard,
    });
  } catch (error) {
    console.error("Leaderboard error:", error);
    return res.status(500).json({
      success: false,
      message: "Unable to fetch leaderboard",
    });
  }
};

module.exports = { getLeaderboard };
