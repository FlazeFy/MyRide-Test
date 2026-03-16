const { Given, Then } = require("@badeball/cypress-cucumber-preprocessor")

// E2E Test : E2E-DASH-VHRN-001

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

Then("I should see the table headers with labels {string}", (labels) => {
    labels.split(",").map(label => label.trim()).forEach(label => {
        cy.get("#vehicle_readiness-section table thead tr th").contains(label).should("be.visible")
    })
})

Then("I should see plate number, vehicle type & name, status, fuel, capacity, and action button", () => {
    cy.get("#vehicle_readiness-section table tbody tr").each(($row) => {
        const $tds = $row.find("td")

        // Check Plate Number
        cy.wrap($tds.eq(0)).find(".plate-number").invoke("text").should("not.be.empty")

        // Check Vehicle Name & Type
        cy.wrap($tds.eq(1)).within(() => {
            cy.get("p").eq(0).invoke("text").should("not.be.empty")
            cy.get("p.text-secondary").invoke("text").should("not.be.empty")
        })

        // Check Vehicle Status
        cy.wrap($tds.eq(2)).find(".chip").invoke("text").should("not.be.empty").and("match", /Available|Reserved|/)

        // Check Fuel Status 
        cy.wrap($tds.eq(3)).find(".chip").invoke("text").should("not.be.empty").and("match", /Full|High|Normal|/)

        // Check Capacity
        cy.wrap($tds.eq(4)).invoke("text").invoke("trim").should("not.be.empty").and("match", /\d+/)

        // Check Action Button
        cy.wrap($tds.eq(5)).find("a.btn-action-readiness").should("exist").and("have.attr", "data-id").and("not.be.empty")
    })
})

Then("I should be able to navigate the table content", () => {
    cy.checkPagination('vehicle_readiness-holder')
})
