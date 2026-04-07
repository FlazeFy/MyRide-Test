import '../../../../support/template'

describe('MyRide Integration Test - Inventory - Get : All Inventory', () => {
    const method = 'get'
    const url = '/api/v1/inventory'

    const validateValidResponse = (dt) => {
        cy.templateGet(200,dt, null)
        expect(dt.body.message).contain('inventory fetched')
        
        // Get Item Holder
        const res = dt.body
        expect(res).to.have.property('data')
        const data = res.data
        expect(data).to.be.an('object')

        // Get List Key / Column
        const stringFields = ['id','inventory_name','inventory_category','inventory_storage','created_at','vehicle_plate_number','vehicle_type']
        const stringNullableFields = ['inventory_image_url','updated_at']

        // Validate Column
        cy.templateValidateColumn(data.data, stringFields, 'string', false)
        cy.templateValidateColumn(data.data, stringNullableFields, 'string', true)

        // Validate Contain
        cy.templateValidateContain(data.data, ['Glove Compartment', 'Trunk', 'Dashboard', 'Back Seat Pocket', 'Roof Box'], 'inventory_storage')
        cy.templateValidateContain(data.data, ['Safety', 'Maintenance', 'Personal', 'Electronics', 'Documents','Accessoris'], 'inventory_category')

        // Validate datetime
        const columnDateTime = [
            { column_name : 'created_at', date_type: 'datetime', nullable: false },
            { column_name : 'updated_at', date_type: 'datetime', nullable: true }
        ]
        cy.templateValidateDateTime(data.data, columnDateTime)
        
        // Validate 
        const intFields = ['inventory_qty']
        cy.templateValidateColumn(data.data, intFields, 'number', false)
    }

    it('TC-INT-IN-001 : User Can See All Inventory With Valid Data', () => {
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
            }).as('UserCanSeeAllInventoryWithValidData')
            cy.get('@UserCanSeeAllInventoryWithValidData').then(dt => {
                validateValidResponse(dt)

                // Check if all page accessible
                const last_page = dt.body.data.last_page
                cy.templatePagination(url, last_page, token)
            })
        })
    })

    it('TC-INT-IN-002 : User Can See All Inventory With Custom Item Per Page', () => {
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
            }).as('UserCanSeeAllInventoryWithCustomItemPerPage')
            cy.get('@UserCanSeeAllInventoryWithCustomItemPerPage').then(dt => {
                validateValidResponse(dt)

                // Check if item per page query same with data.length
                const data = dt.body.data.data
                cy.expect(data.length).to.equal(itemPerPage)
            })
        })
    })

    it('TC-INT-IN-003 : User Cant See All Inventory With Custom Invalid Item Per Page', () => {
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
            }).as('UserCantSeeAllInventoryWithCustomInvalidItemPerPage')
            cy.get('@UserCantSeeAllInventoryWithCustomInvalidItemPerPage').then(dt => {
                cy.templateGet(400,dt, null)
                expect(dt.body.message).contain('per_page_key is not a valid page')
                
                // Get Item Holder
                const res = dt.body
                expect(res).to.not.have.property('data')
            })
        })
    })

    it('TC-INT-IN-004 : User Cant See All Inventory With Empty Data', () => {
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
            }).as('UserCantSeeAllInventoryWithEmptyData')
            cy.get('@UserCantSeeAllInventoryWithEmptyData').then(dt => {
                cy.templateGet(404,dt, null)
                expect(dt.body.message).contain('inventory not found')
                
                // Get Item Holder
                const res = dt.body
                expect(res).to.not.have.property('data')
            })
        })
    })

    it('TC-INT-IN-005 : User Cant See All Inventory With Invalid Auth', () => {
        cy.request({
            method: method,
            url,
            headers: {
                Accept: `application/json`
            },
            failOnStatusCode: false,
        }).as('UserCantSeeAllInventoryWithInvalidAuth')
        cy.get('@UserCantSeeAllInventoryWithInvalidAuth').then(dt => {
            cy.templateGet(401,dt, null)
            expect(dt.body.message).contain('you need to include the authorization token from login')
            
            // Get Item Holder
            const res = dt.body
            expect(res).to.not.have.property('data')
        })
    })

    it('TC-INT-IN-006 : User Cant See All Inventory With Custom Invalid Vehicle Id (UUID)', () => {
        const payload = {
            username : "flazefy",
            password: 'nopass123',
        }
        const vehicleId = '1'

        cy.templateIntegrationLoginAPI(payload.username, payload.password).then(token => {
            cy.request({
                method: method,
                url: `${url}?vehicle_id=${vehicleId}`,
                headers: {
                    Authorization: `Bearer ${token}`
                },
                failOnStatusCode: false,
            }).as('UserCantSeeAllInventoryWithCustomInvalidVehicleId(UUID)')
            cy.get('@UserCantSeeAllInventoryWithCustomInvalidVehicleId(UUID)').then(dt => {
                cy.templateGet(400,dt, null)
                expect(dt.body.message).contain('vehicle_id must be a valid UUID')
                
                // Get Item Holder
                const res = dt.body
                expect(res).to.not.have.property('data')
            })
        })
    })

    it('TC-INT-IN-007 : User Cant See All Inventory With Custom Invalid Vehicle Id (Not Found)', () => {
        const payload = {
            username : "flazefy",
            password: 'nopass123',
        }
        const vehicleId = 'a5add64f-fdf8-1eba-0498-c1a000737c81'

        cy.templateIntegrationLoginAPI(payload.username, payload.password).then(token => {
            cy.request({
                method: method,
                url: `${url}?vehicle_id=${vehicleId}`,
                headers: {
                    Authorization: `Bearer ${token}`
                },
                failOnStatusCode: false,
            }).as('UserCantSeeAllInventoryWithCustomInvalidVehicleId(NotFound)')
            cy.get('@UserCantSeeAllInventoryWithCustomInvalidVehicleId(NotFound)').then(dt => {
                cy.templateGet(404,dt, null)
                expect(dt.body.message).contain('inventory not found')
                
                // Get Item Holder
                const res = dt.body
                expect(res).to.not.have.property('data')
            })
        })
    })

    it('TC-INT-IN-008 : User Can See All Inventory With Custom Search', () => {
        const payload = {
            username : "flazefy",
            password: 'nopass123',
        }
        const search = 'Sponge'

        cy.templateIntegrationLoginAPI(payload.username, payload.password).then(token => {
            cy.request({
                method: method,
                url: `${url}?search=${search}`,
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).as('UserCanSeeAllInventoryWithCustomSearch')
            cy.get('@UserCanSeeAllInventoryWithCustomSearch').then(dt => {
                validateValidResponse(dt)

                // Check if all page accessible
                const last_page = dt.body.data.last_page
                cy.templatePagination(url, last_page, token)
            })
        })
    })

    it('TC-INT-IN-009 : User Cant See All Inventory With Failed Custom Search', () => {
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
            }).as('UserCantSeeAllInventoryWithFailedCustomSearch')
            cy.get('@UserCantSeeAllInventoryWithFailedCustomSearch').then(dt => {
                cy.templateGet(404,dt, null)
                expect(dt.body.message).contain('inventory not found')
                
                // Get Item Holder
                const res = dt.body
                expect(res).to.not.have.property('data')
            })
        })
    })
})