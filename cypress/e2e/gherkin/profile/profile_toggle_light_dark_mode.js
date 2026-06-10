const { Given, Then, When } = require("@badeball/cypress-cucumber-preprocessor")

// E2E Test : E2E-PRO-PTLD-001

const testData = {
    username: "flazen.edu",
    password: "nopass123"
}

Given("I have already signed in to the app", () => {
    cy.login(testData.username, testData.password)
})

When("I click the navbar button", () => {
    cy.get("nav a#profile-button").click()
})

Then("I should see the section title {string}", (title) => {
    cy.get("#setting-section h2").first().should("contain.text", title)
})

Then("I should see the label {string}", (title) => {
    cy.get("#setting-section label").eq(1).should("contain.text", title)
})

When("I click the toggle button", () => {
    // Validate current theme is light mode
    cy.get("body").should("have.class", "light")

    cy.get("#setting-section #themeToggle").click()
})

Then("the color mode should change", () => {
    // Validate theme changed to dark mode
    cy.get("body").should("have.class", "dark")
})
