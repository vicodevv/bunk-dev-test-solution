import { Injectable } from '@angular/core';
import { Expense } from '../model/expense.model';

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {
  private expenses: Expense[] = [];

  constructor() { }

  // Add expense to expenses array
  addExpense(expense: Expense): void {
    this.expenses.push(expense);
  }

  // Return expenses array
  getExpenses(): Expense[] {
    return this.expenses;
  }
}
