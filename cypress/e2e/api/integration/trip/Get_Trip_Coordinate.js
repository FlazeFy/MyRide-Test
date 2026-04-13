import '../../../../support/template'

describe('MyRide Integration Test - Trip - Get : Trip Coordinate', () => {
    const method = 'get'
    const url = '/api/v1/trip/coordinate'

    const validateValidResponse = (dt) => {
        cy.templateGet(200,dt, null)
        expect(dt.body.message).contain('trip fetched')
        
        // Get Item Holder
        const res = dt.body
        expect(res).to.have.property('data')
        const data = res.data
        expect(data).to.be.an('array')

        // Get List Key / Column
        const stringFields = ['id','vehicle_name','trip_category','trip_origin_name','trip_destination_name','trip_origin_coordinate','trip_destination_coordinate','created_at','vehicle_plate_number','vehicle_type']
        const stringNullableFields = ['trip_desc','trip_person']

        // Validate Column
        cy.templateValidateColumn(data, stringFields, 'string', false)
        cy.templateValidateColumn(data, stringNullableFields, 'string', true)

        // Validate Contain
        cy.templateValidateContain(data, [
            'Culinary Hunting','Business Trip','Family Vacation','Worship','Refreshing','Strolling Around','City Exploration','Nature Retreat',
            'Cultural Festival','Road Trip','Backpacking','Photography','Shopping','Sport Event', 'Personal', 'Drop Off', 'Pick Up', 'Friend Trip'
        ], 'trip_category')

        // Validate datetime
        const columnDateTime = [
            { column_name : 'created_at', date_type: 'datetime', nullable: false }
        ]
        cy.templateValidateDateTime(data, columnDateTime)
    }

    it('TC-INT-TR-018 : User Can See Trip Coordinate With Valid Data', () => {
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
            }).as('UserCanSeeTripCoordinateWithValidData')
            cy.get('@UserCanSeeTripCoordinateWithValidData').then(dt => {
                validateValidResponse(dt)
            })
        })
    })

    it('TC-INT-TR-019 : User Cant See Trip Coordinate With Empty Data', () => {
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
            }).as('UserCantSeeTripCoordinateWithEmptyData')
            cy.get('@UserCantSeeTripCoordinateWithEmptyData').then(dt => {
                cy.templateGet(404,dt, null)
                expect(dt.body.message).contain('trip not found')
                
                // Get Item Holder
                const res = dt.body
                expect(res).to.not.have.property('data')
            })
        })
    })

    it('TC-INT-TR-020 : User Cant See Trip Coordinate With Invalid Auth', () => {
        cy.request({
            method: method,
            url,
            headers: {
                Accept: `application/json`
            },
            failOnStatusCode: false,
        }).as('UserCantSeeTripCoordinateWithInvalidAuth')
        cy.get('@UserCantSeeTripCoordinateWithInvalidAuth').then(dt => {
            cy.templateGet(401,dt, null)
            expect(dt.body.message).contain('you need to include the authorization token from login')
            
            // Get Item Holder
            const res = dt.body
            expect(res).to.not.have.property('data')
        })
    })

    it('TC-INT-TR-021 : User Can See Trip Coordinate With Custom Search', () => {
        const payload = {
            username : "flazefy",
            password: 'nopass123',
        }
        const search = 'Kost'

        cy.templateIntegrationLoginAPI(payload.username, payload.password).then(token => {
            cy.request({
                method: method,
                url: `${url}?search=${search}`,
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).as('UserCanSeeTripCoordinateWithCustomSearch')
            cy.get('@UserCanSeeTripCoordinateWithCustomSearch').then(dt => {
                validateValidResponse(dt)
            })
        })
    })

    it('TC-INT-TR-022 : User Cant See Trip Coordinate With Failed Custom Search', () => {
        const payload = {
            username : "flazefy",
            password: 'nopass123',
        }
        const search = 'Lorem ipsum'

        cy.templateIntegrationLoginAPI(payload.username, payload.password).then(token => {
            cy.request({
                method: method,
                url: `${url}?search=${search}`,
                headers: {
                    Authorization: `Bearer ${token}`
                },
                failOnStatusCode: false,
            }).as('UserCantSeeTripCoordinateWithFailedCustomSearch')
            cy.get('@UserCantSeeTripCoordinateWithFailedCustomSearch').then(dt => {
                cy.templateGet(404,dt, null)
                expect(dt.body.message).contain('trip not found')
                
                // Get Item Holder
                const res = dt.body
                expect(res).to.not.have.property('data')
            })
        })
    })
})