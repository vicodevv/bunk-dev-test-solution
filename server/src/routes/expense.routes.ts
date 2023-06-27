import express from 'express';
import { addExpense } from '../controllers/expense.controller';

const expenseRouter = express.Router();

expenseRouter.post('/add', addExpense);

export default expenseRouter;
