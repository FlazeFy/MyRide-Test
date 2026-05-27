import '../../../../support/template'
import basePayload from '../../../resources/data/inventory.json'

describe('Integration Test - Inventory - Post : Create Inventory', () => {
    const method = 'post'
    const url = '/api/v1/inventory'

    const testCases = [
        {
            title: 'TC-INT-IN-018 : User Cant Create Inventory Using Invalid Rules For Inventory Category',
            alias: 'UserCantCreateInventoryUsingInvalidRulesForInventoryCategory',
            payload: {
                inventory_category: 'Food'
            },
            expected_status: 400,
            expected_response: {
                inventory_category: ['Inventory Category is not available']
            }
        },
        {
            title: 'TC-INT-IN-019 : User Cant Create Inventory Using Invalid Inventory Qty',
            alias: 'UserCantCreateInventoryUsingInvalidInventoryQty',
            payload: {
                inventory_qty: 0
            },
            expected_status: 400,
            expected_response: {
                inventory_qty: ['The inventory qty field must be at least 1.']
            }
        },
        {
            title: 'TC-INT-IN-020 : User Cant Create Inventory Using Empty Inventory Name',
            alias: 'UserCantCreateInventoryUsingEmptyInventoryName',
            payload: {
                inventory_name: null
            },
            expected_status: 400,
            expected_response: {
                inventory_name: ['The inventory name field is required.']
            }
        },
        {
            title: 'TC-INT-IN-021 : User Cant Create Inventory Using Invalid Vehicle Id (UUID)',
            alias: 'UserCantCreateInventoryUsingInvalidVehicleId(UUID)',
            payload: {
                vehicle_id: '1'
            },
            expected_status: 400,
            expected_response: {
                vehicle_id: ['The vehicle id field must be 36 characters.']
            }
        },
        {
            title: 'TC-INT-IN-022 : User Cant Create Inventory Using Invalid Vehicle Id (Not Found)',
            alias: 'UserCantCreateInventoryUsingInvalidVehicleId(NotFound)',
            payload: {
                vehicle_id: '7d53371a-e363-2ad3-25fe-180dae88c069'
            },
            expected_status: 404,
            expected_response: 'vehicle not found'
        }
    ]

    const payloadAuth = {
        username : 'flazen.edu',
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
    it('TC-INT-IN-023 : User Cant Create Inventory Using Invalid Auth', () => {
        const payload = {
            ...basePayload
        }

        cy.request({
            method,
            url,
            body: payload,
            failOnStatusCode: false,
        }).as('UserCantCreateInventoryUsingInvalidAuth')
        cy.get('@UserCantCreateInventoryUsingInvalidAuth').then(dt => {
            cy.templateDelete(dt, 401, 'you need to include the authorization token from login')
        })
    })

    // Positive Test Case
    it('TC-INT-IN-024 : User Can Create Inventory Using Valid Data', () => {
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
            }).as('UserCanCreateInventoryUsingValidData')
            cy.get('@UserCanCreateInventoryUsingValidData').then(dt => {
                cy.templateDelete(dt, 201, 'inventory created')
            })
        })
    })
})