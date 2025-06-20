// 📂 Lokasi: server/models/expense.model.js

import mongoose from 'mongoose'

const ExpenseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      required: 'Title is required'
    },
    amount: {
      type: Number,
      required: 'Amount is required'
    },
    category: {
      type: String,
      trim: true,
      required: 'Category is required'
    },
    incurred_on: {
      type: Date,
      default: Date.now
    },
    updated: Date,
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User'
    }
  },
  {
    timestamps: true
  }
)

export default mongoose.model('Expense', ExpenseSchema)
