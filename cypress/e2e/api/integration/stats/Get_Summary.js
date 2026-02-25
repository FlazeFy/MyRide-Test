import '../../utils/template'

describe('MyRide Integration Test - Stats - Get : Summary', () => {
    const method = 'get'
    const url = '/api/v1/stats/summary'

    it('TC-E2E-ST-013 : Success Get Summary With Valid Data', () => {
        cy.request({
            method: method,
            url: url,
        }).as('SuccessGetSummaryWithValidData')
        cy.get('@SuccessGetSummaryWithValidData').then(dt => {
            cy.templateGet(200,dt, null)
            expect(dt.body.message).contain('stats fetched')
            
            // Get Item Holder
            const res = dt.body
            expect(res).to.have.property('data')
            const data = res.data
            expect(data).to.be.an('object')

            // Get List Key / Column
            const intFelds = ['total_user','total_vehicle','total_service','total_clean','total_trip']

            // Validate Column
            cy.templateValidateColumn(data, intFelds, 'number', false)
        })
    })
})