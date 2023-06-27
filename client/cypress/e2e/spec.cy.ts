

describe('Expenses', () => {
  beforeEach(() => {
    cy.visit('localhost:4200');
  });

  // Add an expense
  it('should add an expense', () => {
    // Add an expense
    cy.get('input[name="name"]').type('Adriana');
    cy.get('input[name="amount"]').type('5.75');
    cy.get('button').contains('Add Expense').click();

    // Assert the expense is added
    cy.get('.table tbody').should('contain', 'Adriana');
  });

  // Calculate the payout
  it('should calculate payouts correctly', () => {
    cy.get('input[name="name"]').type('Adriana');
    cy.get('input[name="amount"]').type('5.75');
    cy.get('button').contains('Add Expense').click();

    cy.get('input[name="name"]').type('Adriana');
    cy.get('input[name="amount"]').type('5.75');
    cy.get('button').contains('Add Expense').click();

    cy.get('input[name="name"]').type('Bao');
    cy.get('input[name="amount"]').type('12');
    cy.get('button').contains('Add Expense').click();

    cy.get('button').contains('Settle Up').click();
  });

  // Delete an expense
  it('should remove the first expense', () => {
    // Add expenses
    cy.get('input[name="name"]').type('Adriana');
    cy.get('input[name="amount"]').type('5.75');
    cy.get('button').contains('Add Expense').click();

    cy.get('input[name="name"]').type('Bao');
    cy.get('input[name="amount"]').type('12');
    cy.get('button').contains('Add Expense').click();

    // Remove the first expense
    cy.get('.table tbody tr').eq(0).find('.delete-btn').click();

    // Assert the first expense is removed
    cy.get('.table tbody').should('not.contain', 'Adriana');
  });
});
