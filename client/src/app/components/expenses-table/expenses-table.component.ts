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

  addExpense(): void {
    const expense: Expense = { name: this.name, amount: this.amount };
    this.expenseService.addExpense(expense);
    this.expenses = this.expenseService.getExpenses();
    this.name = '';
    this.amount = 0;
  }

  removeExpense(index: number): void {
    this.expenses.splice(index, 1);
  }
}
