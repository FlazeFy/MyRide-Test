import '../../../../support/template'

describe('Integration Test - Question - Get : Showing FAQ', () => {
    const method = 'get'
    const url = '/api/v1/question/faq'

    it('TC-INT-QS-001 : User Can See FAQ With Valid Data', () => {
        cy.request({
            method,
            url: url,
        }).as('UserCanSeeFAQWithValidData')
        cy.get('@UserCanSeeFAQWithValidData').then(dt => {
            cy.templateGet(200,dt, null)
            expect(dt.body.message).contain('faq fetched')
            
            // Get Item Holder
            const res = dt.body
            expect(res).to.have.property('data')
            const data = res.data
            expect(data).to.be.an('array')

            // Get List Key / Column
            const stringFields = ['faq_question','faq_answer']

            // Validate Column
            cy.templateValidateColumn(data, stringFields, 'string', false)
        })
    })

    it('TC-INT-QS-002 : User Cant See FAQ With Empty Data', () => {
        cy.request({
            method,
            url: url,
            failOnStatusCode: false,
        }).as('UserCantSeeFAQWithEmptyData')
        cy.get('@UserCantSeeFAQWithEmptyData').then(dt => {
            cy.templateGet(404,dt, null)
            expect(dt.body.message).contain('faq not found')
            
            // Get Item Holder
            const res = dt.body
            expect(res).to.not.have.property('data')
        })
    })
})