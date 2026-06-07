const { Given, Then } = require("@badeball/cypress-cucumber-preprocessor")

// E2E Test : E2E-FUEL-EFDS-001
const testData = {
    email: "flazen.edu",
    password: "nopass123"
}

Given("I have already signed in to the app", () => {    
    cy.login(testData.email, testData.password)
})

Then("I open the {string} page", (title) => {
    cy.openPageViaSideBar(title)
})

Then("I should see the export button {string}", (title) => {
    cy.get("#export_excel").contains(title).should("be.visible")
})

Then("I click the export button", () => {
    cy.get("#export_excel").click()
})

Then("I should see {string} pop up with message {string}", (resultType, message) => {
    cy.checkSwalDialog(resultType, message)
})

Then("I should get the fuel dataset", () => {
    const cols = ['vehicle_name', 'vehicle_plate_number', 'vehicle_type', 'fuel_volume', 'fuel_price_total', 'fuel_brand', 'fuel_type', 'fuel_ron', 'datetime']
    cy.checkExportedData(testData.email, 'xlsx', cols)
})
