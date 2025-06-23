import Expense from "../models/expense.model.js";

const create = async (req, res) => {
  try {
    const expense = new Expense({ ...req.body, user: req.auth._id });
    await expense.save();
    res.status(200).json({ message: "Expense created" });
  } catch (err) {
    res.status(400).json({ error: "Could not create expense" });
  }
};

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

    query.incurred_on = {
      $gte: start,
      $lt: end,
    };
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

const read = (req, res) => {
  return res.json(req.expense);
};

const update = async (req, res) => {
  try {
    const updated = await Expense.findByIdAndUpdate(
      req.params.expenseId,
      req.body,
      {
        new: true,
      }
    );
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: "Failed to update expense" });
  }
};

const remove = async (req, res) => {
  try {
    const deleted = await Expense.findByIdAndDelete(req.params.expenseId);
    res.json(deleted);
  } catch (err) {
    res.status(400).json({ error: "Failed to delete expense" });
  }
};

const currentMonthPreview = async (req, res) => {
  const start = new Date();
  start.setDate(1);
  const end = new Date(start);
  end.setMonth(start.getMonth() + 1);

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

// ✅ Tambahan ini adalah solusi utama error "argument fn is required"
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

export default {
  create,
  listByUser,
  read,
  update,
  remove,
  currentMonthPreview,
  expenseByID, 
};
