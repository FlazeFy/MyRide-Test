const { Given, Then } = require("@badeball/cypress-cucumber-preprocessor")
// E2E Test : E2E-DASH-FCMT-001

Given("I have already signed in to the app", () => {
    const testData = {
        email: "flazen.edu",
        password: "nopass123"
    }
    cy.login(testData.email, testData.password)
})

Then("I should see the section title {string}", (title) => {
    cy.get("#total_monthly_fuel_consumption-section").find("h2").first().should("contain.text", title)
})

Then("I should see the line chart and the horizontal label showing the list of month names", () => {
    cy.checkMonthlyLineChart("#stats_total_fuel_monthly_holder")
})

Then("I should see a chart with valid values for each series", () => {
    cy.checkLineChartValidValues("#stats_total_fuel_monthly_holder")
})