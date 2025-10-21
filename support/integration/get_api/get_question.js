// utils
import '../../utils/template'

describe('MyRide Integration Test - Question', () => {
    const is_paginate = false

    it('Get Showing FAQ', () => {
        const payload = {
            username : "ricky.cremin",
            password: 'nopass123',
        }

        cy.templateIntegrationLoginAPI(payload.username, payload.password).then(token => {
            cy.request({
                method: 'get',
                url: `/api/v1/question/faq`,
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).as('GetShowingFAQ')
            cy.get('@GetShowingFAQ').then(dt => {
                cy.templateGet(dt, is_paginate)

                // Get item holder
                const resultItem = dt.body
                expect(resultItem).to.have.property('data')
                const dataArr = resultItem.data
                expect(dataArr).to.be.an('array')

                // Get list key / column
                const stringFields = ['faq_question','faq_answer']

                // Validate column
                cy.templateValidateColumn(dataArr, stringFields, 'string', false)

                // Validate character length
                // In the DB, answer can be null, but for this specific API only get the answered question
                const columnProps = [
                    { column_name : 'faq_question', data_type: 'string', max: 144, min: 1, nullable: false },
                    { column_name : 'faq_answer', data_type: 'string', max: 255, min: 1, nullable: false },
                ]
                cy.templateValidateMaxMin(dataArr, columnProps)
            })
        })
    })
})