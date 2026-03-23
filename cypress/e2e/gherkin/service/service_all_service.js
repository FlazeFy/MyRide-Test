const { Given, Then } = require("@badeball/cypress-cucumber-preprocessor")

// E2E Test : E2E-SRVC-ALSV-001

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
    cy.get("#all_service-section h2").first().should("contain.text", title)
})

Then("I should see the table headers with labels {string}", (labels) => {
    labels.split(",").map(label => label.trim()).forEach(label => {
        cy.get("#all_service-section table thead tr th").contains(label).should("be.visible")
    })
})

Then("I should see plate number, vehicle type, service category, service info, notes, properties, and action button", () => {
    cy.get("#all_service-section table tbody tr").each(($row) => {
        const $tds = $row.find("td")

        // Check Plate Number & Vehicle Type
        cy.wrap($tds.eq(0)).within(() => {
            cy.get(".plate-number").invoke("text").should("not.be.empty")
            cy.get("p").eq(0).invoke("text").should("not.be.empty")
        })

        // Check Service Category
        cy.wrap($tds.eq(1)).invoke("text").invoke("trim").and("not.be.empty").then(text => 
            expect(['Routine','Repair','Inspection','Emergency']).to.include(text)
        )

        // Check Service Info
        cy.wrap($tds.eq(2)).within(() => {
            // Check fuel volume
            cy.get(".service-location").within(() => {
                cy.get("h6").invoke("text").should("eq", "Location")
                cy.get("p").invoke("text").should("not.be.empty")
            })

            // Check fuel price
            cy.get(".service-price").within(() => {
                cy.get("h6").invoke("text").should("eq", "Price Total")
                cy.get("p").invoke("text").should("match", /^Rp\.\s?[\d.,]+$/)
            })
        })

        // Check Notes
        cy.wrap($tds.eq(3)).invoke("text").invoke("trim").and("not.be.empty")

        // Check Service Properties
        cy.wrap($tds.eq(4)).within(() => {
            // Check created at
            cy.get(".created-at").within(() => {
                cy.get("h6").invoke("text").should("eq", "Created At")
                cy.get("p").invoke("text").should("match", /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}$/)
            })

            // Check updated at
            cy.root().then(($root) => {
                const updatedAt = $root.find(".updated-at")
        
                if (updatedAt.length) {
                    cy.wrap(updatedAt).within(() => {
                        cy.get("h6").should("have.text", "Updated At")
                        cy.get("p").invoke("text").should("match", /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}$/)
                    })
                }
            })

            // Check remind at
            cy.root().then(($root) => {
                const remindAt = $root.find(".remind-at")
        
                if (remindAt.length) {
                    cy.wrap(remindAt).within(() => {
                        cy.get("h6").should("have.text", "Remind At")
                        cy.get("p").invoke("text").should("match", /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}$/)
                    })
                }
            })
        })
        
        // Check Action Button
        cy.wrap($tds.eq(5)).within(() => {
            cy.get("a.btn-delete").should("exist").and("have.attr", "data-url").and("not.be.empty")

            const attrs = ["data-vehicle-plate-number","data-id","data-remind-at","data-service-category","data-service-price-total","data-service-note","data-service-location"]
            attrs.forEach(attr => {
                cy.get("a.btn-update").should("exist").should("have.attr", attr).and("not.be.empty")
            })
        })
    })
})

Then("I should be able to navigate the table content", () => {
    cy.checkPagination('service-holder')
})
