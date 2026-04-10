import '../../../../support/template'

describe('MyRide Integration Test - Service - Get : All Service', () => {
    const method = 'get'
    const url = '/api/v1/service'

    const validateValidResponse = (dt) => {
        cy.templateGet(200,dt, null)
        expect(dt.body.message).contain('service fetched')
        
        // Get Item Holder
        const res = dt.body
        expect(res).to.have.property('data')
        const data = res.data
        expect(data).to.be.an('object')

        // Get List Key / Column
        const stringFields = ['id','vehicle_plate_number','vehicle_type','service_category','service_location','created_at']
        const stringNullableFields = ['updated_at','service_note','remind_at']
        const intNullableFields = ['service_price_total']

        // Validate Column
        cy.templateValidateColumn(data.data, stringFields, 'string', false)
        cy.templateValidateColumn(data.data, stringNullableFields, 'string', true)
        cy.templateValidateColumn(data.data, intNullableFields, 'number', true)

        // Validate Contain
        cy.templateValidateContain(data.data, ['Routine', 'Repair', 'Inspection', 'Emergency'], 'service_category')

        // Validate datetime
        const columnDateTime = [
            { column_name : 'created_at', date_type: 'datetime', nullable: false },
            { column_name : 'updated_at', date_type: 'datetime', nullable: true },
            { column_name : 'remind_at', date_type: 'datetime', nullable: true }
        ]
        cy.templateValidateDateTime(data.data, columnDateTime)
    }

    it('TC-INT-SV-004 : User Can See All Service With Valid Data', () => {
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
            }).as('UserCanSeeAllServiceWithValidData')
            cy.get('@UserCanSeeAllServiceWithValidData').then(dt => {
                validateValidResponse(dt)

                // Check if all page accessible
                const last_page = dt.body.data.last_page
                cy.templatePagination(url, last_page, token)
            })
        })
    })

    it('TC-INT-SV-005 : User Can See All Service With Custom Item Per Page', () => {
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
            }).as('UserCanSeeAllServiceWithCustomItemPerPage')
            cy.get('@UserCanSeeAllServiceWithCustomItemPerPage').then(dt => {
                validateValidResponse(dt)

                // Check if item per page query same with data.length
                const data = dt.body.data.data
                cy.expect(data.length).to.equal(itemPerPage)
            })
        })
    })

    it('TC-INT-SV-006 : User Cant See All Service With Custom Invalid Item Per Page', () => {
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
            }).as('UserCantSeeAllServiceWithCustomInvalidItemPerPage')
            cy.get('@UserCantSeeAllServiceWithCustomInvalidItemPerPage').then(dt => {
                cy.templateGet(400,dt, null)
                expect(dt.body.message).contain('per_page_key is not a valid page')
                
                // Get Item Holder
                const res = dt.body
                expect(res).to.not.have.property('data')
            })
        })
    })

    it('TC-INT-SV-007 : User Cant See All Service With Empty Data', () => {
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
            }).as('UserCantSeeAllServiceWithEmptyData')
            cy.get('@UserCantSeeAllServiceWithEmptyData').then(dt => {
                cy.templateGet(404,dt, null)
                expect(dt.body.message).contain('service not found')
                
                // Get Item Holder
                const res = dt.body
                expect(res).to.not.have.property('data')
            })
        })
    })

    it('TC-INT-SV-008 : User Cant See All Service With Invalid Auth', () => {
        cy.request({
            method: method,
            url,
            headers: {
                Accept: `application/json`
            },
            failOnStatusCode: false,
        }).as('UserCantSeeAllServiceWithInvalidAuth')
        cy.get('@UserCantSeeAllServiceWithInvalidAuth').then(dt => {
            cy.templateGet(401,dt, null)
            expect(dt.body.message).contain('you need to include the authorization token from login')
            
            // Get Item Holder
            const res = dt.body
            expect(res).to.not.have.property('data')
        })
    })

    it('TC-INT-SV-009 : User Cant See All Service With Custom Invalid Vehicle Id (UUID)', () => {
        const payload = {
            username : "flazefy",
            password: 'nopass123',
        }
        const serviceId = '1'

        cy.templateIntegrationLoginAPI(payload.username, payload.password).then(token => {
            cy.request({
                method: method,
                url: `${url}?vehicle_id=${serviceId}`,
                headers: {
                    Authorization: `Bearer ${token}`
                },
                failOnStatusCode: false,
            }).as('UserCantSeeAllServiceWithCustomInvalidVehicleId(UUID)')
            cy.get('@UserCantSeeAllServiceWithCustomInvalidVehicleId(UUID)').then(dt => {
                cy.templateGet(400,dt, null)
                expect(dt.body.message).contain('vehicle_id must be a valid UUID')
                
                // Get Item Holder
                const res = dt.body
                expect(res).to.not.have.property('data')
            })
        })
    })

    it('TC-INT-SV-010 : User Cant See All Service With Custom Invalid Vehicle Id (Not Found)', () => {
        const payload = {
            username : "flazefy",
            password: 'nopass123',
        }
        const serviceId = 'da79e9ba-bc19-2186-2f4d-c755ec841234'

        cy.templateIntegrationLoginAPI(payload.username, payload.password).then(token => {
            cy.request({
                method: method,
                url: `${url}?vehicle_id=${serviceId}`,
                headers: {
                    Authorization: `Bearer ${token}`
                },
                failOnStatusCode: false,
            }).as('UserCantSeeAllServiceWithCustomInvalidVehicleId(NotFound)')
            cy.get('@UserCantSeeAllServiceWithCustomInvalidVehicleId(NotFound)').then(dt => {
                cy.templateGet(404,dt, null)
                expect(dt.body.message).contain('service not found')
                
                // Get Item Holder
                const res = dt.body
                expect(res).to.not.have.property('data')
            })
        })
    })

    it('TC-INT-SV-011 : User Can See All Service With Custom Search', () => {
        const payload = {
            username : "flazefy",
            password: 'nopass123',
        }
        const search = 'brake'

        cy.templateIntegrationLoginAPI(payload.username, payload.password).then(token => {
            cy.request({
                method: method,
                url: `${url}?search=${search}`,
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).as('UserCanSeeAllServiceWithCustomSearch')
            cy.get('@UserCanSeeAllServiceWithCustomSearch').then(dt => {
                validateValidResponse(dt)

                // Check if all page accessible
                const last_page = dt.body.data.last_page
                cy.templatePagination(url, last_page, token)
            })
        })
    })

    it('TC-INT-SV-012 : User Cant See All Service With Failed Custom Search', () => {
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
            }).as('UserCantSeeAllServiceWithFailedCustomSearch')
            cy.get('@UserCantSeeAllServiceWithFailedCustomSearch').then(dt => {
                cy.templateGet(404,dt, null)
                expect(dt.body.message).contain('service not found')
                
                // Get Item Holder
                const res = dt.body
                expect(res).to.not.have.property('data')
            })
        })
    })
})