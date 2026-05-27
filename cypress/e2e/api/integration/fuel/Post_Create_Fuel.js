import '../../../../support/template'
import basePayload from '../../../resources/data/fuel.json'

describe('Integration Test - Fuel - Post : Create Fuel', () => {
    const method = 'post'
    const url = '/api/v1/fuel'

    const testCases = [
        {
            title: 'TC-INT-FL-017 : User Cant Create Fuel History Using Invalid Rules For Fuel Ron',
            alias: 'UserCantCreateFuelHistoryUsingInvalidRulesForFuelRon',
            payload: {
                fuel_ron: '102'
            },
            expected_status: 400,
            expected_response: {
                fuel_ron: ['Fuel Ron is not available']
            }
        },
        {
            title: 'TC-INT-FL-018 : User Cant Create Fuel History Using Invalid Fuel Volume',
            alias: 'UserCantCreateFuelHistoryUsingInvalidFuelVolume',
            payload: {
                fuel_volume: 300
            },
            expected_status: 400,
            expected_response: {
                fuel_volume: ['The fuel volume field must not be greater than 99.']
            }
        },
        {
            title: 'TC-INT-FL-019 : User Cant Create Fuel History Using Empty Fuel Volume',
            alias: 'UserCantCreateFuelHistoryUsingEmptyFuelVolume',
            payload: {
                fuel_volume: null
            },
            expected_status: 400,
            expected_response: {
                fuel_volume: ['The fuel volume field is required.']
            }
        },
        {
            title: 'TC-INT-FL-020 : User Cant Create Fuel History Using Invalid Vehicle Id (UUID)',
            alias: 'UserCantCreateFuelHistoryUsingInvalidVehicleId(UUID)',
            payload: {
                vehicle_id: '1'
            },
            expected_status: 400,
            expected_response: {
                vehicle_id: ['The vehicle id field must be 36 characters.']
            }
        },
        {
            title: 'TC-INT-FL-021 : User Cant Create Fuel History Using Invalid Vehicle Id (Not Found)',
            alias: 'UserCantCreateFuelHistoryUsingInvalidVehicleId(NotFound)',
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

            if (tc.payload.fuel_volume === null) delete payload.fuel_volume

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
    it('TC-INT-FL-022 : User Cant Create Fuel History Using Invalid Auth', () => {
        const payload = {
            ...basePayload
        }

        cy.request({
            method,
            url,
            body: payload,
            failOnStatusCode: false,
        }).as('UserCantCreateFuelHistoryUsingInvalidAuth')
        cy.get('@UserCantCreateFuelHistoryUsingInvalidAuth').then(dt => {
            cy.templateDelete(dt, 401, 'you need to include the authorization token from login')
        })
    })

    // Positive Test Case
    it('TC-INT-FL-023 : User Can Create Fuel History Using Valid Data', () => {
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
            }).as('UserCanCreateFuelHistoryUsingValidData')
            cy.get('@UserCanCreateFuelHistoryUsingValidData').then(dt => {
                cy.templateDelete(dt, 201, 'fuel created')
            })
        })
    })
})