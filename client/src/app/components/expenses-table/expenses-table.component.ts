import { Component } from '@angular/core';
import { Expense } from '../../model/expense.model';
import { ExpenseService } from '../../services/expense.service';

@Component({
  selector: 'app-expenses-table',
  templateUrl: './expenses-table.component.html',
  styleUrls: ['./expenses-table.component.scss'],
})
export class ExpensesTableComponent {
  expenses: Expense[] = [];
  name = '';
  amount = 0;

  constructor(private expenseService: ExpenseService) {}

  /**
   * Adds an expense to the list of expenses.
   * Clears the input fields after adding the expense.
   */
  addExpense(): void {
    const expense: Expense = { name: this.name, amount: this.amount };
    this.expenseService.addExpense(expense);
    this.expenses = this.expenseService.getExpenses();
    this.name = '';
    this.amount = 0;
  }

  /**
   * Removes an expense from the list of expenses.
   * @param index The index of the expense to remove.
   */
  removeExpense(index: number): void {
    this.expenses.splice(index, 1);
  }
}

