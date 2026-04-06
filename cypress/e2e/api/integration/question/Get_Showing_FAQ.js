import '../../../../support/template'

describe('MyRide Integration Test - Question - Get : Showing FAQ', () => {
    const method = 'get'
    const url = '/api/v1/question/faq'

    it('TC-INT-QS-001 : Success Get Showing FAQ With Valid Data', () => {
        cy.request({
            method: method,
            url: url,
        }).as('SuccessGetShowingFAQWithValidData')
        cy.get('@SuccessGetShowingFAQWithValidData').then(dt => {
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

    it('TC-INT-QS-002 : Failed Get Showing FAQ With Empty Data', () => {
        cy.request({
            method: method,
            url: url,
            failOnStatusCode: false,
        }).as('FailedGetShowingFAQWithEmptyData')
        cy.get('@FailedGetShowingFAQWithEmptyData').then(dt => {
            cy.templateGet(404,dt, null)
            expect(dt.body.message).contain('faq not found')
            
            // Get Item Holder
            const res = dt.body
            expect(res).to.not.have.property('data')
        })
    })
})