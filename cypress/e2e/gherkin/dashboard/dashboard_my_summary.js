const { Given, Then } = require("@badeball/cypress-cucumber-preprocessor")

Given("I already signed in into the app", () => {
    const testData = {
        email: "flazen.edu",
        password: "nopass123"
    }
    cy.login(testData.email, testData.password)
})

Then("I should see the section title {string}", (title) => {
    cy.get("#my_summary-section h2").first().should("contain.text", title)
})

Then("I should see the labels {string}", (labels) => {
    labels.split(",").map(label => label.trim()).forEach(label => {
        cy.get("#my_summary-section .summary-label").contains(label).should("be.visible")
    })
})

Then("the counters should contain numeric values", () => {
    const targets = ["#total_service-holder", "#total_vehicle-holder", "#total_wash-holder", "#total_driver-holder", "#total_trip-holder"]

    targets.forEach(dt => {
        cy.get(dt).invoke("text").then(text => {
            // Test parse int
            const num = Number(text.replace(/[^0-9]/g, ""))
            expect(isNaN(num)).to.be.false
        })
    })
})
