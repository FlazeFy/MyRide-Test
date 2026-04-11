import '../../../../support/template'

describe('MyRide Integration Test - Trip - Get : Last Trip', () => {
    const method = 'get'
    const url = '/api/v1/trip/last'

    it('TC-INT-TR-012 : User Can See Last Trip With Valid Data', () => {
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
            }).as('UserCanSeeLastTripWithValidData')
            cy.get('@UserCanSeeLastTripWithValidData').then(dt => {
                cy.templateGet(200,dt, null)
                expect(dt.body.message).contain('trip fetched')
                
                // Get Item Holder
                const res = dt.body
                expect(res).to.have.property('data')
                const data = res.data
                expect(data).to.be.an('object')

                // Get List Key / Column
                const stringFields = ["trip_destination_name","trip_destination_coordinate","vehicle_plate_number","created_at","vehicle_plate_number","vehicle_type"] 
                const stringNullableFields = ["driver_username"]

                // Validate Column
                cy.templateValidateColumn(data, stringFields, 'string', false)
                cy.templateValidateColumn(data, stringNullableFields, 'string', true)

                // Validate Contain
                cy.templateValidateContain(data, [
                    'City Car','Minibus','Motorcycle','Hatchback','Sedan','SUV','Pickup Truck','Convertible','Coupe','Van','Wagon','Crossover','Electric Vehicle'
                ], "vehicle_type")

                // Validate datetime
                const columnDateTime = [
                    { column_name : 'created_at', date_type: 'datetime', nullable: false }
                ]
                cy.templateValidateDateTime(data, columnDateTime)
            })
        })
    })

    it('TC-INT-TR-013 : User Cant See Last Trip With Empty Data', () => {
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
            }).as('UserCantSeeLastTripWithEmptyData')
            cy.get('@UserCantSeeLastTripWithEmptyData').then(dt => {
                cy.templateGet(404,dt, null)
                expect(dt.body.message).contain('trip not found')
                
                // Get Item Holder
                const res = dt.body
                expect(res).to.not.have.property('data')
            })
        })
    })

    it('TC-INT-TR-014 : User Cant See Last Trip With Invalid Auth', () => {
        cy.request({
            method: method,
            url,
            headers: {
                Accept: `application/json`
            },
            failOnStatusCode: false,
        }).as('UserCantSeeLastTripWithInvalidAuth')
        cy.get('@UserCantSeeLastTripWithInvalidAuth').then(dt => {
            cy.templateGet(401,dt, null)
            expect(dt.body.message).contain('you need to include the authorization token from login')
            
            // Get Item Holder
            const res = dt.body
            expect(res).to.not.have.property('data')
        })
    })
})