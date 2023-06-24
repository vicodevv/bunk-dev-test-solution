import { model, Schema } from "mongoose";
const mongoose = require('mongoose')

const expenseSchema = new Schema({
    name: String,
    amount: Number,
});

const Expense = model("Expense", expenseSchema);

module.exports = Expense;