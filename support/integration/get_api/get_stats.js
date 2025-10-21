// utils
import '../../utils/template'

describe('MyRide API Testing - Stats', () => {
    // Template
    const is_paginate = false
    const method = 'get'

    it(method.toUpperCase() + ' - Total Trip By Context (Single)', () => {
        const payload = {
            username : "ricky.cremin",
            password: 'nopass123',
        }

        cy.templateIntegrationLoginAPI(payload.username, payload.password).then(token => {
            const context = 'trip_category'
            cy.request({
                method: method,
                url: `api/v1/stats/total/trip/${context}`,
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).as(method + 'TotalTripByContextSingle')
            cy.get('@' + method + 'TotalTripByContextSingle').then(dt => {
                cy.templateGet(dt, is_paginate)

                // Get item holder
                const resultItem = dt.body
                expect(resultItem).to.have.property('data')
                const dataArr = resultItem.data
                expect(dataArr).to.be.an('array')

                // Get list key / column
                const stringFields = ['context']
                const intFields = ['total']

                // Validate column
                cy.templateValidateColumn(dataArr, stringFields, 'string', false)
                cy.templateValidateColumn(dataArr, intFields, 'number', false)
            })
        })
    })

    it(method.toUpperCase() + ' - Total Trip By Context (Multiple)', () => {
        const payload = {
            username : "ricky.cremin",
            password: 'nopass123',
        }

        cy.templateIntegrationLoginAPI(payload.username, payload.password).then(token => {
            const context = 'trip_category,trip_destination_name'
            cy.request({
                method: method,
                url: `api/v1/stats/total/trip/${context}`,
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).as(method + 'TotalTripByContextMultiple')
            cy.get('@' + method + 'TotalTripByContextMultiple').then(dt => {
                cy.templateGet(dt, is_paginate)

                // Get item holder
                const resultItem = dt.body
                expect(resultItem).to.have.property('data')
                const dataArr = resultItem.data
                expect(dataArr).to.be.an('array')

                // Get list key / column
                const stringFieldsContext = ['context']
                const arrayFieldsContext = ['data']

                // Validate column
                cy.templateValidateColumn(dataArr, stringFieldsContext, 'string', false)
                cy.templateValidateColumn(dataArr, arrayFieldsContext, 'array', false)
                
                dataArr.forEach(el => {
                    // Get list key / column
                    const stringFieldsData = ['context']
                    const intFieldsData = ['total']
    
                    // Validate column
                    cy.templateValidateColumn(el.data, stringFieldsData, 'string', false)
                    cy.templateValidateColumn(el.data, intFieldsData, 'number', false)
                });
            })
        })
    })

    it(method.toUpperCase() + ' - Total Inventory By Context (Single)', () => {
        const payload = {
            username : "ricky.cremin",
            password: 'nopass123',
        }

        cy.templateIntegrationLoginAPI(payload.username, payload.password).then(token => {
            const context = 'inventory_category'
            cy.request({
                method: method,
                url: `api/v1/stats/total/inventory/${context}`,
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).as(method + 'TotalInventoryByContextSingle')
            cy.get('@' + method + 'TotalInventoryByContextSingle').then(dt => {
                cy.templateGet(dt, is_paginate)

                // Get item holder
                const resultItem = dt.body
                expect(resultItem).to.have.property('data')
                const dataArr = resultItem.data
                expect(dataArr).to.be.an('array')

                // Get list key / column
                const stringFields = ['context']
                const intFields = ['total']

                // Validate column
                cy.templateValidateColumn(dataArr, stringFields, 'string', false)
                cy.templateValidateColumn(dataArr, intFields, 'number', false)
            })
        })
    })

    it(method.toUpperCase() + ' - Total Inventory By Context (Multiple)', () => {
        const payload = {
            username : "ricky.cremin",
            password: 'nopass123',
        }

        cy.templateIntegrationLoginAPI(payload.username, payload.password).then(token => {
            const context = 'inventory_category,inventory_storage'
            cy.request({
                method: method,
                url: `api/v1/stats/total/inventory/${context}`,
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).as(method + 'TotalInventoryByContextMultiple')
            cy.get('@' + method + 'TotalInventoryByContextMultiple').then(dt => {
                cy.templateGet(dt, is_paginate)

                // Get item holder
                const resultItem = dt.body
                expect(resultItem).to.have.property('data')
                const dataArr = resultItem.data
                expect(dataArr).to.be.an('array')

                // Get list key / column
                const stringFieldsContext = ['context']
                const arrayFieldsContext = ['data']

                // Validate column
                cy.templateValidateColumn(dataArr, stringFieldsContext, 'string', false)
                cy.templateValidateColumn(dataArr, arrayFieldsContext, 'array', false)
                
                dataArr.forEach(el => {
                    // Get list key / column
                    const stringFieldsData = ['context']
                    const intFieldsData = ['total']
    
                    // Validate column
                    cy.templateValidateColumn(el.data, stringFieldsData, 'string', false)
                    cy.templateValidateColumn(el.data, intFieldsData, 'number', false)
                });
            })
        })
    })
})