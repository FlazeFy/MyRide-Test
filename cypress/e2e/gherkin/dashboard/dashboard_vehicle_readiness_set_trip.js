const { Given, Then } = require("@badeball/cypress-cucumber-preprocessor")
const { cleanText } = require("../../helpers/converter")

// E2E Test : E2E-DASH-VRST-001
Given("I have already signed in to the app", () => {
    const testData = {
        email: "flazen.edu",
        password: "nopass123"
    }
    cy.login(testData.email, testData.password)
})

Then("I should see the section title {string}", (title) => {
    cy.get("#vehicle_readiness-section h2").first().should("contain.text", title)
})

Then("I should see the table headers with label {string}", (label) => {
    cy.get("#vehicle_readiness-section table thead tr th").contains(label).should("be.visible")
})

Then("I should click the action button", () => {
    // Take plate number for comparison at pop-up message
    cy.get("#vehicle_readiness-section table tbody tr td .plate-number").eq(0)
        .invoke("text")  
        .then((val) => {
            const cleaned = cleanText(val)
            cy.wrap(cleaned).as("vehicle_plate_number")
        })

    // Take vehicle name for comparison at pop-up message
    cy.get("#vehicle_readiness-section table tbody tr").first().find("td").eq(1).find("p").first()
        .invoke("text")  
        .then((val) => {
            const cleaned = cleanText(val)
            cy.wrap(cleaned).as("vehicle_name")
        })

    // Take Id for comparison at trip page route
    cy.get("#vehicle_readiness-section table tbody tr td a.btn-action-readiness").eq(0)
        .invoke("attr", "data-id")  
        .then((val) => {
            cy.wrap(val).as("vehicle_id") 
        })

    cy.get("#vehicle_readiness-section table tbody tr td a.btn-action-readiness").eq(0).click()
})

Then("I click the {string} button", (title) => {
    cy.get('#action_readiness-modal').should('have.class', 'show').and('be.visible')
        .within(() => {
            cy.get("@vehicle_plate_number").then((vehicle_plate_number) => {
                cy.get("@vehicle_name").then((vehicle_name) => {
                    // Check if pop up contain confirmation message
                    cy.get('p').invoke('text')
                        .then(text => text.replace(/\s+/g, ' ').trim())
                        .should('eq', `What are you want to do with ${vehicle_name} (${vehicle_plate_number})?`)
                    // Check if pop up contain sign button
                    cy.get('a').contains(title).and('be.visible').click()
                })
            })
        })
})

Then("I should be redirected to the add trip page", () => {
    cy.get("@vehicle_id").then((vehicle_id) => {
        cy.url().should("include", `/trip/add?vehicle_id=${vehicle_id}`)
    })
})
