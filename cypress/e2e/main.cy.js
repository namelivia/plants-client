describe('e2e tests', () => {
  it('welcome page', () => {
    cy.intercept('GET', 'https://plants.localhost.pomerium.io/api/users/me', {
      fixture: 'users/me',
    }).as('getMe')
    cy.intercept(
      'GET',
      'https://plants.localhost.pomerium.io/api/plants/to_be_watered',
      { fixture: 'plants/no_plants_to_be_watered' },
    ).as('getPlatsToBeWatered')
    cy.visit('/')
    cy.contains('Welcome to the plants app')
  })
})
