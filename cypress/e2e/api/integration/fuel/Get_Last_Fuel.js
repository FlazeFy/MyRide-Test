import '../../../../support/template'

describe('MyRide Integration Test - Fuel - Get : Last Fuel', () => {
    const method = 'get'
    const url = '/api/v1/fuel/last'

    it('TC-INT-FL-011 : User Can See Last Fuel With Valid Data', () => {
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
            }).as('UserCanSeeLastFuelWithValidData')
            cy.get('@UserCanSeeLastFuelWithValidData').then(dt => {
                cy.templateGet(200,dt, null)
                expect(dt.body.message).contain('fuel fetched')
                
                // Get Item Holder
                const res = dt.body
                expect(res).to.have.property('data')
                const data = res.data
                expect(data).to.be.an('object')

                // Get List Key / Column
                const stringFields = ["vehicle_plate_number","vehicle_type","fuel_brand","created_at"]
                const stringNullableFields = ["fuel_type"]
                const intFields = ["fuel_volume","fuel_price_total"] 
                const intNullableFields = ["fuel_ron"]

                // Validate Column
                cy.templateValidateColumn(data, intFields, 'number', false)
                cy.templateValidateColumn(data, intNullableFields, 'number', true)
                cy.templateValidateColumn(data, stringFields, 'string', false)
                cy.templateValidateColumn(data, stringNullableFields, 'string', true)
            })
        })
    })

    it('TC-INT-FL-012 : User Cant See Last Fuel With Empty Data', () => {
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
            }).as('UserCantSeeLastFuelWithEmptyData')
            cy.get('@UserCantSeeLastFuelWithEmptyData').then(dt => {
                cy.templateGet(404,dt, null)
                expect(dt.body.message).contain('fuel not found')
                
                // Get Item Holder
                const res = dt.body
                expect(res).to.not.have.property('data')
            })
        })
    })

    it('TC-INT-FL-013 : User Cant See Last Fuel With Invalid Auth', () => {
        cy.request({
            method: method,
            url,
            headers: {
                Accept: `application/json`
            },
            failOnStatusCode: false,
        }).as('UserCantSeeLastFuelWithInvalidAuth')
        cy.get('@UserCantSeeLastFuelWithInvalidAuth').then(dt => {
            cy.templateGet(401,dt, null)
            expect(dt.body.message).contain('you need to include the authorization token from login')
            
            // Get Item Holder
            const res = dt.body
            expect(res).to.not.have.property('data')
        })
    })
})