const { Given, Then } = require("@badeball/cypress-cucumber-preprocessor")

// E2E Test : E2E-WASH-EWDS-001
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

Then("I should get the wash dataset", () => {
    const cols = [
        'vehicle_name', 'wash_desc', 'wash_by', 'is_wash_body', 'is_wash_window', 'is_wash_dashboard', 'is_wash_tires', 'is_wash_trash', 
        'is_wash_engine', 'is_wash_seat', 'is_wash_carpet', 'is_wash_pillows', 'wash_address', 'wash_start_time', 'wash_end_time', 
        'is_fill_window_washing_water', 'is_wash_hollow', 'datetime'
    ]
    cy.checkExportedData(testData.email, 'xlsx', cols)
})
