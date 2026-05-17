import '../../../../support/template'
import basePayload from '../../../resources/data/inventory.json'

describe('Integration Test - Inventory - Put : Update Inventory By ID', () => {
    const id = 'd253ebdc-b7c1-da7c-1bed-053201f7f748'
    const method = 'put'
    const url = `/api/v1/inventory/${id}`

    const testCases = [
        {
            title: 'TC-INT-IN-025 : User Cant Update Inventory Using Invalid Rules For Inventory Category',
            alias: 'UserCantUpdateInventoryUsingInvalidRulesForInventoryCategory',
            payload: {
                inventory_category: 'Food'
            },
            expected_status: 400,
            expected_response: {
                inventory_category: ['Inventory Category is not available']
            }
        },
        {
            title: 'TC-INT-IN-026 : User Cant Update Inventory Using Invalid Inventory Qty',
            alias: 'UserCantUpdateInventoryUsingInvalidInventoryQty',
            payload: {
                inventory_qty: 0
            },
            expected_status: 400,
            expected_response: {
                inventory_qty: ['The inventory qty field must be at least 1.']
            }
        },
        {
            title: 'TC-INT-IN-027 : User Cant Update Inventory Using Empty Inventory Name',
            alias: 'UserCantUpdateInventoryUsingEmptyInventoryName',
            payload: {
                inventory_name: null
            },
            expected_status: 400,
            expected_response: {
                inventory_name: ['The inventory name field is required.']
            }
        },
        {
            title: 'TC-INT-IN-028 : User Cant Update Inventory Using Invalid Vehicle Id (UUID)',
            alias: 'UserCantUpdateInventoryUsingInvalidVehicleId(UUID)',
            payload: {
                vehicle_id: '1'
            },
            expected_status: 400,
            expected_response: {
                vehicle_id: ['The vehicle id field must be 36 characters.']
            }
        },
        {
            title: 'TC-INT-IN-029 : User Cant Update Inventory Using Invalid Vehicle Id (Not Found)',
            alias: 'UserCantUpdateInventoryUsingInvalidVehicleId(NotFound)',
            payload: {
                vehicle_id: '7d53371a-e363-2ad3-25fe-180dae88c069'
            },
            expected_status: 404,
            expected_response: 'vehicle not found'
        }
    ]

    const payloadAuth = {
        username : 'flazefy',
        password: 'nopass123'
    }

    // Looping Negative Test Case
    testCases.forEach(tc => {
        it(tc.title, () => {
            const payload = {
                ...basePayload,
                ...tc.payload
            }

            if (tc.payload.inventory_name === null) delete payload.inventory_name

            cy.templateIntegrationLoginAPI(payloadAuth.username, payloadAuth.password).then(token => {
                cy.request({
                    method,
                    url,
                    headers: {
                        Authorization: `Bearer ${token}`
                    },
                    body: payload,
                    failOnStatusCode: false,
                }).as(tc.alias)
                cy.get(`@${tc.alias}`).then(dt => {
                    cy.templateDelete(dt, tc.expected_status, tc.expected_response)
                })
            })
        })
    })

    // Invalid Auth
    it('TC-INT-IN-030 : User Cant Update Inventory Using Invalid Auth', () => {
        const payload = {
            ...basePayload
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

    // Positive Test Case
    it('TC-INT-IN-031 : User Can Update Inventory Using Valid Data', () => {
        const payload = {
            ...basePayload
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