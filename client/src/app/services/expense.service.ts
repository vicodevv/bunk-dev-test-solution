import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin, Observable } from 'rxjs';
import { Expense } from '../model/expense';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ExpenseService {
  private serviceUrl = 'http://localhost:3003/expense';

  constructor(private http: HttpClient) {}

  getExpenses(): Observable<Expense[]> {
    return this.http
      .get(this.serviceUrl)
      .pipe<Expense[]>(map((data: any) => data.Expenses));
  }

  updateExpense(Expense: Expense): Observable<Expense> {
    return this.http.patch<Expense>(`${this.serviceUrl}/${Expense.id}`, Expense);
  }

  addExpense(Expense: Expense): Observable<Expense> {
    return this.http.post<Expense>(`${this.serviceUrl}/add`, Expense);
  }

  deleteExpense(id: number): Observable<Expense> {
    return this.http.delete<Expense>(`${this.serviceUrl}/${id}`);
  }

  deleteExpenses(Expenses: Expense[]): Observable<Expense[]> {
    return forkJoin(
      Expenses.map((Expense) =>
        this.http.delete<Expense>(`${this.serviceUrl}/${Expense.id}`)
      )
    );
  }
}
