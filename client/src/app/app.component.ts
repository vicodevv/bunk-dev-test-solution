import { Component, DefaultIterableDiffer, OnInit } from '@angular/core'
import { MatDialog } from '@angular/material/dialog'
import { MatTableDataSource } from '@angular/material/table'
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component'
import { Expense, ExpenseColumns } from './model/expense'
import { ExpenseService } from './services/expense.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  displayedColumns: string[] = ExpenseColumns.map((col) => col.key)
  columnsSchema: any = ExpenseColumns
  dataSource = new MatTableDataSource<Expense>()
  valid: any = {}

  constructor(public dialog: MatDialog, private ExpenseService: ExpenseService) {}

  ngOnInit() {
    this.ExpenseService.getExpenses().subscribe((res: any) => {
      this.dataSource.data = res
    })
  }

  editRow(row: Expense) {
    if (row.id === 0) {
      this.ExpenseService.addExpense(row).subscribe((newExpense: Expense) => {
        row.id = newExpense.id
        row.isEdit = false
      })
    } else {
      this.ExpenseService.updateExpense(row).subscribe(() => (row.isEdit = false))
    }
  }

  addRow() {
    const newRow: Expense = {
      id: 0,
      Name: '',
      Amount: 0,
      isEdit: true,
      isSelected: false,
    }
    this.dataSource.data = [newRow, ...this.dataSource.data]
  }

  removeRow(id: number) {
    this.ExpenseService.deleteExpense(id).subscribe(() => {
      this.dataSource.data = this.dataSource.data.filter(
        (u: Expense) => u.id !== id,
      )
    })
  }

  removeSelectedRows() {
    const Expenses = this.dataSource.data.filter((u: Expense) => u.isSelected)
    this.dialog
      .open(ConfirmDialogComponent)
      .afterClosed()
      .subscribe((confirm) => {
        if (confirm) {
          this.ExpenseService.deleteExpenses(Expenses).subscribe(() => {
            this.dataSource.data = this.dataSource.data.filter(
              (u: Expense) => !u.isSelected,
            )
          })
        }
      })
  }

  inputHandler(e: any, id: number, key: string) {
    if (!this.valid[id]) {
      this.valid[id] = {}
    }
    this.valid[id][key] = e.target.validity.valid
  }

  disableSubmit(id: number) {
    if (this.valid[id]) {
      return Object.values(this.valid[id]).some((item) => item === false)
    }
    return false
  }

  isAllSelected() {
    return this.dataSource.data.every((item) => item.isSelected)
  }

  isAnySelected() {
    return this.dataSource.data.some((item) => item.isSelected)
  }

  selectAll(event: any) {
    this.dataSource.data = this.dataSource.data.map((item) => ({
      ...item,
      isSelected: event.checked,
    }))
  }
}
