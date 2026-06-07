// Basic Auth
Cypress.Commands.add("login", (email, password) => {
    cy.visit("/login")
    // Fill the login form
    cy.get("#username").clear().type(email)
    cy.get("#password").clear().type(password)
    cy.get("#form-login a.btn-success").click()
    // Post condition
    cy.url().should("include", "/dashboard")
})

// Navigation
Cypress.Commands.add("openPageViaSideBar", (target) => {
    cy.get(".toogle_nav-button").click()
    cy.get(".sidebar").scrollTo("bottom")
    cy.get(".sidebar .nav-link").contains(target).click()
})

// Custom Pagination
Cypress.Commands.add("checkPagination", (target) => {
    cy.get(`#pagination-${target}`).should('be.visible').find('.btn-page').each(($btn) => {
        // Check data-page attr
        cy.wrap($btn).should('have.attr', 'data-page').and('match', /^\d+$/)
        // Check title
        cy.wrap($btn).should('have.attr', 'title').and('match', /^Open page:/)
    })
})

Cypress.Commands.add("checkMonthlyLineChart", (holderId) => {
    const validMonths = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    
    // Make sure series represent all month name
    cy.get(holderId).within(() => {
        cy.get(".apexcharts-xaxis-texts-g .apexcharts-xaxis-label tspan").each(el => {
            const label = el.text().trim()
            expect(validMonths).to.include(label)
        })
    })
})

Cypress.Commands.add("checkLineChartValidValues", (holderId) => {
    // Check data (value) label
    cy.get(holderId).within(() => {
        cy.get(".apexcharts-datalabel").each(el => {
            const val = Number(el.text().trim())
            expect(val).to.be.at.least(0)
        })
    })
})

// Apexchart Element
Cypress.Commands.add("checkPieChart", (holderId) => {
    cy.get(holderId).within(() => {
        // Check apexchart pie chart existence
        cy.get("g.apexcharts-pie").should("exist").and("be.visible")
    })
})

Cypress.Commands.add("checkPieChartLegend", (holderId) => {
    cy.get(holderId).within(() => {
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

// Others
Cypress.Commands.add("clearAll", () => {
    // Clear local, session storage, and cookie
    cy.clearAllLocalStorage()
    cy.clearAllCookies()
    cy.clearAllSessionStorage()
})