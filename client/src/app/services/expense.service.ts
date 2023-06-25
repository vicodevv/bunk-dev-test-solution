import { Injectable } from '@angular/core';
import { Expense } from '../model/expense.model';

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {
  private expenses: Expense[] = [];

  constructor() { }

  addExpense(expense: Expense): void {
    this.expenses.push(expense);
  }

  getExpenses(): Expense[] {
    return this.expenses;
  }

  clearExpenses(): void {
    this.expenses = [];
  }
}
