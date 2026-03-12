const { Given, Then } = require("@badeball/cypress-cucumber-preprocessor")

// E2E Test : E2E-NAV-SGOT-001

const testData = {
    username: "flazen.edu",
    password: "nopass123"
}

Given("I have already signed in to the app", () => {
    cy.login(testData.username, testData.password)
})

Then("I clicked the sign out button in the navbar", () => {
    cy.get("#sign-out-btn").click()
})  

Then("I should see pop up confirmation", () => {
    cy.get('#modalSignOut', { timeout: 5000 }).should('exist').and('have.class', 'show').and('be.visible')             
})  

Then("I clicked the {string} button", (title) => {
    cy.get('#modalSignOut').should('have.class', 'show').and('be.visible')
        .within(() => {
            // Check if pop up contain confirmation message
            cy.get('p').should('contain.text', 'Are you sure want to leave this account?')
            // Check if pop up contain sign button
            cy.get('a').should('contain.text', title).and('be.visible').click()
        })
})  

Then("I should be redirected to the {string} page", (page) => {
    cy.url().should("include", `/${page}`)
})