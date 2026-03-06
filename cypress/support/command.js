const { Before } = require("@badeball/cypress-cucumber-preprocessor")

Cypress.Commands.add("login", (email, password) => {
    cy.visit("/login")
    // Fill the login form
    cy.get("#username").clear().type(email)
    cy.get("#password").clear().type(password)
    cy.get("#form-login a.btn-success").click()
    // Post condition
    cy.url().should("include", "/dashboard")
})

Cypress.Commands.add("clearAll", () => {
    // Clear local, session storage, and cookie
    cy.clearAllLocalStorage()
    cy.clearAllCookies()
    cy.clearAllSessionStorage()
})