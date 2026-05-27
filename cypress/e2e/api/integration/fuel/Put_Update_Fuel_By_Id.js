import '../../../../support/template'
import basePayload from '../../../resources/data/fuel.json'

describe('Integration Test - Fuel - Put : Update Fuel By ID', () => {
    const id = 'd253ebdc-b7c1-da7c-1bed-053201f7f748'
    const method = 'put'
    const url = `/api/v1/fuel/${id}`

    const testCases = [
        {
            title: 'TC-INT-FL-024 : User Cant Update Fuel History Using Invalid Rules For Fuel Ron',
            alias: 'UserCantUpdateFuelHistoryUsingInvalidRulesForFuelRon',
            payload: {
                fuel_ron: '102'
            },
            expected_status: 400,
            expected_response: {
                fuel_ron: ['Fuel Ron is not available']
            }
        },
        {
            title: 'TC-INT-FL-025 : User Cant Update Fuel History Using Invalid Fuel Volume',
            alias: 'UserCantUpdateFuelHistoryUsingInvalidFuelVolume',
            payload: {
                fuel_volume: 300
            },
            expected_status: 400,
            expected_response: {
                fuel_volume: ['The fuel volume field must not be greater than 99.']
            }
        },
        {
            title: 'TC-INT-FL-026 : User Cant Update Fuel History Using Empty Fuel Volume',
            alias: 'UserCantUpdateFuelHistoryUsingEmptyFuelVolume',
            payload: {
                fuel_volume: null
            },
            expected_status: 400,
            expected_response: {
                fuel_volume: ['The fuel volume field is required.']
            }
        },
        {
            title: 'TC-INT-FL-027 : User Cant Update Fuel History Using Invalid Vehicle Id (UUID)',
            alias: 'UserCantUpdateFuelHistoryUsingInvalidVehicleId(UUID)',
            payload: {
                vehicle_id: '1'
            },
            expected_status: 400,
            expected_response: {
                vehicle_id: ['The vehicle id field must be 36 characters.']
            }
        },
        {
            title: 'TC-INT-FL-028 : User Cant Update Fuel History Using Invalid Vehicle Id (Not Found)',
            alias: 'UserCantUpdateFuelHistoryUsingInvalidVehicleId(NotFound)',
            payload: {
                vehicle_id: '7d53371a-e363-2ad3-25fe-180dae88c069'
            },
            expected_status: 404,
            expected_response: 'vehicle not found'
        },
        {
            title: 'TC-INT-FL-029 : User Cant Update Fuel History Using Invalid Fuel Type (Based On Brand)',
            alias: 'UserCantUpdateFuelHistoryUsingInvalidFuelType(BasedOnBrand)',
            payload: {
                fuel_type: 'Dexlite'
            },
            expected_status: 400,
            expected_response: 'Fuel type is not available for Shell'
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
    it('TC-INT-FL-030 : User Cant Update Fuel History Using Invalid Auth', () => {
        const payload = {
            ...basePayload
        }

        cy.request({
            method,
            url,
            body: payload,
            failOnStatusCode: false,
        }).as('UserCantUpdateFuelHistoryUsingInvalidAuth')
        cy.get('@UserCantUpdateFuelHistoryUsingInvalidAuth').then(dt => {
            cy.templateDelete(dt, 401, 'you need to include the authorization token from login')
        })
    })

    // Positive Test Case
    it('TC-INT-FL-031 : User Can Update Fuel History Using Valid Data', () => {
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
            }).as('UserCanUpdateFuelHistoryUsingValidData')
            cy.get('@UserCanUpdateFuelHistoryUsingValidData').then(dt => {
                cy.templateDelete(dt, 200, 'fuel updated')
            })
        })
    })
})