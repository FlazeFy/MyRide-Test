import '../../../../support/template'

describe('MyRide Integration Test - Vehicle - Get : All Vehicle Fuel', () => {
    const method = 'get'
    const url = '/api/v1/vehicle/fuel'

    it('TC-INT-VH-004 : User Can See All Vehicle Fuel With Valid Data', () => {
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
                }
            }).as('UserCanSeeAllVehicleFuelWithValidData')
            cy.get('@UserCanSeeAllVehicleFuelWithValidData').then(dt => {
                cy.templateGet(200,dt, null)
                expect(dt.body.message).contain('vehicle fetched')
                
                // Get Item Holder
                const res = dt.body
                expect(res).to.have.property('data')
                const data = res.data
                expect(data).to.be.an('array')

                // Get List Key / Column
                const stringFields = ['id','vehicle_plate_number','vehicle_name','vehicle_fuel_status']
                const intFields = ['vehicle_fuel_capacity']

                // Validate Column
                cy.templateValidateColumn(data, stringFields, 'string', false)
                cy.templateValidateColumn(data, intFields, 'number', false)

                // Validate Contain
                cy.templateValidateContain(data, ['Normal','Full','High','Low','Empty','Not Monitored'], 'vehicle_fuel_status')
            })
        })
    })

    it('TC-INT-VH-005 : User Cant See All Vehicle Fuel With Empty Data', () => {
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
            }).as('UserCantSeeAllVehicleFuelWithEmptyData')
            cy.get('@UserCantSeeAllVehicleFuelWithEmptyData').then(dt => {
                cy.templateGet(404,dt, null)
                expect(dt.body.message).contain('vehicle not found')
                
                // Get Item Holder
                const res = dt.body
                expect(res).to.not.have.property('data')
            })
        })
    })

    it('TC-INT-VH-006 : User Cant See All Vehicle Fuel With Invalid Auth', () => {
        cy.request({
            method: method,
            url,
            headers: {
                Accept: `application/json`
            },
            failOnStatusCode: false,
        }).as('UserCantSeeAllVehicleFuelWithInvalidAuth')
        cy.get('@UserCantSeeAllVehicleFuelWithInvalidAuth').then(dt => {
            cy.templateGet(401,dt, null)
            expect(dt.body.message).contain('you need to include the authorization token from login')
            
            // Get Item Holder
            const res = dt.body
            expect(res).to.not.have.property('data')
        })
    })
})