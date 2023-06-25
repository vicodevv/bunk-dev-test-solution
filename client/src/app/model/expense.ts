export interface Expense {
  isSelected: boolean;
  id: number;
  Name: string;
  Amount: number;
  isEdit: boolean;
}

export const ExpenseColumns = [
  {
    key: 'isSelected',
    type: 'isSelected',
    label: '',
  },
  {
    key: 'name',
    type: 'text',
    label: 'Name',
    required: true,
  },
  {
    key: 'Amount',
    type: 'number',
    label: 'Amount',
  },
  {
    key: 'isEdit',
    type: 'isEdit',
    label: '',
  },
];
