const { Given, Then } = require("@badeball/cypress-cucumber-preprocessor")
// E2E Test : E2E-INVT-SISD-001

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
    cy.get("#inventory_storage-holder").prevAll("h2").first().should("contain.text", title)
})

Then("I should see the pie chart", () => {
    cy.checkPieChart("#inventory_storage-holder")
})

Then("I should see chart labels for each series", () => {
    cy.checkPieChartLegend("#inventory_storage-holder")
})
