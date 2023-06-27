import { Request, Response } from 'express';
import { Expense, Payout } from '../interface/interface';
import { ExpenseService } from '../services/expense.service';

const expenseService = new ExpenseService();

/**
 * Controller function for adding expenses and calculating payouts.
 * @param req The request object.
 * @param res The response object.
 */
export const addExpense = (req: Request, res: Response): void => {
  const expenses: Expense[] = req.body.expenses;

  // Calculate the payouts using the ExpenseService
  const result = expenseService.calculatePayouts(expenses);

  // Send the calculated payouts in the response
  res.status(200).send(result);
};
