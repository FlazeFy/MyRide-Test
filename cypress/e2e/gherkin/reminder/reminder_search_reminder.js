const { Given, Then, When } = require("@badeball/cypress-cucumber-preprocessor")

// E2E Test : E2E-RMND-SERM-001, E2E-RMND-SERM-002
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
    cy.get("#all_reminder-section h2").first().should("contain.text", title)
})

Then("I should find input with label {string} and type {string}", (label, search) => {
    cy.contains("label", label).should("be.visible").parent().within(() => {
        // Check input existence and type keyword
        cy.get("input").should("exist").clear().type(search).blur()
    })
})

Then("I should only see reminder data related to {string}", (search) => {
    cy.get("#all_reminder-section table tbody tr").each(($row) => {
        const $tds = $row.find("td")

        // Check Title
        cy.wrap($tds.eq(1)).invoke("text").invoke("trim").then((title) => {
            // Check Body
            cy.wrap($tds.eq(2)).then(($td) => {
                const textBody = $td.clone().find("span.chip").remove().end().text().trim()
                const isTextBodyMatch = textBody.toLowerCase().includes(search.toLowerCase())
                const isTitleMatch = title.toLowerCase().includes(search.toLowerCase())

                expect(isTitleMatch || isTextBodyMatch).to.be.true
            })
        })
    })
})

// Negative Case
Then("I should only see alert message with text {string}", (msg) => {
    cy.get("#all_reminder-section table tbody tr").should("have.length", 1)
    cy.get("#all_reminder-section table tbody tr").first().within(() => {
        // Check Alert Container
        cy.get(".alert-container").should("exist")

        // Check Alert Message
        cy.get("h6").invoke("text").invoke("trim").should("eq", msg)
    })
})
