const { Given, Then } = require("@badeball/cypress-cucumber-preprocessor")

// E2E Test : E2E-DASH-LSTR-001

Given("I have already signed in to the app", () => {
    const testData = {
        email: "flazen.edu",
        password: "nopass123"
    }
    cy.login(testData.email, testData.password)
})

Then("I should see the section title {string}", (title) => {
    cy.get("#last_trip-section h2").first().should("contain.text", title)
})

Then("I should see the label {string} with the trip location coordinate and name", (label) => {
    cy.get("#last_trip-section .trip-location").first().should("contain.text", label).invoke("text").then(text => {
        // Clean extra space and spit location coordinate and name
        const locationText = text.replace(label, "").replace(":", "").trim().split(" | ")
        const locationCoordinate = locationText[0]
        const locationName = locationText[1]

        // Validate location coordinate and name
        expect(locationCoordinate).to.not.equal("")
        expect(locationName).to.not.equal("")
    })
})

Then("I should see the trip date with format {string}", (format) => {
    cy.get("#last_trip-section #trip-date").invoke("text").then(text => {
        // Validate date format
        if (format === "dd MMM yyyy") {
            const regex = /^\d{2} [A-Za-z]{3} \d{4}$/
            expect(text).to.not.equal("")
            expect(text).to.match(regex)
        }
    })
})

Then("I should see the plate number and driver name", () => {
    cy.get("#last_trip-section .plate-number").first().invoke("text").should("not.be.empty")
    cy.get("#last_trip-section .driver-username").invoke("text").should("not.be.empty")
})

Then("I should see {string} button", (title) => {
    cy.get("#last_trip-section .btn-set-route").invoke("text").then(text => {
        expect(text.trim()).to.equal(title)
    })
})
