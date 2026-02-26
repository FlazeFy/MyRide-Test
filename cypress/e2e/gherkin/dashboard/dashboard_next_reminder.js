const { Given, Then } = require("@badeball/cypress-cucumber-preprocessor")

const testData = {
    email: "flazen.edu",
    password: "nopass123",
    vehicle_plate_number: "B 1234 ABC"
}

Given("I have already signed in to the app", () => {
    cy.login(testData.email, testData.password)
})

Then("I should see the section title {string}", (title) => {
    cy.get("#next_reminder-section h2").first().should("contain.text", title)
})

Then("I should see the label {string} or a date in {string} format", (label, format) => {
    cy.get("#next_reminder-section h4").first().invoke("text").then(text => {
        if (format === "dd MMM YYYY") {
            const dateRegex = /^\d{2} [A-Za-z]{3} \d{4}$/

            const isTomorrow = text === label
            const isDate = dateRegex.test(text)

            expect(isTomorrow || isDate).to.be.true
        }
    })
})

Then("I should see the reminder time in {string} format", (format) => {
    cy.get("#next_reminder-section .chip").first().invoke("text").then(text => {
        // Validate date format
        if (format === "hh:mm A") {
            const regex = /^(0[1-9]|1[0-2]):[0-5][0-9] (AM|PM)$/
            expect(text).to.not.equal("")
            expect(text).to.match(regex)
        }
    })
})

Then("I should see my attached vehicle's plate number in the reminder", () => {
    cy.get("#next_reminder-section a.plate-number").first().should("contain.text", testData.vehicle_plate_number)
})

Then("I should see the label {string} with a value", (label) => {
    cy.get("#next_reminder-section p").first().should("contain.text", label).parent().invoke("text").then(text => {
        const cleanText = text.replace("Notes:","").trim()
        expect(cleanText).to.not.equal("")
    })
})
