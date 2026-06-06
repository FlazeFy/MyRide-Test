const { Given, Then } = require("@badeball/cypress-cucumber-preprocessor")
import rules from '../../resources/rules/rules.json'

// E2E Test : E2E-DASH-NSRV-001

const testData = {
    email: "flazen.edu",
    password: "nopass123",
    vehicle_plate_number: "B 1234 ABC"
}

Given("I have already signed in to the app", () => {
    cy.login(testData.email, testData.password)
})

Then("I should see the section title {string}", (title) => {
    cy.get("#next_service-section h2").first().should("contain.text", title)
})

Then("I should see the label {string} or a date in {string} format", (label, format) => {
    cy.get("#next_service-section h4").first().invoke("text").then(text => {
        if (format === "dd MMM YYYY") {
            const dateRegex = /^\d{2} [A-Za-z]{3} \d{4}$/

            const isTomorrow = text === label
            const isDate = dateRegex.test(text)

            expect(isTomorrow || isDate).to.be.true
        }
    })
})

Then("I should see the service time in {string} format", (format) => {
    cy.get("#next_service-section .chip").first().invoke("text").then(text => {
        // Validate date format
        if (format === "hh:mm A") {
            const regex = /^(0[1-9]|1[0-2]):[0-5][0-9] (AM|PM)$/
            expect(text).to.not.equal("")
            expect(text).to.match(regex)
        }
    })
})

Then("I should see the vehicle's plate number and service category", () => {
    // Validate plate number
    cy.get("#next_service-section .plate-number").first().should("contain.text", testData.vehicle_plate_number)

    // Validate service category
    cy.get("#next_service-section .service-category").first().then(($el) => {
        const text = $el.text().trim()
        expect(rules.service_category_rules).to.include(text)
    })
})

Then("I should see the label {string} and {string} with a value", (noteLabel, locationLabel) => {
    const validateLabel = (target, holder, label) => {
        cy.get(`#next_service-section p${holder}`).first().should("contain.text", target).parent().invoke("text").then(text => {
            const cleanText = text.replace(label,"").trim()
            expect(cleanText).to.not.equal("")
        })
    }
    // Validate service note and service location
    validateLabel(noteLabel, '.service-note', "Notes:")
    validateLabel(locationLabel, '.service-location', "Location:")
})
