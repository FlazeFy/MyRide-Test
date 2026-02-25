const { Given, When, Then } = require("@badeball/cypress-cucumber-preprocessor")

Given("I open the login page", () => {
    cy.visit("/login")
})

Then("I should see the section title {string}", (title) => {
    cy.contains("h2", title).should("be.visible")
})

Then("I should see the label {string}", (label) => {
    cy.get("#form-login label").contains(label).should("be.visible")
})

Then("I should see the submit button {string}", (text) => {
    cy.get("#form-login a.btn-success").contains(text).should("be.visible")
})

When("I fill in the email with {string}", (email) => {
    cy.get("#username").clear().type(email)
})

When("I fill in the password with {string}", (password) => {
    cy.get("#password").clear().type(password)
})

When("I click the submit button", () => {
    cy.get("#form-login a.btn-success").click()
})

Then("I should be redirected to the dashboard page", () => {
    cy.url().should("include", "/dashboard")
})