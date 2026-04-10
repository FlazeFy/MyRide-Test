import '../../../../support/template'

describe('MyRide Integration Test - Service - Get : Service Spending', () => {
    const method = 'get'
    const url = '/api/v1/service/spending'

    it('TC-INT-SV-001 : User Can See Service Spending With Valid Data', () => {
        const payload = {
            username : "flazefy",
            password: 'nopass123',
        }

        cy.templateIntegrationLoginAPI(payload.username, payload.password).then(token => {
            cy.request({
                method: method,
                url,
                headers: {
                    Authorization: `Bearer ${token}`
                },
                failOnStatusCode: false,
            }).as('UserCanSeeServiceSpendingWithValidData')
            cy.get('@UserCanSeeServiceSpendingWithValidData').then(dt => {
                cy.templateGet(200,dt, null)
                expect(dt.body.message).contain('service fetched')
                
                // Get Item Holder
                const res = dt.body
                expect(res).to.have.property('data')
                const data = res.data
                expect(data).to.be.an('array')

                // Get List Key / Column
                const stringFields = ["vehicle_plate_number","vehicle_type"]
                const intFields = ["total"]

                // Validate Column
                cy.templateValidateColumn(data, stringFields, 'string', false)
                cy.templateValidateColumn(data, intFields, 'number', false)
            })
        })
    })

    it('TC-INT-SV-002 : User Cant See Service Spending With Empty Data', () => {
        const payload = {
            username : "testerempty",
            password: 'nopass123',
        }

        cy.templateIntegrationLoginAPI(payload.username, payload.password).then(token => {
            cy.request({
                method: method,
                url,
                headers: {
                    Authorization: `Bearer ${token}`
                },
                failOnStatusCode: false,
            }).as('UserCantSeeServiceSpendingWithEmptyData')
            cy.get('@UserCantSeeServiceSpendingWithEmptyData').then(dt => {
                cy.templateGet(404,dt, null)
                expect(dt.body.message).contain('service not found')
                
                // Get Item Holder
                const res = dt.body
                expect(res).to.not.have.property('data')
            })
        })
    })

    it('TC-INT-SV-003 : User Cant See Service Spending With Invalid Auth', () => {
        cy.request({
            method: method,
            url,
            headers: {
                Accept: `application/json`
            },
            failOnStatusCode: false,
        }).as('UserCantSeeServiceSpendingWithInvalidAuth')
        cy.get('@UserCantSeeServiceSpendingWithInvalidAuth').then(dt => {
            cy.templateGet(401,dt, null)
            expect(dt.body.message).contain('you need to include the authorization token from login')
            
            // Get Item Holder
            const res = dt.body
            expect(res).to.not.have.property('data')
        })
    })
})