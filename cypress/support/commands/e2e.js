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

// Swal Dialog
Cypress.Commands.add("checkSwalDialog", (resultType, message) => {
    // Check swal2 container exist
    cy.get(".swal2-container").should("exist").and("be.visible")

    // Check swal title 
    cy.get(".swal2-title").should("be.visible").invoke("text").then((text) => {
        expect(text.toLowerCase()).to.include(resultType.toLowerCase())
    })

    // Check swal message
    cy.get(".swal2-html-container").should("be.visible").invoke("text").then((text) => {
        expect(text.toLowerCase()).to.include(message.toLowerCase())
    })
})

// Export File
Cypress.Commands.add("checkExportedData", (username, fileType, expectedColumns = []) => {
    const normalizedUsername = username.toLowerCase()

    // Config download folder
    const downloadsFolder = Cypress.config("downloadsFolder")

    // Check downloaded file exists in folder
    cy.task("getDownloadedFiles", downloadsFolder).then((files) => {
        // Find file that matches username + fileType
        const matchedFile = files.find(file => {
            const fileLower = file.toLowerCase()

            return (
                fileLower.includes(normalizedUsername) &&
                fileLower.endsWith(fileType)
            )
        })

        expect(matchedFile, "downloaded file").to.exist
        expect(matchedFile.toLowerCase()).to.include(normalizedUsername)
        expect(matchedFile.endsWith(fileType)).to.be.true

        const filePath = `${downloadsFolder}/${matchedFile}`

        // XLSX validation
        if (fileType.includes("xlsx") && expectedColumns.length > 0) {
            const XLSX = require("xlsx")

            cy.readFile(filePath, "binary").then((file) => {
                const workbook = XLSX.read(file, { type: "binary" })

                // First sheet
                const sheetName = workbook.SheetNames[0]
                const sheet = workbook.Sheets[sheetName]

                // Convert to array (first row = header)
                const data = XLSX.utils.sheet_to_json(sheet, { header: 1 })
                const headers = data[0]

                // Validate expected columns
                expectedColumns.forEach(dt => expect(headers).to.include(dt))

                // Clean up
                cy.task("deleteFile", filePath)
            })
        } else {
            // Clean up
            cy.task("deleteFile", filePath)
        }
    })
})

// Apexchart Element - Pie Chart
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


// Apexchart Element - Line Chart
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

// Others
Cypress.Commands.add("clearAll", () => {
    // Clear local, session storage, and cookie
    cy.clearAllLocalStorage()
    cy.clearAllCookies()
    cy.clearAllSessionStorage()
})