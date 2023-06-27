import { Injectable } from '@angular/core';
import { Expense } from '../model/expense.model';
import { environment } from '../../environment/environment';

@Injectable({
  providedIn: 'root',
})
export class ExpenseService {
  private expenses: Expense[] = [];

  constructor() {}

  /**
   * Adds an expense to the list of expenses.
   * @param expense The expense to add.
   */
  addExpense(expense: Expense): void {
    this.expenses.push(expense);
  }

  /**
   * Retrieves the list of expenses.
   * @returns The list of expenses.
   */
  getExpenses(): Expense[] {
    return this.expenses;
  }

  /**
   * Calculates the payouts for the expenses.
   * @returns A promise that resolves to the payouts.
   */
  calculatePayouts(): Promise<any> {
    const expenses = this.getExpenses();

    return fetch(`${environment.apiBaseUrl}/expense/add`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ expenses }),
    })
      .then((response) => response.json())
      .then((data) => data.payouts)
      .catch((error) => {
        console.error('Error calculating payouts:', error);
        throw error;
      });
  }
}
