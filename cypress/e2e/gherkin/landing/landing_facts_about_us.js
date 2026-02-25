const { Given, Then } = require("@badeball/cypress-cucumber-preprocessor")

Given("I open the landing page", () => {
    cy.visit("/")
})

Then("I should see the section title {string}", (title) => {
    cy.get("#fact_about_us-section h2").first().should("contain.text", title)
})

Then("I should see the labels {string}", (labels) => {
    labels.split(",").map(label => label.trim()).forEach(label => {
        cy.get("#fact_about_us-section h5").contains(label).should("be.visible")
    })
})

Then("the counters should contain numeric values", () => {
    const targets = ["#total_user", "#total_vehicle", "#total_trip", "#total_wash", "#total_service", "#total_driver"]

    targets.forEach(dt => {
        cy.get(dt).invoke("text").then(text => {
            // Test parse int
            const num = Number(text.replace(/[^0-9]/g, ""))
            expect(isNaN(num)).to.be.false
        })
    })
})
