const { Given, Then } = require("@badeball/cypress-cucumber-preprocessor")
// E2E Test : E2E-SRVC-SSPC-001

Given("I have already signed in to the app", () => {
    const testData = {
        email: "flazen.edu",
        password: "nopass123"
    }
    cy.login(testData.email, testData.password)
})

Then("I open the {string} page", (title) => {
    cy.openPageViaSideBar(title)
})

Then("I should see the section title {string}", (title) => {
    cy.get("#stats_total_price_service_by_category_holder").prevAll("h2").first().should("contain.text", title)
})

Then("I should see the pie chart", () => {
    cy.checkPieChart("#stats_total_price_service_by_category_holder")
})

Then("I should see chart labels for each series", () => {
    cy.checkPieChartLegend("#stats_total_price_service_by_category_holder")
})
