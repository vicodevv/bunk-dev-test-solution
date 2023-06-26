describe('Expenses', () => {
  beforeEach(() => {
    // Run any setup code or visit the initial page if needed
    cy.visit('localhost:4200')
  });

  it('should calculate payouts correctly', () => {
    // Add your test steps here
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

    // Assert the expected results
    cy.contains('Adriana needs to pay Bao £0.25');
  });
});
