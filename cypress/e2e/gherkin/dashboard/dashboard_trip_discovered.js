const { Given, Then } = require("@badeball/cypress-cucumber-preprocessor")

Given("I have already signed in to the app", () => {
    const testData = {
        email: "flazen.edu",
        password: "nopass123"
    }
    cy.login(testData.email, testData.password)
})

Then("I should see the section title {string}", (title) => {
    cy.get("#trip_discovered-section h2").first().should("contain.text", title)
})

Then("I should see the label {string} with a value in {string} date format", (label, format) => {
    cy.get("#trip_discovered-section p").contains(label).should("be.visible").parent().invoke("text").then(text => {
        // Clean extra space and symbol
        const dateText = text.replace(label, "").replace(":", "").trim()

        // Validate date format
        if (format === "dd MMM YYYY") {
            const regex = /^\d{2} [A-Za-z]{3} \d{4}$/
            expect(dateText).to.not.equal("")
            expect(dateText).to.match(regex)
        }
    })
})

Then("I should see the label {string} with a numeric value", (title) => {
    cy.get("#trip_discovered-section h4").first().should("contain.text", title).invoke("text").then(text => {
        // Clean extra space
        const total = text.replace(" Text","")

        // Test parse int
        expect(total).to.not.equal("")
        const num = Number(text.replace(/[^0-9]/g, ""))
        expect(isNaN(num)).to.be.false
    })
})

Then("I should see the total trip distance with a numeric value followed by {string}", (unit) => {
    cy.get("#trip_discovered-section h4").eq(1).should("contain.text", unit).invoke("text").then(text => {
        // Clean extra space
        const total = text.replace(` ${unit}`,"")

        // Test parse int
        expect(total).to.not.equal("")
        const num = Number(text.replace(/[^0-9]/g, ""))
        expect(isNaN(num)).to.be.false
    })
})
