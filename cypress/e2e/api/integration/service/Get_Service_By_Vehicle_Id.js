import '../../../../support/template'

describe('MyRide Integration Test - Service - Get : Service By Vehicle Id', () => {
    const method = 'get'
    const url = '/api/v1/service/vehicle'

    it('TC-INT-SV-016 : User Can See Service By Vehicle Id With Valid Data', () => {
        const payload = {
            username : "flazefy",
            password: 'nopass123',
        }
        const vehicleId = '7d53371a-e363-2ad3-25fe-180dae88c062'

        cy.templateIntegrationLoginAPI(payload.username, payload.password).then(token => {
            cy.request({
                method: method,
                url: `${url}/${vehicleId}`,
                headers: {
                    Authorization: `Bearer ${token}`
                },
                failOnStatusCode: false,
            }).as('UserCanSeeServiceByVehicleIdWithValidData')
            cy.get('@UserCanSeeServiceByVehicleIdWithValidData').then(dt => {
                cy.templateGet(200,dt, null)
                expect(dt.body.message).contain('service fetched')
                
                // Get Item Holder
                const res = dt.body
                expect(res).to.have.property('data')
                const data = res.data
                expect(data).to.be.an('array')

                // Get List Key / Column
                const stringFields = ["service_category","service_location","created_at"]
                const stringNullableFields = ["service_note","remind_at"]
                const intNullableFields = ["service_price_total"]

                // Validate Column
                cy.templateValidateColumn(data, stringFields, 'string', false)
                cy.templateValidateColumn(data, stringNullableFields, 'string', true)
                cy.templateValidateColumn(data, intNullableFields, 'number', false)

                // Validate datetime
                const columnDateTime = [
                    { column_name : 'created_at', date_type: 'datetime', nullable: false },
                    { column_name : 'remind_at', date_type: 'datetime', nullable: true }
                ]
                cy.templateValidateDateTime(data, columnDateTime)
            })
        })
    })

    it('TC-INT-SV-017 : User Cant See Service By Vehicle Id With Empty Data', () => {
        const payload = {
            username : "flazefy",
            password: 'nopass123',
        }
        const vehicleId = '88a003eb-d1a6-6b3f-2015-1e11d3186975'

        cy.templateIntegrationLoginAPI(payload.username, payload.password).then(token => {
            cy.request({
                method: method,
                url: `${url}/${vehicleId}`,
                headers: {
                    Authorization: `Bearer ${token}`
                },
                failOnStatusCode: false,
            }).as('UserCantSeeServiceByVehicleIdWithEmptyData')
            cy.get('@UserCantSeeServiceByVehicleIdWithEmptyData').then(dt => {
                cy.templateGet(404,dt, null)
                expect(dt.body.message).contain('service not found')
                
                // Get Item Holder
                const res = dt.body
                expect(res).to.not.have.property('data')
            })
        })
    })

    it('TC-INT-SV-018 : User Cant See Service By Vehicle Id With Not Found Vehicle', () => {
        const payload = {
            username : "testerempty",
            password: 'nopass123',
        }
        const vehicleId = '88a003eb-d1a6-6b3f-2015-1e11d3186911'

        cy.templateIntegrationLoginAPI(payload.username, payload.password).then(token => {
            cy.request({
                method: method,
                url: `${url}/${vehicleId}`,
                headers: {
                    Authorization: `Bearer ${token}`
                },
                failOnStatusCode: false,
            }).as('UserCantSeeServiceByVehicleIdWithNotFoundVehicle')
            cy.get('@UserCantSeeServiceByVehicleIdWithNotFoundVehicle').then(dt => {
                cy.templateGet(404,dt, null)
                expect(dt.body.message).contain('vehicle not found')
                
                // Get Item Holder
                const res = dt.body
                expect(res).to.not.have.property('data')
            })
        })
    })

    it('TC-INT-SV-019 : User Cant See Service By Vehicle Id With Invalid Auth', () => {
        const vehicleId = '7d53371a-e363-2ad3-25fe-180dae88c062'

        cy.request({
            method: method,
            url: `${url}/${vehicleId}`,
            headers: {
                Accept: `application/json`
            },
            failOnStatusCode: false,
        }).as('UserCantSeeServiceByVehicleIdWithInvalidAuth')
        cy.get('@UserCantSeeServiceByVehicleIdWithInvalidAuth').then(dt => {
            cy.templateGet(401,dt, null)
            expect(dt.body.message).contain('you need to include the authorization token from login')
            
            // Get Item Holder
            const res = dt.body
            expect(res).to.not.have.property('data')
        })
    })
})