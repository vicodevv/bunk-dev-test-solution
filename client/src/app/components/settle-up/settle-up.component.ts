import { Component } from '@angular/core';
import { ExpenseService } from '../../services/expense.service';

@Component({
  selector: 'app-settle-up',
  templateUrl: './settle-up.component.html',
  styleUrls: ['./settle-up.component.scss']
})
export class SettleUpComponent {
  showPayouts: boolean = false;
  payouts: any[] = [];

  constructor(private expenseService: ExpenseService) { }

  settleUp(): void {
    const expenses = this.expenseService.getExpenses();

    //API request to calculate payouts
    fetch('http://localhost:3000/expense/add', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ expenses })
    })
    .then(response => response.json())
    .then(data => {
      this.payouts = data.payouts;
      this.showPayouts = true;
    })
    .catch(error => {
      console.error('Error calculating payouts:', error);
    });
  }
}
