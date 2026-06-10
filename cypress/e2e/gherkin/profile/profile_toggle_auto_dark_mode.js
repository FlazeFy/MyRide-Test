const { Given, Then, When } = require("@badeball/cypress-cucumber-preprocessor")

// E2E Test : E2E-PRO-PTAD-001

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
    cy.get("#setting-section label").eq(0).should("contain.text", title)
})

When("I click the toggle button", () => {
    cy.get("#setting-section #autoThemeToggle").click()
})

Then("the color mode should change based on current time", () => {
    // Validate theme changed based on current time
    // Dark : 06:00 PM - 05:59 AM
    // Light : 06:00 AM - 05:59 PM
    const hour = new Date().getHours()
    cy.get("body").should("have.class", (hour >= 18 || hour < 6) ? "dark" : "light")
})
