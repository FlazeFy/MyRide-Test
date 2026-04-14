import '../../../../support/template'

describe('MyRide Integration Test - Trip - Get : All Trip By Driver Id', () => {
    const method = 'get'
    const url = '/api/v1/trip/driver'

    const validateValidResponse = (dt) => {
        cy.templateGet(200,dt, null)
        expect(dt.body.message).contain('trip fetched')
        
        // Get Item Holder
        const res = dt.body
        expect(res).to.have.property('data')
        const data = res.data
        expect(data).to.be.an('object')

        // Get List Key / Column
        const stringFields = ['id','vehicle_name','trip_category','trip_origin_name','trip_destination_name','trip_origin_coordinate','trip_destination_coordinate','created_at','vehicle_plate_number','vehicle_type']
        const stringNullableFields = ['trip_desc','trip_person']

        // Validate Column
        cy.templateValidateColumn(data.data, stringFields, 'string', false)
        cy.templateValidateColumn(data.data, stringNullableFields, 'string', true)

        // Validate Contain
        cy.templateValidateContain(data.data, [
            'Culinary Hunting','Business Trip','Family Vacation','Worship','Refreshing','Strolling Around','City Exploration','Nature Retreat',
            'Cultural Festival','Road Trip','Backpacking','Photography','Shopping','Sport Event', 'Personal', 'Drop Off', 'Pick Up'
        ], 'trip_category')

        // Validate datetime
        const columnDateTime = [
            { column_name : 'created_at', date_type: 'datetime', nullable: false }
        ]
        cy.templateValidateDateTime(data.data, columnDateTime)
    }

    it('TC-INT-TR-028 : User Can See All Trip By Driver Id With Valid Data', () => {
        const payload = {
            username : "flazefy",
            password: 'nopass123',
        }
        const driverId = '5eaa10e9-1e2a-a789-0c96-fb3714ee9b85'

        cy.templateIntegrationLoginAPI(payload.username, payload.password).then(token => {
            cy.request({
                method: method,
                url: `${url}/${driverId}`,
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).as('UserCanSeeAllTripByDriverIdWithValidData')
            cy.get('@UserCanSeeAllTripByDriverIdWithValidData').then(dt => {
                validateValidResponse(dt)

                // Check if all page accessible
                const last_page = dt.body.data.last_page
                cy.templatePagination(`${url}/${driverId}`, last_page, token)
            })
        })
    })

    it('TC-INT-TR-029 : User Can See All Trip By Driver Id With Custom Item Per Page', () => {
        const payload = {
            username : "flazefy",
            password: 'nopass123',
        }
        const itemPerPage = 2
        const driverId = '5eaa10e9-1e2a-a789-0c96-fb3714ee9b85'

        cy.templateIntegrationLoginAPI(payload.username, payload.password).then(token => {
            cy.request({
                method: method,
                url: `${url}/${driverId}?per_page_key=${itemPerPage}`,
                headers: {
                    Authorization: `Bearer ${token}`
                },
            }).as('UserCanSeeAllTripByDriverIdWithCustomItemPerPage')
            cy.get('@UserCanSeeAllTripByDriverIdWithCustomItemPerPage').then(dt => {
                validateValidResponse(dt)

                // Check if item per page query same with data.length
                const data = dt.body.data.data
                cy.expect(data.length).to.equal(itemPerPage)
            })
        })
    })

    it('TC-INT-TR-030 : User Cant See All Trip By Driver Id With Custom Invalid Item Per Page', () => {
        const payload = {
            username : "flazefy",
            password: 'nopass123',
        }
        const itemPerPage = 'test'
        const driverId = '5eaa10e9-1e2a-a789-0c96-fb3714ee9b85'

        cy.templateIntegrationLoginAPI(payload.username, payload.password).then(token => {
            cy.request({
                method: method,
                url: `${url}/${driverId}?per_page_key=${itemPerPage}`,
                headers: {
                    Authorization: `Bearer ${token}`
                },
                failOnStatusCode: false,
            }).as('UserCantSeeAllTripByDriverIdWithCustomInvalidItemPerPage')
            cy.get('@UserCantSeeAllTripByDriverIdWithCustomInvalidItemPerPage').then(dt => {
                cy.templateGet(400,dt, null)
                expect(dt.body.message).contain('per_page_key is not a valid page')
                
                // Get Item Holder
                const res = dt.body
                expect(res).to.not.have.property('data')
            })
        })
    })

    it('TC-INT-TR-031 : User Cant See All Trip By Driver Id With Empty Data', () => {
        const payload = {
            username : "testerempty",
            password: 'nopass123',
        }
        const driverId = '5eaa10e9-1e2a-a789-0c96-fb3714ee9b82'

        cy.templateIntegrationLoginAPI(payload.username, payload.password).then(token => {
            cy.request({
                method: method,
                url: `${url}/${driverId}`,
                headers: {
                    Authorization: `Bearer ${token}`
                },
                failOnStatusCode: false,
            }).as('UserCantSeeAllTripByDriverIdWithEmptyData')
            cy.get('@UserCantSeeAllTripByDriverIdWithEmptyData').then(dt => {
                cy.templateGet(404,dt, null)
                expect(dt.body.message).contain('trip not found')
                
                // Get Item Holder
                const res = dt.body
                expect(res).to.not.have.property('data')
            })
        })
    })

    it('TC-INT-TR-032 : User Cant See All Trip By Driver Id With Invalid Auth', () => {
        const driverId = '5eaa10e9-1e2a-a789-0c96-fb3714ee9b85'

        cy.request({
            method: method,
            url: `${url}/${driverId}`,
            headers: {
                Accept: `application/json`
            },
            failOnStatusCode: false,
        }).as('UserCantSeeAllTripByDriverIdWithInvalidAuth')
        cy.get('@UserCantSeeAllTripByDriverIdWithInvalidAuth').then(dt => {
            cy.templateGet(401,dt, null)
            expect(dt.body.message).contain('you need to include the authorization token from login')
            
            // Get Item Holder
            const res = dt.body
            expect(res).to.not.have.property('data')
        })
    })

    it('TC-INT-TR-033 : User Cant See All Trip By Driver Id With Custom Invalid Driver Id (UUID)', () => {
        const payload = {
            username : "flazefy",
            password: 'nopass123',
        }
        const driverId = '1'

        cy.templateIntegrationLoginAPI(payload.username, payload.password).then(token => {
            cy.request({
                method: method,
                url: `${url}/${driverId}`,
                headers: {
                    Authorization: `Bearer ${token}`
                },
                failOnStatusCode: false,
            }).as('UserCantSeeAllTripByDriverIdWithCustomInvalidDriverId(UUID)')
            cy.get('@UserCantSeeAllTripByDriverIdWithCustomInvalidDriverId(UUID)').then(dt => {
                cy.templateGet(400,dt, null)
                expect(dt.body.message).contain('driver_id must be a valid UUID')
                
                // Get Item Holder
                const res = dt.body
                expect(res).to.not.have.property('data')
            })
        })
    })

    it('TC-INT-TR-034 : User Cant See All Trip By Driver Id With Custom Invalid Driver Id (Not Found)', () => {
        const payload = {
            username : "flazefy",
            password: 'nopass123',
        }
        const driverId = 'da79e9ba-bc19-2186-2f4d-c755ec841234'

        cy.templateIntegrationLoginAPI(payload.username, payload.password).then(token => {
            cy.request({
                method: method,
                url: `${url}/${driverId}`,
                headers: {
                    Authorization: `Bearer ${token}`
                },
                failOnStatusCode: false,
            }).as('UserCantSeeAllTripByDriverIdWithCustomInvalidDriverId(NotFound)')
            cy.get('@UserCantSeeAllTripByDriverIdWithCustomInvalidDriverId(NotFound)').then(dt => {
                cy.templateGet(404,dt, null)
                expect(dt.body.message).contain('trip not found')
                
                // Get Item Holder
                const res = dt.body
                expect(res).to.not.have.property('data')
            })
        })
    })
})