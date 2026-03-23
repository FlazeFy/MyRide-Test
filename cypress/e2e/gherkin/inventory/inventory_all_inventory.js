const { Given, Then } = require("@badeball/cypress-cucumber-preprocessor")

// E2E Test : E2E-INVT-ALIN-001

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
    cy.get("#all_inventory-section h2").first().should("contain.text", title)
})

Then("I should see the table headers with labels {string}", (labels) => {
    labels.split(",").map(label => label.trim()).forEach(label => {
        cy.get("#all_inventory-section table thead tr th").contains(label).should("be.visible")
    })
})

Then("I should see vehicle plate number, vehicle type, inventory name, qty, inventory info, properties, and action button", () => {
    cy.get("#all_inventory-section table tbody tr").each(($row) => {
        const $tds = $row.find("td")

        // Check Username and fullname
        cy.wrap($tds.eq(0)).within(() => {
            cy.get(".plate-number").invoke("text").should("not.be.empty")
            cy.get("p").eq(0).invoke("text").should("not.be.empty")
        })

        // Check Inventory Name
        cy.wrap($tds.eq(1)).invoke("text").invoke("trim").and("not.be.empty")

        // Check Qty
        cy.wrap($tds.eq(2)).invoke("text").invoke("trim").should("match", /^\d+$/)

        // Check Inventory Info
        cy.wrap($tds.eq(3)).within(() => {
            // Check Inventory Category
            cy.get(".inventory-category").within(() => {
                cy.get("h6").invoke("text").should("eq", "Category")
                cy.get("p").invoke("text").should("not.be.empty")
            })

            // Check Inventory Storage
            cy.get(".inventory-storage").within(() => {
                cy.get("h6").invoke("text").should("eq", "Storage")
                cy.get("p").invoke("text").should("not.be.empty")
            })
        })

        // Check Inventory Properties
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
        })
        
        // Check Action Button
        cy.wrap($tds.eq(5)).within(() => {
            cy.get("a.btn-delete").should("exist").and("have.attr", "data-url").and("not.be.empty")

            cy.root().then(($root) => {
                const btnImage = $root.find("a.btn-image")
        
                if (btnImage.length) {
                    cy.wrap(btnImage).within(() => {
                        cy.get(btnImage).should("exist").and("have.attr", "data-bs-toggle", "modal")
                        cy.get(btnImage).should("have.attr", "data-bs-target").and("match", /^#.+$/)
                    })
                }
            })

            const attrsUpdate = ["data-vehicle-plate-number","data-id","data-inventory-name","data-inventory-qty","data-inventory-category","data-inventory-storage"]
            attrsUpdate.forEach(attr => {
                cy.get("a.btn-update").should("exist").should("have.attr", attr).and("not.be.empty")
            })
        })
    })
})

Then("I should be able to navigate the table content", () => {
    cy.checkPagination('inventory-holder')
})
