import { Request, Response } from 'express';
import { sumBy, uniqBy, groupBy } from 'lodash';

interface Expense {
  name: string;
  amount: number;
}

interface Payout {
  owes: string;
  owed: string[];
  amount: number;
}

// Controller for expense routes
const expenseController = {
  add: (req: Request, res: Response): void => {
    const expenses: Expense[] = req.body.expenses;

    // Calculate total expenses
    const total: number = sumBy(expenses, 'amount');

    // Get unique traveler names
    const uniqueNames: string[] = uniqBy(expenses, 'name').map(
      (expense) => expense.name
    );

    // Calculate equal share per person
    const equalShare: number = total / uniqueNames.length;

    // Group expenses by traveler's name and calculate total expenses per traveler
    const groupedExpenses: Record<string, Expense[]> = groupBy(
      expenses,
      'name'
    );
    const travelerTotals: Record<string, number> = {};
    Object.keys(groupedExpenses).forEach((name) => {
      travelerTotals[name] = sumBy(groupedExpenses[name], 'amount');
    });

    // Calculate individual payouts for travelers who owe money
    const payouts: Payout[] = [];
    Object.keys(travelerTotals).forEach((name) => {
      const travelerTotal = travelerTotals[name];
      if (travelerTotal < equalShare) {
        const owes = name;
        const owed = uniqueNames.filter((name) => name !== owes);
        const amount = equalShare - travelerTotal;
        const roundedAmount = amount.toFixed(2); // Round to 2 decimal places
        payouts.push({ owes, owed, amount: Number(roundedAmount) });
      }
    });

    res.status(200).send({
      total,
      equalShare,
      payouts,
    });
  },
};

export default expenseController;
