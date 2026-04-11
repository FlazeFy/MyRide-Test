import '../../../../support/template'

describe('MyRide Integration Test - Trip - Get : Trip Discovered', () => {
    const method = 'get'
    const url = '/api/v1/trip/discovered'

    it('TC-INT-TR-010 : User Can See Trip Public Discovered Valid Data', () => {
        cy.request({
            method: method,
            url: url,
        }).as('UserCanSeeTripDiscoveredValidData')
        cy.get('@UserCanSeeTripDiscoveredValidData').then(dt => {
            cy.templateGet(200,dt, null)
            expect(dt.body.message).contain('trip fetched')
            
            // Get Item Holder
            const res = dt.body
            expect(res).to.have.property('data')
            const data = res.data
            expect(data).to.be.an('object')

            // Get List Key / Column
            const intFields = ['total_trip','distance_km']
            const strFields = ['last_update']

            // Validate Column
            cy.templateValidateColumn(data, intFields, 'number', false)
            cy.templateValidateColumn(data, strFields, 'string', false)
        })
    })

    it('TC-INT-TR-011 : User Can See Trip Personal Discovered Valid Data', () => {
        const payload = {
            username : "flazefy",
            password: 'nopass123',
        }

        cy.templateIntegrationLoginAPI(payload.username, payload.password).then(token => {
            cy.request({
                method: method,
                url: url,
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).as('UserCanSeeTripDiscoveredValidData')
            cy.get('@UserCanSeeTripDiscoveredValidData').then(dt => {
                cy.templateGet(200,dt, null)
                expect(dt.body.message).contain('trip fetched')
                
                // Get Item Holder
                const res = dt.body
                expect(res).to.have.property('data')
                const data = res.data
                expect(data).to.be.an('object')

                // Get List Key / Column
                const intFields = ['total_trip','distance_km']
                const strFields = ['last_update']

                // Validate Column
                cy.templateValidateColumn(data, intFields, 'number', false)
                cy.templateValidateColumn(data, strFields, 'string', false)
            })
        })
    })
})