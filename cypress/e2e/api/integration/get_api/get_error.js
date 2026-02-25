// utils
import '../../utils/template'

describe('MyRide Integration Test - Error', () => {
    const is_paginate = true

    it('Get All Error', () => {
        const payload = {
            username : "ricky.cremin",
            password: 'nopass123',
        }

        cy.templateIntegrationLoginAPI(payload.username, payload.password).then(token => {
            cy.request({
                method: 'get',
                url: `/api/v1/error`,
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).as('GetAllError')
            cy.get('@GetAllError').then(dt => {
                cy.templateGet(dt, is_paginate)

                // Get item holder
                const resultItem = dt.body
                expect(resultItem).to.have.property('data')
                const dataArr = resultItem.data.data
                expect(dataArr).to.be.an('array')

                // Get list key / column
                const stringFields = ['message','stack_trace','file','created_at']
                const stringNullableFields = ['faced_by']
                const intFields = ['id','line']

                // Validate column
                cy.templateValidateColumn(dataArr, stringFields, 'string', false)
                cy.templateValidateColumn(dataArr, stringNullableFields, 'string', true)
                cy.templateValidateColumn(dataArr, intFields, 'number', false)

                // Validate character length
                // created_by : username
                const columnProps = [
                    { column_name : 'id', data_type: 'number', max: null, min: 1, nullable: false },
                    { column_name : 'faced_by', data_type: 'string', max: 36, min: 6, nullable: true },
                    { column_name : 'line', data_type: 'number', max: 99999999999, min: 1, nullable: false },
                    { column_name : 'file', data_type: 'string', max: 255, min: 1, nullable: false },
                    { column_name : 'message', data_type: 'string', max: null, min: 1, nullable: false },
                    { column_name : 'stack_trace', data_type: 'string', max: null, min: 1, nullable: false },
                ]
                cy.templateValidateMaxMin(dataArr, columnProps)

                // Validate datetime
                const columnDateTime = [
                    { column_name : 'created_at', date_type: 'datetime', nullable: false },
                ]
                cy.templateValidateDateTime(dataArr, columnDateTime)
            })
        })
    })
})