import '../../../../support/template'

describe('MyRide Integration Test - Vehicle - Get : Vehicle Trip Summary By Id', () => {
    const method = 'get'
    const url = '/api/v1/vehicle/trip/summary'

    const validateValidResponse = (dt) => {
        cy.templateGet(200,dt, null)
        expect(dt.body.message).contain('vehicle fetched')
        
        // Get Item Holder
        const res = dt.body
        expect(res).to.have.property('data')
        const data = res.data
        expect(data).to.be.an('object')

        // Get List Key / Column
        const stringNullableFields = ['most_person_with','most_origin','most_destination','most_category']
        const intFields = ['vehicle_total_trip_distance']

        // Validate Column
        cy.templateValidateColumn(data, stringNullableFields, 'string', true)
        cy.templateValidateColumn(data, intFields, 'number', false)

        // Validate Contain
        cy.templateValidateContain(data, [
            'Culinary Hunting','Business Trip','Family Vacation','Worship','Refreshing','Strolling Around','City Exploration','Nature Retreat',
            'Cultural Festival','Road Trip','Backpacking','Photography','Shopping','Sport Event', 'Personal', 'Drop Off', 'Pick Up'
        ], 'most_category', true)
    }

    it('TC-INT-VR-012 : User Can See Vehicle Trip Summary By Id With Valid Data', () => {
        const payload = {
            username : "flazefy",
            password: 'nopass123',
        }
        const id = '7d53371a-e363-2ad3-25fe-180dae88c062'

        cy.templateIntegrationLoginAPI(payload.username, payload.password).then(token => {
            cy.request({
                method: method,
                url: `${url}/${id}`,
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).as('UserCanSeeVehicleTripSummaryByIdWithValidData')
            cy.get('@UserCanSeeVehicleTripSummaryByIdWithValidData').then(dt => {
                validateValidResponse(dt)
            })
        })
    })

    it('TC-INT-VR-013 : User Can See Vehicle Trip Summary By Id For Never Used Vehicle', () => {
        const payload = {
            username : "flazefy",
            password: 'nopass123',
        }
        const id = '88a003eb-d1a6-6b3f-2015-1e11d3186975'

        cy.templateIntegrationLoginAPI(payload.username, payload.password).then(token => {
            cy.request({
                method: method,
                url: `${url}/${id}`,
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).as('UserCanSeeVehicleTripSummaryByIdForNeverUsedVehicle')
            cy.get('@UserCanSeeVehicleTripSummaryByIdForNeverUsedVehicle').then(dt => {
                validateValidResponse(dt)
            })
        })
    })

    it('TC-INT-VR-014 : User Cant See Vehicle Trip Summary By Id With Invalid UUID', () => {
        const payload = {
            username : "flazefy",
            password: 'nopass123',
        }
        const id = '1'

        cy.templateIntegrationLoginAPI(payload.username, payload.password).then(token => {
            cy.request({
                method: method,
                url: `${url}/${id}`,
                headers: {
                    Authorization: `Bearer ${token}`
                },
                failOnStatusCode: false,
            }).as('UserCantSeeVehicleTripSummaryByIdWithInvalidUUID')
            cy.get('@UserCantSeeVehicleTripSummaryByIdWithInvalidUUID').then(dt => {
                cy.templateGet(400,dt, null)
                expect(dt.body.message).contain('id must be a valid UUID')
                
                // Get Item Holder
                const res = dt.body
                expect(res).to.not.have.property('data')
            })
        })
    })

    it('TC-INT-VR-015 : User Cant See Vehicle Trip Summary By Id With Not Found Vehicle', () => {
        const payload = {
            username : "testerempty",
            password: 'nopass123',
        }
        const id = '7d53371a-e363-2ad3-25fe-180dae88c062'

        cy.templateIntegrationLoginAPI(payload.username, payload.password).then(token => {
            cy.request({
                method: method,
                url: `${url}/${id}`,
                headers: {
                    Authorization: `Bearer ${token}`
                },
                failOnStatusCode: false,
            }).as('UserCantSeeVehicleTripSummaryByIdWithNotFoundVehicle')
            cy.get('@UserCantSeeVehicleTripSummaryByIdWithNotFoundVehicle').then(dt => {
                cy.templateGet(404,dt, null)
                expect(dt.body.message).contain('vehicle not found')
                
                // Get Item Holder
                const res = dt.body
                expect(res).to.not.have.property('data')
            })
        })
    })

    it('TC-INT-VR-011 : User Cant See Vehicle Trip Summary By Id With Invalid Auth', () => {
        const id = '7d53371a-e363-2ad3-25fe-180dae88c062'

        cy.request({
            method: method,
            url: `${url}/${id}`,
            headers: {
                Accept: `application/json`
            },
            failOnStatusCode: false,
        }).as('UserCantSeeVehicleTripSummaryByIdWithInvalidAuth')
        cy.get('@UserCantSeeVehicleTripSummaryByIdWithInvalidAuth').then(dt => {
            cy.templateGet(401,dt, null)
            expect(dt.body.message).contain('you need to include the authorization token from login')
            
            // Get Item Holder
            const res = dt.body
            expect(res).to.not.have.property('data')
        })
    })
})