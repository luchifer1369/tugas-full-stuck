// 📂 Lokasi: server/controllers/expense.controller.js

import Expense from "../models/expense.model.js";
import mongoose from "mongoose";

/**
 * 📥 Create a new expense for the logged-in user
 */
const create = async (req, res) => {
  try {
    const expense = new Expense({ ...req.body, user: req.auth._id });
    await expense.save();
    res.status(200).json({ message: "Expense created" });
  } catch (err) {
    res.status(400).json({ error: "Could not create expense" });
  }
};

/**
 * 📄 List all expenses for the current user
 */
const listByUser = async (req, res) => {
  const user = req.auth._id;
  const query = {};

  if (req.query.category) {
    query.category = req.query.category;
  }

  if (req.query.month) {
    const start = new Date(req.query.month);
    const end = new Date(start);
    end.setMonth(start.getMonth() + 1);
    query.incurred_on = { $gte: start, $lt: end };
  }

  try {
    const expenses = await Expense.find({ user, ...query }).sort({
      incurred_on: -1,
    });
    res.json(expenses);
  } catch (err) {
    res.status(400).json({ error: "Could not retrieve expenses" });
  }
};

/**
 * 📘 Read a specific expense
 */
const read = (req, res) => {
  return res.json(req.expense);
};

/**
 * ✏️ Update a specific expense
 */
const update = async (req, res) => {
  try {
    const updated = await Expense.findByIdAndUpdate(
      req.params.expenseId,
      req.body,
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: "Failed to update expense" });
  }
};

/**
 * ❌ Remove an expense
 */
const remove = async (req, res) => {
  try {
    const deleted = await Expense.findByIdAndDelete(req.params.expenseId);
    res.json(deleted);
  } catch (err) {
    res.status(400).json({ error: "Failed to delete expense" });
  }
};

/**
 * 📊 Return preview of current month's expenses
 */
const currentMonthPreview = async (req, res) => {
  const userId = new mongoose.Types.ObjectId(req.auth._id);

  const startOfMonth = new Date();
  startOfMonth.setDate(1);
  startOfMonth.setHours(0, 0, 0, 0);

  const endOfMonth = new Date(startOfMonth);
  endOfMonth.setMonth(endOfMonth.getMonth() + 1);

  const startOfToday = new Date();
  startOfToday.setHours(0, 0, 0, 0);

  const startOfYesterday = new Date(startOfToday);
  startOfYesterday.setDate(startOfYesterday.getDate() - 1);

  const endOfYesterday = new Date(startOfToday);

  console.log("==== CURRENT MONTH PREVIEW ====");
  console.log("userId:", userId);
  console.log("startOfMonth:", startOfMonth);
  console.log("endOfMonth:", endOfMonth);
  console.log("startOfToday:", startOfToday);
  console.log("startOfYesterday:", startOfYesterday);
  console.log("endOfYesterday:", endOfYesterday);

  try {
    const monthExpenses = await Expense.aggregate([
      {
        $match: {
          user: userId,
          incurred_on: { $gte: startOfMonth, $lt: endOfMonth },
        },
      },
      { $group: { _id: null, totalSpent: { $sum: "$amount" } } },
    ]);

    const todayExpenses = await Expense.aggregate([
      {
        $match: {
          user: userId,
          incurred_on: { $gte: startOfToday },
        },
      },
      { $group: { _id: null, totalSpent: { $sum: "$amount" } } },
    ]);

    const yesterdayExpenses = await Expense.aggregate([
      {
        $match: {
          user: userId,
          incurred_on: { $gte: startOfYesterday, $lt: endOfYesterday },
        },
      },
      { $group: { _id: null, totalSpent: { $sum: "$amount" } } },
    ]);

    res.json({
      month: { totalSpent: monthExpenses[0]?.totalSpent || 0 },
      today: { totalSpent: todayExpenses[0]?.totalSpent || 0 },
      yesterday: { totalSpent: yesterdayExpenses[0]?.totalSpent || 0 },
    });
  } catch (err) {
    console.error("ERROR currentMonthPreview:", err);
    res.status(400).json({ error: "Could not get current month preview" });
  }
};

/**
 * 🧩 Load expense by ID
 */
const expenseByID = async (req, res, next, id) => {
  try {
    const expense = await Expense.findById(id);
    if (!expense) {
      return res.status(404).json({ error: "Expense not found" });
    }
    req.expense = expense;
    next();
  } catch (err) {
    return res.status(400).json({ error: "Could not retrieve expense" });
  }
};

/**
 * 📊 Group expenses by category
 */
const expenseByCategory = async (req, res) => {
  const userId = new mongoose.Types.ObjectId(req.auth._id);

  try {
    console.log("==== EXPENSE BY CATEGORY ====");
    console.log("userId:", userId);

    const categories = await Expense.aggregate([
      {
        $match: {
          user: userId,
        },
      },
      {
        $group: {
          _id: "$category",
          total: { $sum: "$amount" },
          average: { $avg: "$amount" },
        },
      },
    ]);

    res.json(categories);
  } catch (err) {
    console.error("ERROR expenseByCategory:", err);
    res.status(400).json({ error: "Could not group expenses by category" });
  }
};

// 🚀 Export semua controller
export default {
  create,
  listByUser,
  read,
  update,
  remove,
  currentMonthPreview,
  expenseByID,
  expenseByCategory,
};
