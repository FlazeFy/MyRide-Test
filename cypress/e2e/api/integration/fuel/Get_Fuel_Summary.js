import '../../../../support/template'

describe('MyRide Integration Test - Fuel - Get : Fuel Summary', () => {
    const method = 'get'
    const url = '/api/v1/fuel/summary'

    const validateValidResponse = (dt) => {
        cy.templateGet(200,dt, null)
        expect(dt.body.message).contain('fuel fetched')
        
        // Get Item Holder
        const res = dt.body
        expect(res).to.have.property('data')
        const data = res.data
        expect(data).to.be.an('object')

        // Get List Key / Column
        const intFields = ["total_fuel_price","total_fuel_volume","total_refueling"] 

        // Validate Column
        cy.templateValidateColumn(data, intFields, 'number', false)
    }

    it('TC-INT-FL-008 : User Can See Fuel Summary With Valid Data', () => {
        const payload = {
            username : "flazefy",
            password: 'nopass123',
        }
        const period = '01-2026'

        cy.templateIntegrationLoginAPI(payload.username, payload.password).then(token => {
            cy.request({
                method: method,
                url: `${url}/${period}`,
                headers: {
                    Authorization: `Bearer ${token}`
                },
                failOnStatusCode: false,
            }).as('UserCanSeeFuelSummaryWithValidData')
            cy.get('@UserCanSeeFuelSummaryWithValidData').then(dt => {
                validateValidResponse(dt)
            })
        })
    })

    it('TC-INT-FL-009 : User Can See Fuel Summary With Empty Data', () => {
        const payload = {
            username : "testerempty",
            password: 'nopass123',
        }
        const period = '01-2022'

        cy.templateIntegrationLoginAPI(payload.username, payload.password).then(token => {
            cy.request({
                method: method,
                url: `${url}/${period}`,
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).as('UserCanSeeFuelSummaryWithEmptyData')
            cy.get('@UserCanSeeFuelSummaryWithEmptyData').then(dt => {
                validateValidResponse(dt)
            })
        })
    })

    it('TC-INT-FL-010 : User Cant See Fuel Summary With Invalid Auth', () => {
        const period = '01-2026'

        cy.request({
            method: method,
            url: `${url}/${period}`,
            headers: {
                Accept: `application/json`
            },
            failOnStatusCode: false,
        }).as('UserCantSeeFuelSummaryWithInvalidAuth')
        cy.get('@UserCantSeeFuelSummaryWithInvalidAuth').then(dt => {
            cy.templateGet(401,dt, null)
            expect(dt.body.message).contain('you need to include the authorization token from login')
            
            // Get Item Holder
            const res = dt.body
            expect(res).to.not.have.property('data')
        })
    })
})