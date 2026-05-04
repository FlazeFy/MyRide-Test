import '../../../../support/template'

describe('MyRide Integration Test - Inventory - Post : Create Inventory', () => {
    const method = 'post'
    const url = '/api/v1/inventory'

    it('TC-INT-IN-018 : User Cant Create Inventory Using Invalid Rules For Inventory Category', () => {
        const payloadAuth = {
            username : "flazefy",
            password: 'nopass123'
        }
        const payload = {
            vehicle_id: '7d53371a-e363-2ad3-25fe-180dae88c062',
            inventory_name: 'Secondary Tire',
            inventory_category: 'Food',
            inventory_qty: 2,
            inventory_storage: 'Roof Box'
        }

        cy.templateIntegrationLoginAPI(payloadAuth.username, payloadAuth.password).then(token => {
            cy.request({
                method: method,
                url,
                headers: {
                    Authorization: `Bearer ${token}`
                },
                body: payload,
                failOnStatusCode: false,
            }).as('UserCantCreateInventoryUsingInvalidRulesForInventoryCategory')
            cy.get('@UserCantCreateInventoryUsingInvalidRulesForInventoryCategory').then(dt => {
                cy.templateDelete(dt, 400, {
                    "inventory_category": ["Inventory Category is not available"]
                })
            })
        })
    })

    it('TC-INT-IN-019 : User Cant Create Inventory Using Invalid Inventory Qty', () => {
        const payloadAuth = {
            username : "flazefy",
            password: 'nopass123'
        }
        const payload = {
            vehicle_id: '7d53371a-e363-2ad3-25fe-180dae88c062',
            inventory_name: 'Secondary Tire',
            inventory_category: 'Personal',
            inventory_qty: 0,
            inventory_storage: 'Roof Box'
        }

        cy.templateIntegrationLoginAPI(payloadAuth.username, payloadAuth.password).then(token => {
            cy.request({
                method: method,
                url,
                headers: {
                    Authorization: `Bearer ${token}`
                },
                body: payload,
                failOnStatusCode: false,
            }).as('UserCantCreateInventoryUsingInvalidInventoryQty')
            cy.get('@UserCantCreateInventoryUsingInvalidInventoryQty').then(dt => {
                cy.templateDelete(dt, 400, {
                    "inventory_qty": ["The inventory qty field must be at least 1."]
                })
            })
        })
    })

    it('TC-INT-IN-020 : User Cant Create Inventory Using Empty Inventory Name', () => {
        const payloadAuth = {
            username : "flazefy",
            password: 'nopass123',
        }
        const payload = {
            vehicle_id: '7d53371a-e363-2ad3-25fe-180dae88c062',
            inventory_category: 'Personal',
            inventory_qty: 2,
            inventory_storage: 'Roof Box'
        }

        cy.templateIntegrationLoginAPI(payloadAuth.username, payloadAuth.password).then(token => {
            cy.request({
                method: method,
                url,
                headers: {
                    Authorization: `Bearer ${token}`
                },
                body: payload,
                failOnStatusCode: false,
            }).as('UserCantCreateInventoryUsingEmptyInventoryName')
            cy.get('@UserCantCreateInventoryUsingEmptyInventoryName').then(dt => {
                cy.templateDelete(dt, 400, {
                    "inventory_name": ["The inventory name field is required."]
                })
            })
        })
    })

    it('TC-INT-IN-021 : User Cant Create Inventory Using Invalid Vehicle Id (UUID)', () => {
        const payloadAuth = {
            username : "flazefy",
            password: 'nopass123'
        }
        const payload = {
            vehicle_id: '1',
            inventory_name: 'Secondary Tire',
            inventory_category: 'Personal',
            inventory_qty: 2,
            inventory_storage: 'Roof Box'
        }

        cy.templateIntegrationLoginAPI(payloadAuth.username, payloadAuth.password).then(token => {
            cy.request({
                method: method,
                url,
                headers: {
                    Authorization: `Bearer ${token}`
                },
                body: payload,
                failOnStatusCode: false,
            }).as('UserCantCreateInventoryUsingInvalidVehicleId(UUID)')
            cy.get('@UserCantCreateInventoryUsingInvalidVehicleId(UUID)').then(dt => {
                cy.templateDelete(dt, 400, {
                    "vehicle_id": ["The vehicle id field must be 36 characters."]
                })
            })
        })
    })

    it('TC-INT-IN-022 : User Cant Create Inventory Using Invalid Vehicle Id (Not Found)', () => {
        const payloadAuth = {
            username : "flazefy",
            password: 'nopass123'
        }
        const payload = {
            vehicle_id: '7d53371a-e363-2ad3-25fe-180dae88c069',
            inventory_name: 'Secondary Tire',
            inventory_category: 'Personal',
            inventory_qty: 2,
            inventory_storage: 'Roof Box'
        }

        cy.templateIntegrationLoginAPI(payloadAuth.username, payloadAuth.password).then(token => {
            cy.request({
                method: method,
                url,
                headers: {
                    Authorization: `Bearer ${token}`
                },
                body: payload,
                failOnStatusCode: false,
            }).as('UserCantCreateInventoryUsingInvalidVehicleId(NotFound)')
            cy.get('@UserCantCreateInventoryUsingInvalidVehicleId(NotFound)').then(dt => {
                cy.templateDelete(dt, 404, 'vehicle not found')
            })
        })
    })

    it('TC-INT-IN-023 : User Cant Create Inventory Using Invalid Auth', () => {
        const payload = {
            vehicle_id: '7d53371a-e363-2ad3-25fe-180dae88c062',
            inventory_name: 'Secondary Tire',
            inventory_category: 'Personal',
            inventory_qty: 2,
            inventory_storage: 'Roof Box'
        }

        cy.request({
            method: method,
            url,
            body: payload,
            failOnStatusCode: false,
        }).as('UserCantCreateInventoryUsingInvalidAuth')
        cy.get('@UserCantCreateInventoryUsingInvalidAuth').then(dt => {
            cy.templateDelete(dt, 401, 'you need to include the authorization token from login')
        })
    })

    it('TC-INT-IN-024 : User Can Create Inventory Using Valid Data', () => {
        const payloadAuth = {
            username : "flazefy",
            password: 'nopass123',
        }
        const payload = {
            vehicle_id: '7d53371a-e363-2ad3-25fe-180dae88c062',
            inventory_name: 'Secondary Tire',
            inventory_category: 'Personal',
            inventory_qty: 2,
            inventory_storage: 'Roof Box'
        }

        cy.templateIntegrationLoginAPI(payloadAuth.username, payloadAuth.password).then(token => {
            cy.request({
                method: method,
                url,
                headers: {
                    Authorization: `Bearer ${token}`
                },
                body: payload,
            }).as('UserCanCreateInventoryUsingValidData')
            cy.get('@UserCanCreateInventoryUsingValidData').then(dt => {
                cy.templateDelete(dt, 201, 'inventory created')
            })
        })
    })
})