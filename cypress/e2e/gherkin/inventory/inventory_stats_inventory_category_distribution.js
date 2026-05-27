const { Given, Then } = require("@badeball/cypress-cucumber-preprocessor")

// E2E Test : E2E-INVT-SICD-001

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
    cy.get("#inventory_category-holder").prevAll("h2").first().should("contain.text", title)
})

Then("I should see the pie chart", () => {
    cy.get("#inventory_category-holder").within(() => {
        // Check apexchart pie chart existence
        cy.get("g.apexcharts-pie").should("exist").and("be.visible")
    })
})

Then("I should see chart labels for each series", () => {
    cy.get("#inventory_category-holder").within(() => {
        // Take all series label
        cy.get(".apexcharts-slices .apexcharts-series.apexcharts-pie-series").then(series => {
            const pieChartSeriesNames = [...series].map(dt => dt.getAttribute("seriesName"))

            // Take all legend name
            cy.get(".apexcharts-legend .apexcharts-legend-series").then(legends => {
                const legendSeriesNames = [...legends].map(dt => dt.getAttribute("seriesName"))
                
                // Check every pie series exist in legend
                pieChartSeriesNames.forEach(dt => expect(legendSeriesNames).to.include(dt))
            })
        })
    })
})
