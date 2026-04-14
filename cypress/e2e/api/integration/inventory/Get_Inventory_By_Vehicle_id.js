import '../../../../support/template'

describe('MyRide Integration Test - Inventory - Get : Inventory By Vehicle Id', () => {
    const method = 'get'
    const url = '/api/v1/inventory/vehicle'

    const validateValidResponse = (dt) => {
        cy.templateGet(200,dt, null)
        expect(dt.body.message).contain('inventory fetched')
        
        // Get Item Holder
        const res = dt.body
        expect(res).to.have.property('data')
        const data = res.data
        expect(data).to.be.an('array')

        // Get List Key / Column
        const stringFields = ['id','inventory_name','inventory_category','inventory_storage','created_at']
        const intFields = ['inventory_qty']

        // Validate Column
        cy.templateValidateColumn(data, stringFields, 'string', false)
        cy.templateValidateColumn(data, intFields, 'number', false)

        // Validate Contain
        cy.templateValidateContain(data, ['Glove Compartment', 'Trunk', 'Dashboard', 'Back Seat Pocket', 'Roof Box'], 'inventory_storage')
        cy.templateValidateContain(data, ['Safety', 'Maintenance', 'Electronics', 'Documents','Accessoris'], 'inventory_category')

        // Validate datetime
        const columnDateTime = [
            { column_name : 'created_at', date_type: 'datetime', nullable: false }
        ]
        cy.templateValidateDateTime(data, columnDateTime)
    }

    it('TC-INT-IN-010 : User Can See Inventory By Vehicle Id With Valid Data', () => {
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
                }
            }).as('UserCanSeeInventoryByVehicleIdWithValidData')
            cy.get('@UserCanSeeInventoryByVehicleIdWithValidData').then(dt => {
                validateValidResponse(dt)
            })
        })
    })

    it('TC-INT-IN-011 : User Cant See Inventory By Vehicle Id With Empty Data', () => {
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
            }).as('UserCantSeeInventoryByVehicleIdWithEmptyData')
            cy.get('@UserCantSeeInventoryByVehicleIdWithEmptyData').then(dt => {
                cy.templateGet(404,dt, null)
                expect(dt.body.message).contain('inventory not found')
                
                // Get Item Holder
                const res = dt.body
                expect(res).to.not.have.property('data')
            })
        })
    })

    it('TC-INT-IN-012 : User Cant See Inventory By Vehicle Id With Invalid Auth', () => {
        const vehicleId = '7d53371a-e363-2ad3-25fe-180dae88c062'

        cy.request({
            method: method,
            url: `${url}/${vehicleId}`,
            headers: {
                Accept: `application/json`
            },
            failOnStatusCode: false,
        }).as('UserCantSeeInventoryByVehicleIdWithInvalidAuth')
        cy.get('@UserCantSeeInventoryByVehicleIdWithInvalidAuth').then(dt => {
            cy.templateGet(401,dt, null)
            expect(dt.body.message).contain('you need to include the authorization token from login')
            
            // Get Item Holder
            const res = dt.body
            expect(res).to.not.have.property('data')
        })
    })

    it('TC-INT-IN-013 : User Cant See Inventory By Vehicle Id With Custom Invalid Vehicle Id (UUID)', () => {
        const payload = {
            username : "flazefy",
            password: 'nopass123',
        }
        const vehicleId = '1'

        cy.templateIntegrationLoginAPI(payload.username, payload.password).then(token => {
            cy.request({
                method: method,
                url: `${url}/${vehicleId}`,
                headers: {
                    Authorization: `Bearer ${token}`
                },
                failOnStatusCode: false,
            }).as('UserCantSeeInventoryByVehicleIdWithCustomInvalidVehicleId(UUID)')
            cy.get('@UserCantSeeInventoryByVehicleIdWithCustomInvalidVehicleId(UUID)').then(dt => {
                cy.templateGet(400,dt, null)
                expect(dt.body.message).contain('vehicle_id must be a valid UUID')
                
                // Get Item Holder
                const res = dt.body
                expect(res).to.not.have.property('data')
            })
        })
    })

    it('TC-INT-IN-014 : User Cant See Inventory By Vehicle Id With Custom Invalid Vehicle Id (Not Found)', () => {
        const payload = {
            username : "flazefy",
            password: 'nopass123',
        }
        const vehicleId = 'a5add64f-fdf8-1eba-0498-c1a000737c80'

        cy.templateIntegrationLoginAPI(payload.username, payload.password).then(token => {
            cy.request({
                method: method,
                url: `${url}/${vehicleId}`,
                headers: {
                    Authorization: `Bearer ${token}`
                },
                failOnStatusCode: false,
            }).as('UserCantSeeInventoryByVehicleIdWithCustomInvalidVehicleId(NotFound)')
            cy.get('@UserCantSeeInventoryByVehicleIdWithCustomInvalidVehicleId(NotFound)').then(dt => {
                cy.templateGet(404,dt, null)
                expect(dt.body.message).contain('vehicle not found')
                
                // Get Item Holder
                const res = dt.body
                expect(res).to.not.have.property('data')
            })
        })
    })
})