describe('e2e tests', () => {
  it('welcome page', () => {
    cy.intercept('GET', 'https://plants.localhost.pomerium.io/api/users/me', {
      fixture: 'users/me',
    }).as('getMe')
    cy.intercept(
      'GET',
      'https://plants.localhost.pomerium.io/api/plants/to_be_watered',
      { fixture: 'plants/no_plants_to_be_watered' },
    ).as('getPlantsToBeWatered')
    cy.visit('/')
    cy.contains('Welcome to the plants app')
  })

  it('Water all plants button', () => {
    cy.intercept('GET', 'https://plants.localhost.pomerium.io/api/users/me', {
      fixture: 'users/me',
    }).as('getMe')
    cy.intercept(
      'GET',
      'https://plants.localhost.pomerium.io/api/plants/to_be_watered',
      { fixture: 'plants/plants_to_be_watered' },
    ).as('getPlantsToBeWatered')
    cy.intercept(
      'POST',
      'https://plants.localhost.pomerium.io/api/plants/water_all',
      { statusCode: 204 },
    ).as('waterAllPlants')
    cy.visit('/')
    cy.contains('Water all plants').click()
  })
})
