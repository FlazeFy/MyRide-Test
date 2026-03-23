const { Given, Then } = require("@badeball/cypress-cucumber-preprocessor")

// E2E Test : E2E-DRVR-ALDR-001

Given("I have already signed in to the app", () => {
    const testData = {
        email: "flazen.edu",
        password: "nopass123"
    }
    cy.login(testData.email, testData.password)
})

Then("I open the {string} page", (title) => {
    cy.get(".toogle_nav-button").click()
    cy.get("#sidebar_menu-holder .nav-link").contains(title).click()
})

Then("I should see the section title {string}", (title) => {
    cy.get("#all_driver-section h2").first().should("contain.text", title)
})

Then("I should see the table headers with labels {string}", (labels) => {
    labels.split(",").map(label => label.trim()).forEach(label => {
        cy.get("#all_driver-section table thead tr th").contains(label).should("be.visible")
    })
})

Then("I should see driver info, notes, total trip, properties, and action button", () => {
    cy.get("#all_driver-section table tbody tr").each(($row) => {
        const $tds = $row.find("td")

        // Check Username and fullname
        cy.wrap($tds.eq(0)).within(() => {
            cy.get(".plate-number.username").invoke("text").should("not.be.empty")
            cy.get(".fullname").invoke("text").should("not.be.empty")
        })

        // Check Driver Contact
        cy.wrap($tds.eq(1)).within(() => {
            // Check email
            cy.get(".email").within(() => {
                cy.get("h6").invoke("text").should("eq", "Email")
                cy.get("p").invoke("text").should("not.be.empty")
            })

            // Check phone number
            cy.get(".phone-number").within(() => {
                cy.get("h6").invoke("text").should("eq", "Phone Number")
                cy.get("p").invoke("text").should("not.be.empty")
            })
        })

        // Check Notes
        cy.wrap($tds.eq(2)).invoke("text").invoke("trim").and("not.be.empty")

        // Check Total Trip
        cy.wrap($tds.eq(3)).invoke("text").invoke("trim").should("match", /^\d+$/)

        // Check Driver Properties
        cy.wrap($tds.eq(4)).within(() => {
            // Check created at
            cy.get(".created-at").within(() => {
                cy.get("h6").invoke("text").should("eq", "Created At")
                cy.get("p").invoke("text").should("match", /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}$/)
            })

            // Check updated at
            if (Cypress.$(".updated-at").length) {
                cy.get(".updated-at").within(() => {
                    cy.get("h6").invoke("text").should("eq", "Updated At")
                    cy.get("p").invoke("text").should("match", /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}$/)
                })
            }
        })
        
        // Check Action Button
        cy.wrap($tds.eq(5)).within(() => {
            cy.get("a.btn-delete").should("exist").and("have.attr", "data-url").and("not.be.empty")

            const attrsUpdate = ["data-username","data-id","data-fullname","data-email","data-notes","data-phone"]
            attrsUpdate.forEach(attr => {
                cy.get("a.btn-update").should("exist").should("have.attr", attr).and("not.be.empty")
            })

            const attrsHistoryTrip = ["data-username","data-id"]
            attrsHistoryTrip.forEach(attr => {
                cy.get("a.btn-history-trip").should("exist").should("have.attr", attr).and("not.be.empty")
            })
        })
    })
})

Then("I should be able to navigate the table content", () => {
    cy.checkPagination('driver-holder')
})
