import '../../../../support/template'

describe('MyRide Integration Test - Trip - Get : All Trip', () => {
    const method = 'get'
    const url = '/api/v1/trip'

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
        const stringNullableFields = ['driver_fullname','trip_desc','trip_person']

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

    it('TC-INT-TR-001 : User Can See All Trip With Valid Data', () => {
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
            }).as('UserCanSeeAllTripWithValidData')
            cy.get('@UserCanSeeAllTripWithValidData').then(dt => {
                validateValidResponse(dt)

                // Check if all page accessible
                const last_page = dt.body.data.last_page
                cy.templatePagination(url, last_page, token)
            })
        })
    })

    it('TC-INT-TR-002 : User Can See All Trip With Custom Item Per Page', () => {
        const payload = {
            username : "flazefy",
            password: 'nopass123',
        }
        const itemPerPage = 2

        cy.templateIntegrationLoginAPI(payload.username, payload.password).then(token => {
            cy.request({
                method: method,
                url: `${url}?per_page_key=${itemPerPage}`,
                headers: {
                    Authorization: `Bearer ${token}`
                },
            }).as('UserCanSeeAllTripWithCustomItemPerPage')
            cy.get('@UserCanSeeAllTripWithCustomItemPerPage').then(dt => {
                validateValidResponse(dt)

                // Check if item per page query same with data.length
                const data = dt.body.data.data
                cy.expect(data.length).to.equal(itemPerPage)
            })
        })
    })

    it('TC-INT-TR-003 : User Cant See All Trip With Custom Invalid Item Per Page', () => {
        const payload = {
            username : "flazefy",
            password: 'nopass123',
        }
        const itemPerPage = 'test'

        cy.templateIntegrationLoginAPI(payload.username, payload.password).then(token => {
            cy.request({
                method: method,
                url: `${url}?per_page_key=${itemPerPage}`,
                headers: {
                    Authorization: `Bearer ${token}`
                },
                failOnStatusCode: false,
            }).as('UserCantSeeAllTripWithCustomInvalidItemPerPage')
            cy.get('@UserCantSeeAllTripWithCustomInvalidItemPerPage').then(dt => {
                cy.templateGet(400,dt, null)
                expect(dt.body.message).contain('per_page_key is not a valid page')
                
                // Get Item Holder
                const res = dt.body
                expect(res).to.not.have.property('data')
            })
        })
    })

    it('TC-INT-TR-004 : User Cant See All Trip With Empty Data', () => {
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
            }).as('UserCantSeeAllTripWithEmptyData')
            cy.get('@UserCantSeeAllTripWithEmptyData').then(dt => {
                cy.templateGet(404,dt, null)
                expect(dt.body.message).contain('trip not found')
                
                // Get Item Holder
                const res = dt.body
                expect(res).to.not.have.property('data')
            })
        })
    })

    it('TC-INT-TR-005 : User Cant See All Trip With Invalid Auth', () => {
        cy.request({
            method: method,
            url,
            headers: {
                Accept: `application/json`
            },
            failOnStatusCode: false,
        }).as('UserCantSeeAllTripWithInvalidAuth')
        cy.get('@UserCantSeeAllTripWithInvalidAuth').then(dt => {
            cy.templateGet(401,dt, null)
            expect(dt.body.message).contain('you need to include the authorization token from login')
            
            // Get Item Holder
            const res = dt.body
            expect(res).to.not.have.property('data')
        })
    })

    it('TC-INT-TR-006 : User Cant See All Trip With Custom Invalid Trip Id (UUID)', () => {
        const payload = {
            username : "flazefy",
            password: 'nopass123',
        }
        const tripId = '1'

        cy.templateIntegrationLoginAPI(payload.username, payload.password).then(token => {
            cy.request({
                method: method,
                url: `${url}?trip_id=${tripId}`,
                headers: {
                    Authorization: `Bearer ${token}`
                },
                failOnStatusCode: false,
            }).as('UserCantSeeAllTripWithCustomInvalidTripId(UUID)')
            cy.get('@UserCantSeeAllTripWithCustomInvalidTripId(UUID)').then(dt => {
                cy.templateGet(400,dt, null)
                expect(dt.body.message).contain('trip_id must be a valid UUID')
                
                // Get Item Holder
                const res = dt.body
                expect(res).to.not.have.property('data')
            })
        })
    })

    it('TC-INT-TR-007 : User Cant See All Trip With Custom Invalid Trip Id (Not Found)', () => {
        const payload = {
            username : "flazefy",
            password: 'nopass123',
        }
        const tripId = 'da79e9ba-bc19-2186-2f4d-c755ec841234'

        cy.templateIntegrationLoginAPI(payload.username, payload.password).then(token => {
            cy.request({
                method: method,
                url: `${url}?trip_id=${tripId}`,
                headers: {
                    Authorization: `Bearer ${token}`
                },
                failOnStatusCode: false,
            }).as('UserCantSeeAllTripWithCustomInvalidTripId(NotFound)')
            cy.get('@UserCantSeeAllTripWithCustomInvalidTripId(NotFound)').then(dt => {
                cy.templateGet(404,dt, null)
                expect(dt.body.message).contain('trip not found')
                
                // Get Item Holder
                const res = dt.body
                expect(res).to.not.have.property('data')
            })
        })
    })

    it('TC-INT-TR-008 : User Can See All Trip With Custom Search', () => {
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
            }).as('UserCanSeeAllTripWithCustomSearch')
            cy.get('@UserCanSeeAllTripWithCustomSearch').then(dt => {
                validateValidResponse(dt)

                // Check if all page accessible
                const last_page = dt.body.data.last_page
                cy.templatePagination(url, last_page, token)
            })
        })
    })

    it('TC-INT-TR-009 : User Cant See All Trip With Failed Custom Search', () => {
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
            }).as('UserCantSeeAllTripWithFailedCustomSearch')
            cy.get('@UserCantSeeAllTripWithFailedCustomSearch').then(dt => {
                cy.templateGet(404,dt, null)
                expect(dt.body.message).contain('trip not found')
                
                // Get Item Holder
                const res = dt.body
                expect(res).to.not.have.property('data')
            })
        })
    })
})