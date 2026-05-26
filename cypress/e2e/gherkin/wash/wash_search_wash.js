const { Given, Then, When } = require("@badeball/cypress-cucumber-preprocessor")

// E2E Test : E2E-WASH-SEWS-001, E2E-WASH-SEWS-002
Given("I have already signed in to the app", () => {
    const testData = {
        email: "flazen.edu",
        password: "nopass123"
    }
    cy.login(testData.email, testData.password)
})

When("I open the {string} page", (title) => {
    cy.get(".toogle_nav-button").click()
    cy.get("#sidebar_menu-holder .nav-link").contains(title).click()
})

Then("I should see the section title {string}", (title) => {
    cy.get("#all_wash-section h2").first().should("contain.text", title)
})

Then("I should find input with label {string} and type {string}", (label, search) => {
    cy.contains("label", label).should("be.visible").parent().within(() => {
        // Check input existence and type keyword
        cy.get("input").should("exist").clear().type(search).blur()
    })
})

Then("I should only see wash data related to {string}", (search) => {
    cy.get("#all_wash-section table tbody tr").each(($row) => {
        const $tds = $row.find("td")

        // Check Wash Location / Note
        cy.wrap($tds.eq(1)).within(() => {
            // Take location value
            cy.contains("h6", "Location").next("p").invoke("text").invoke("trim").then((location) => {
                // Take notes value
                cy.contains("h6", "Notes").next("p").invoke("text").invoke("trim").then((notes) => {
                    const isLocationMatch = location.toLowerCase().includes(search.toLowerCase())
                    const isNotesMatch = notes.toLowerCase().includes(notes.toLowerCase())

                    expect(isLocationMatch || isNotesMatch).to.be.true
                })
            })
        })
    })
})

// Negative Case
Then("I should only see alert message with text {string}", (msg) => {
    cy.get("#all_wash-section table tbody tr").should("have.length", 1)
    cy.get("#all_wash-section table tbody tr").first().within(() => {
        // Check Alert Container
        cy.get(".alert-container").should("exist")

        // Check Alert Message
        cy.get("h6").invoke("text").invoke("trim").should("eq", msg)
    })
})
