export interface Expense {
  name: string;
  amount: number;
}

export interface Payout {
  owes: string;
  owed: string[];
  amount: number;
}
