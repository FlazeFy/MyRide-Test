// Components
import { generateAuthToken } from '../../components/generator'
import '../../components/template'

describe('MyRide API Testing - Stats', () => {
    // Template
    const is_paginate = false
    const method = 'get'
    const token = generateAuthToken("hardcode")

    it(method.toUpperCase() + ' - Total Trip By Context', () => {
        const url = 'api/v1/stats/trip/trip_category'
        cy.request({
            method: method,
            url: url,
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).as(method + 'TotalTripByContext')
        cy.get('@' + method + 'TotalTripByContext').then(dt => {
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