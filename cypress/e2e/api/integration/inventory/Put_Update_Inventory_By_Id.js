import '../../../../support/template'

describe('Integration Test - Inventory - Put : Update Inventory By ID', () => {
    const id = 'd253ebdc-b7c1-da7c-1bed-053201f7f748'
    const method = 'put'
    const url = `/api/v1/inventory/${id}`

    it('TC-INT-IN-025 : User Cant Update Inventory Using Invalid Rules For Inventory Category', () => {
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
                method,
                url,
                headers: {
                    Authorization: `Bearer ${token}`
                },
                body: payload,
                failOnStatusCode: false,
            }).as('UserCantUpdateInventoryUsingInvalidRulesForInventoryCategory')
            cy.get('@UserCantUpdateInventoryUsingInvalidRulesForInventoryCategory').then(dt => {
                cy.templateDelete(dt, 400, {
                    "inventory_category": ["Inventory Category is not available"]
                })
            })
        })
    })

    it('TC-INT-IN-026 : User Cant Update Inventory Using Invalid Inventory Qty', () => {
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
                method,
                url,
                headers: {
                    Authorization: `Bearer ${token}`
                },
                body: payload,
                failOnStatusCode: false,
            }).as('UserCantUpdateInventoryUsingInvalidInventoryQty')
            cy.get('@UserCantUpdateInventoryUsingInvalidInventoryQty').then(dt => {
                cy.templateDelete(dt, 400, {
                    "inventory_qty": ["The inventory qty field must be at least 1."]
                })
            })
        })
    })

    it('TC-INT-IN-027 : User Cant Update Inventory Using Empty Inventory Name', () => {
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
                method,
                url,
                headers: {
                    Authorization: `Bearer ${token}`
                },
                body: payload,
                failOnStatusCode: false,
            }).as('UserCantUpdateInventoryUsingEmptyInventoryName')
            cy.get('@UserCantUpdateInventoryUsingEmptyInventoryName').then(dt => {
                cy.templateDelete(dt, 400, {
                    "inventory_name": ["The inventory name field is required."]
                })
            })
        })
    })

    it('TC-INT-IN-028 : User Cant Update Inventory Using Invalid Vehicle Id (UUID)', () => {
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
                method,
                url,
                headers: {
                    Authorization: `Bearer ${token}`
                },
                body: payload,
                failOnStatusCode: false,
            }).as('UserCantUpdateInventoryUsingInvalidVehicleId(UUID)')
            cy.get('@UserCantUpdateInventoryUsingInvalidVehicleId(UUID)').then(dt => {
                cy.templateDelete(dt, 400, {
                    "vehicle_id": ["The vehicle id field must be 36 characters."]
                })
            })
        })
    })

    it('TC-INT-IN-029 : User Cant Update Inventory Using Invalid Vehicle Id (Not Found)', () => {
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
                method,
                url,
                headers: {
                    Authorization: `Bearer ${token}`
                },
                body: payload,
                failOnStatusCode: false,
            }).as('UserCantUpdateInventoryUsingInvalidVehicleId(NotFound)')
            cy.get('@UserCantUpdateInventoryUsingInvalidVehicleId(NotFound)').then(dt => {
                console.log(dt)
                cy.templateDelete(dt, 404, 'vehicle not found')
            })
        })
    })

    it('TC-INT-IN-030 : User Cant Update Inventory Using Invalid Auth', () => {
        const payload = {
            vehicle_id: '7d53371a-e363-2ad3-25fe-180dae88c062',
            inventory_name: 'Secondary Tire',
            inventory_category: 'Personal',
            inventory_qty: 2,
            inventory_storage: 'Roof Box'
        }

        cy.request({
            method,
            url,
            body: payload,
            failOnStatusCode: false,
        }).as('UserCantUpdateInventoryUsingInvalidAuth')
        cy.get('@UserCantUpdateInventoryUsingInvalidAuth').then(dt => {
            cy.templateDelete(dt, 401, 'you need to include the authorization token from login')
        })
    })

    it('TC-INT-IN-031 : User Can Update Inventory Using Valid Data', () => {
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
                method,
                url,
                headers: {
                    Authorization: `Bearer ${token}`
                },
                body: payload,
            }).as('UserCanUpdateInventoryUsingValidData')
            cy.get('@UserCanUpdateInventoryUsingValidData').then(dt => {
                cy.templateDelete(dt, 200, 'inventory updated')
            })
        })
    })
})