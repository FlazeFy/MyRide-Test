const { Given, Then } = require("@badeball/cypress-cucumber-preprocessor")

// E2E Test : E2E-FUEL-ALFL-001

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
    cy.get("#all_fuel-section h2").first().should("contain.text", title)
})

Then("I should see the table headers with labels {string}", (labels) => {
    labels.split(",").map(label => label.trim()).forEach(label => {
        cy.get("#all_fuel-section table thead tr th").contains(label).should("be.visible")
    })
})

Then("I should see plate number, vehicle type, status, fuel info, fuel at, and action button", () => {
    cy.get("#all_fuel-section table tbody tr").each(($row) => {
        const $tds = $row.find("td")

        // Check Plate Number & Vehicle Type
        cy.wrap($tds.eq(0)).within(() => {
            cy.get(".plate-number").invoke("text").should("not.be.empty")
            cy.get("p").eq(0).invoke("text").should("not.be.empty")
        })

        // Check Vehicle Status
        cy.wrap($tds.eq(1)).within(() => {
            // Check fuel volume
            cy.get(".fuel-volume").within(() => {
                cy.get("h6").invoke("text").should("eq", "Volume")
                cy.get("p").invoke("text").should("match", /^\d+\s*L$/)
            })

            // Check fuel price
            cy.get(".fuel-price").within(() => {
                cy.get("h6").invoke("text").should("eq", "Price Total")
                cy.get("p").invoke("text").should("match", /^Rp\.\s?[\d.,]+$/)
            })
        })

        // Check Fuel Status 
        cy.wrap($tds.eq(2)).within(() => {
            const fuelTypes = {
                Pertamina: ['Pertalite', 'Pertamax', 'Pertamax Turbo', 'Dexlite', 'Dex'],
                Vivo: ['Revvo 89', 'Revvo 92', 'Revvo 95'],
                BP: ['BP 90', 'BP 92', 'BP Ultimate'],
                Shell: ['Super', 'V-Power', 'Diesel'],
                Electric: []
            }
        
            // Check Brand
            cy.get(".fuel-brand").within(() => {
                cy.get("h6").invoke("text").should("eq", "Brand")
            })

            cy.get(".fuel-brand p").invoke("text").then((brandText) => {
                const brand = brandText.trim()
                expect(['Pertamina','Vivo','BP','Shell','Electric']).to.include(brand)

                if (brand !== "Electric") {
                    // Check RON
                    cy.get(".fuel-ron").within(() => {
                        cy.get("h6").invoke("text").should("eq", "RON")
                        cy.get("p").invoke("text").should("match", /^\d+$/)
                    })

                    // Check Type
                    cy.get(".fuel-type").within(() => {
                        cy.get("h6").invoke("text").should("eq", "Type")

                        cy.get("p").invoke("text").then((typeText) => {
                            const type = typeText.trim()
                            expect(fuelTypes[brand]).to.include(type)
                        })
                    })
                } else {
                    // Electric should not have RON and Type
                    cy.get(".fuel-ron").should("not.exist")
                    cy.get(".fuel-type").should("not.exist")
                }
            })
        })

        // Check Capacity
        cy.wrap($tds.eq(3)).invoke("text").invoke("trim").should("match", /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}$/)
        
        // Check Action Button
        cy.wrap($tds.eq(4)).within(() => {
            cy.get("a.btn-evidence").should("exist").and("have.attr", "data-bs-toggle", "modal")
            cy.get("a.btn-evidence").should("have.attr", "data-bs-target").and("match", /^#.+$/)
            cy.get("a.btn-delete").should("exist").and("have.attr", "data-url").and("not.be.empty")

            const attrs = ["data-vehicle-plate-number","data-id","data-fuel-type","data-fuel-brand","data-fuel-volume","data-fuel-price-total","data-fuel-ron","data-fuel-at"]
            attrs.forEach(attr => {
                cy.get("a.btn-update").should("exist").should("have.attr", attr).and("not.be.empty")
            })
        })
    })
})

Then("I should be able to navigate the table content", () => {
    cy.checkPagination('fuel-holder')
})
