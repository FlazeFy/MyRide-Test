import '../../../../support/template'

describe('MyRide Integration Test - Fuel - Get : All Fuel', () => {
    const method = 'get'
    const url = '/api/v1/fuel'

    const validateValidResponse = (dt) => {
        cy.templateGet(200,dt, null)
        expect(dt.body.message).contain('fuel fetched')
        
        // Get Item Holder
        const res = dt.body
        expect(res).to.have.property('data')
        const data = res.data
        expect(data).to.be.an('object')

        // Get List Key / Column
        const stringFields = ['id','vehicle_plate_number','vehicle_type','fuel_brand','created_at']
        const stringNullableFields = ['fuel_type','fuel_bill']
        const intFields = ['fuel_volume', 'fuel_price_total']
        const intNullableFields = ['fuel_ron']

        // Validate Column
        cy.templateValidateColumn(data.data, stringFields, 'string', false)
        cy.templateValidateColumn(data.data, stringNullableFields, 'string', true)
        cy.templateValidateColumn(data.data, intFields, 'number', false)
        cy.templateValidateColumn(data.data, intNullableFields, 'number', true)

        // Validate Contain
        cy.templateValidateContain(data.data, ['Pertamina','Vivo','BP','Shell','Electric'], 'fuel_brand')

        // Validate datetime
        const columnDateTime = [
            { column_name : 'created_at', date_type: 'datetime', nullable: true }
        ]
        cy.templateValidateDateTime(data.data, columnDateTime)
    }

    it('TC-INT-FL-001 : User Can See All Fuel With Valid Data', () => {
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
            }).as('UserCanSeeAllFuelWithValidData')
            cy.get('@UserCanSeeAllFuelWithValidData').then(dt => {
                validateValidResponse(dt)

                // Check if all page accessible
                const last_page = dt.body.data.last_page
                cy.templatePagination(url, last_page, token)
            })
        })
    })

    it('TC-INT-FL-002 : User Can See All Fuel With Custom Item Per Page', () => {
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
            }).as('UserCanSeeAllFuelWithCustomItemPerPage')
            cy.get('@UserCanSeeAllFuelWithCustomItemPerPage').then(dt => {
                validateValidResponse(dt)

                // Check if item per page query same with data.length
                const data = dt.body.data.data
                cy.expect(data.length).to.equal(itemPerPage)
            })
        })
    })

    it('TC-INT-FL-003 : User Cant See All Fuel With Custom Invalid Item Per Page', () => {
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
            }).as('UserCantSeeAllFuelWithCustomInvalidItemPerPage')
            cy.get('@UserCantSeeAllFuelWithCustomInvalidItemPerPage').then(dt => {
                cy.templateGet(400,dt, null)
                expect(dt.body.message).contain('per_page_key is not a valid page')
                
                // Get Item Holder
                const res = dt.body
                expect(res).to.not.have.property('data')
            })
        })
    })

    it('TC-INT-FL-004 : User Cant See All Fuel With Empty Data', () => {
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
            }).as('UserCantSeeAllFuelWithEmptyData')
            cy.get('@UserCantSeeAllFuelWithEmptyData').then(dt => {
                cy.templateGet(404,dt, null)
                expect(dt.body.message).contain('fuel not found')
                
                // Get Item Holder
                const res = dt.body
                expect(res).to.not.have.property('data')
            })
        })
    })

    it('TC-INT-FL-005 : User Cant See All Fuel With Invalid Auth', () => {
        cy.request({
            method: method,
            url,
            headers: {
                Accept: `application/json`
            },
            failOnStatusCode: false,
        }).as('UserCantSeeAllFuelWithInvalidAuth')
        cy.get('@UserCantSeeAllFuelWithInvalidAuth').then(dt => {
            cy.templateGet(401,dt, null)
            expect(dt.body.message).contain('you need to include the authorization token from login')
            
            // Get Item Holder
            const res = dt.body
            expect(res).to.not.have.property('data')
        })
    })

    it('TC-INT-FL-006 : User Cant See All Fuel With Custom Invalid Vehicle Id (UUID)', () => {
        const payload = {
            username : "flazefy",
            password: 'nopass123',
        }
        const fuelId = '1'

        cy.templateIntegrationLoginAPI(payload.username, payload.password).then(token => {
            cy.request({
                method: method,
                url: `${url}?vehicle_id=${fuelId}`,
                headers: {
                    Authorization: `Bearer ${token}`
                },
                failOnStatusCode: false,
            }).as('UserCantSeeAllFuelWithCustomInvalidVehicleId(UUID)')
            cy.get('@UserCantSeeAllFuelWithCustomInvalidVehicleId(UUID)').then(dt => {
                cy.templateGet(400,dt, null)
                expect(dt.body.message).contain('vehicle_id must be a valid UUID')
                
                // Get Item Holder
                const res = dt.body
                expect(res).to.not.have.property('data')
            })
        })
    })

    it('TC-INT-FL-007 : User Cant See All Fuel With Custom Invalid Vehicle Id (Not Found)', () => {
        const payload = {
            username : "flazefy",
            password: 'nopass123',
        }
        const fuelId = 'da79e9ba-bc19-2186-2f4d-c755ec841234'

        cy.templateIntegrationLoginAPI(payload.username, payload.password).then(token => {
            cy.request({
                method: method,
                url: `${url}?vehicle_id=${fuelId}`,
                headers: {
                    Authorization: `Bearer ${token}`
                },
                failOnStatusCode: false,
            }).as('UserCantSeeAllFuelWithCustomInvalidVehicleId(NotFound)')
            cy.get('@UserCantSeeAllFuelWithCustomInvalidVehicleId(NotFound)').then(dt => {
                cy.templateGet(404,dt, null)
                expect(dt.body.message).contain('fuel not found')
                
                // Get Item Holder
                const res = dt.body
                expect(res).to.not.have.property('data')
            })
        })
    })
})