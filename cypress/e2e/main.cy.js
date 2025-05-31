describe('e2e tests', () => {
  it('Welcome page', () => {
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

    it('When marking one plant as watered the card is dismissed', () => {
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
        cy.get('.card').should('have.length', 2)
        cy.intercept('POST', 'https://plants.localhost.pomerium.io/api/plants/1/water', {
            statusCode: 200,
        }).as('waterPlant')
        cy.findAllByText('Water it').first().click()
        cy.get('.card').should('have.length', 1)
        
    })

  it('Plant details page', () => {
    cy.intercept('GET', 'https://plants.localhost.pomerium.io/api/users/me', {
      fixture: 'users/me',
    }).as('getMe')
    cy.intercept('GET', 'https://plants.localhost.pomerium.io/api/plants/1', {
      fixture: 'plants/plant_details',
    }).as('getPlant')
    cy.visit('/plant/1')
  })
})
