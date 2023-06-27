import { groupBy, sumBy, uniqBy } from 'lodash';
import { Payout, Expense } from '../interface/interface';

/**
 * Service responsible for calculating expense payouts.
 */
export class ExpenseService {
  /**
   * Calculates the expense payouts based on the provided expenses.
   * @param expenses The list of expenses.
   * @returns The calculated payouts.
   */
  calculatePayouts(expenses: Expense[]): any {
    const total: number = this.calculateTotal(expenses);
    const uniqueNames: string[] = this.getUniqueNames(expenses);
    const equalShare: number = this.calculateEqualShare(
      total,
      uniqueNames.length
    );

    const groupedExpenses: Record<string, Expense[]> =
      this.groupExpenses(expenses);
    const travelerTotals: Record<string, number> =
      this.calculateTravelerTotals(groupedExpenses);

    const payouts: Payout[] = this.calculatePayoutsForTravelers(
      travelerTotals,
      equalShare,
      uniqueNames
    );

    return {
      total,
      equalShare,
      payouts,
    };
  }

  /**
   * Calculates the total amount of expenses.
   * @param expenses The list of expenses.
   * @returns The total amount.
   */
  private calculateTotal(expenses: Expense[]): number {
    return sumBy(expenses, 'amount');
  }

  /**
   * Retrieves the unique traveler names from the expenses.
   * @param expenses The list of expenses.
   * @returns The unique traveler names.
   */
  private getUniqueNames(expenses: Expense[]): string[] {
    return uniqBy(expenses, 'name').map((expense) => expense.name);
  }

  /**
   * Calculates the equal share per person.
   * @param total The total amount of expenses.
   * @param numTravelers The number of unique travelers.
   * @returns The equal share per person.
   */
  private calculateEqualShare(total: number, numTravelers: number): number {
    return total / numTravelers;
  }

  /**
   * Groups the expenses by traveler's name.
   * @param expenses The list of expenses.
   * @returns The grouped expenses.
   */
  private groupExpenses(expenses: Expense[]): Record<string, Expense[]> {
    return groupBy(expenses, 'name');
  }

  /**
   * Calculates the total expenses per traveler.
   * @param groupedExpenses The grouped expenses.
   * @returns The total expenses per traveler.
   */
  private calculateTravelerTotals(
    groupedExpenses: Record<string, Expense[]>
  ): Record<string, number> {
    const travelerTotals: Record<string, number> = {};
    Object.keys(groupedExpenses).forEach((name) => {
      travelerTotals[name] = sumBy(groupedExpenses[name], 'amount');
    });
    return travelerTotals;
  }

  /**
   * Calculates individual payouts for travelers who owe money.
   * @param travelerTotals The total expenses per traveler.
   * @param equalShare The equal share per person.
   * @param uniqueNames The unique traveler names.
   * @returns The list of payouts.
   */
  private calculatePayoutsForTravelers(
    travelerTotals: Record<string, number>,
    equalShare: number,
    uniqueNames: string[]
  ): Payout[] {
    const payouts: Payout[] = [];
    Object.keys(travelerTotals).forEach((name) => {
      const travelerTotal = travelerTotals[name];
      if (travelerTotal < equalShare) {
        const owes = name;
        const owed = uniqueNames.filter((name) => name !== owes);
        const amount = equalShare - travelerTotal;
        const roundedAmount = amount.toFixed(2);
        payouts.push({ owes, owed, amount: Number(roundedAmount) });
      }
    });
    return payouts;
  }
}
