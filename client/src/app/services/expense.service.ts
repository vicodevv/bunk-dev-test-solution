import { Injectable } from '@angular/core';
import { Expense } from '../model/expense.model';
import { environment } from '../../environment/environment';

@Injectable({
  providedIn: 'root',
})
export class ExpenseService {
  private expenses: Expense[] = [];

  constructor() {}

  addExpense(expense: Expense): void {
    this.expenses.push(expense);
  }

  getExpenses(): Expense[] {
    return this.expenses;
  }

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
