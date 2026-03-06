const { Given, Then } = require("@badeball/cypress-cucumber-preprocessor")
const { Before } = require("@badeball/cypress-cucumber-preprocessor")

// E2E Test : E2E-SNA-VHL-001

const testData = {
    username: "flazen.edu",
    password: "nopass123"
}
let totalVehicle = 0

Before(() => {
    cy.visit("/") 
    cy.clearAll()
})

Given("I have already signed in to the app", () => {
    cy.login(testData.username, testData.password)
})

Given("I have added a vehicle", () => {
    cy.intercept("GET", "/api/v1/stats/summary").as("getSummary")
    cy.wait("@getSummary").then(() => {
        cy.get("#my_summary-section h2").first().should("contain.text", "Summary")
        cy.get("#my_summary-section #total_vehicle-holder").invoke("text").then(text => {
            // Test parse int
            const num = Number(text.replace(/[^0-9]/g, ""))
            expect(isNaN(num)).to.be.false

            // Store total vehicle count for later validation        
            totalVehicle = parseInt(num)

            // Verify that user has at least one vehicle
            expect(totalVehicle).to.be.greaterThan(0)
        })
    })
})

Then("I click the sidebar button located in the left navbar", () => {
    cy.get(".toogle_nav-button").click()
})

Then("I should see my vehicle list in section {string}", (title) => {
    // Validate group menu has title
    cy.get('#vehicle_menu-list').prev('h5.group-menu').should('contain.text',title)

    // Validate the vehicle has plate number and name
    const notEmptyEl = ['.plate-number','.vehicle-name']
    cy.get('#vehicle_menu-list li').each((el) => {
        notEmptyEl.forEach((dt) => {
            cy.wrap(el).find(dt).invoke("text").should('not.be.empty')
        })
    })
})