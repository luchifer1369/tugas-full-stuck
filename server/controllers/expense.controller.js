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
 * Supports optional filtering by category or month (YYYY-MM format)
 */
const listByUser = async (req, res) => {
  const user = req.auth._id;
  const query = {};

  // 🔍 Filter by category if provided
  if (req.query.category) {
    query.category = req.query.category;
  }

  // 📅 Filter by month (e.g., 2025-06)
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
 * 📘 Read a specific expense (already preloaded in req.expense)
 */
const read = (req, res) => {
  return res.json(req.expense);
};

/**
 * ✏️ Update a specific expense by ID
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
  const start = new Date();
  start.setDate(1); // ⬅️ start of month
  const end = new Date(start);
  end.setMonth(start.getMonth() + 1); // ➡️ start of next month

  try {
    const preview = await Expense.find({
      user: req.auth._id,
      incurred_on: { $gte: start, $lt: end },
    });
    res.json(preview);
  } catch (err) {
    res.status(400).json({ error: "Could not get current month preview" });
  }
};

/**
 * 🧩 Middleware: Load expense by ID and attach to req
 * Required for route parameters like :expenseId
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

const expenseByCategory = async (req, res) => {
  try {
    console.log("req.auth", req.auth);
    const categories = await Expense.aggregate([
      {
        $match: {
          user: req.auth._id, // Pastikan ini benar ObjectId
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

// 🚀 Export semua controller untuk digunakan di router
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
