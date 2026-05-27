const { Given, Then } = require("@badeball/cypress-cucumber-preprocessor")

// E2E Test : E2E-HSTR-ALHS-001

Given("I have already signed in to the app", () => {
    const testData = {
        email: "flazen.edu",
        password: "nopass123"
    }
    cy.login(testData.email, testData.password)
})

Then("I open the {string} page", (title) => {
    cy.openPageViaSideBar(title)
})

Then("I should see the section title {string}", (title) => {
    cy.get("#all_history-section h2").first().should("contain.text", title)
})

Then("I should see the history item that contains history context, history type, created date, and delete button", (labels) => {
    cy.get("#history-holder .container-fluid").each(row => {
        // Check History Type
        cy.wrap(row).find(".chip").invoke("text").invoke("trim").should("not.be.empty")
        
        // Check History Context
        cy.wrap(row).find("h6").invoke("text").invoke("trim").should("not.be.empty")
        
        // Check Created Date
        cy.wrap(row).find("p.date-text").invoke("text").invoke("trim").then(text => {
            expect(text).to.match(/^Created At : \d{4}-\d{2}-\d{2} \d{2}:\d{2}$/)
        })

        // Check Delete Button
        cy.wrap(row).within(() => {
            cy.get(".btn-delete").should("exist").and("have.attr", "data-url").and("match", /^\/api\/v1\/history\/destroy\/[0-9a-fA-F-]{36}$/)
        })
    })
})

Then("I should be able to navigate the list content", () => {
    cy.checkPagination('history-holder')
})
