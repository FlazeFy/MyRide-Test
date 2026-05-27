import '../../../../support/template'
import basePayload from '../../../resources/data/wash.json'

describe('Integration Test - Wash - Put : Update Wash By Id', () => {
    const id = '6e0187c5-ddd0-15d1-0add-5c57a649a792'
    const method = 'put'
    const url = `/api/v1/wash/${id}`

    const payloadAuth = {
        username : "flazen.edu",
        password: 'nopass123'
    }

    const testCases = [
        {
            title: 'TC-INT-WS-034 : User Cant Update Wash History Using Invalid Rules For Wash By',
            alias: 'UserCantUpdateWashHistoryUsingInvalidRulesForWashBy',
            payload: {
                wash_by: 'Stranger'
            },
            expected_status: 400,
            expected_response: {
                wash_by: ["Wash By is not available"]
            }
        },
        {
            title: 'TC-INT-WS-035 : User Cant Update Wash History Using Invalid Wash Price',
            alias: 'UserCantUpdateWashHistoryUsingInvalidWashPrice',
            payload: {
                wash_price: -100000
            },
            expected_status: 400,
            expected_response: {
                wash_price: ["The wash price field must be at least 1."]
            }
        },
        {
            title: 'TC-INT-WS-036 : User Cant Update Wash History Using Invalid Wash Address Character Length',
            alias: 'UserCantUpdateWashHistoryUsingInvalidWashAddressCharacterLength',
            payload: {
                wash_address: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
            },
            expected_status: 400,
            expected_response: {
                wash_address: ["The wash address field must not be greater than 75 characters."]
            }
        },
        {
            title: 'TC-INT-WS-037 : User Cant Update Wash History Using Empty Wash Start Time',
            alias: 'UserCantUpdateWashHistoryUsingEmptyWashStartTime',
            payload: {
                wash_start_time: null
            },
            expected_status: 400,
            expected_response: {
                wash_start_time: ["The wash start time field is required."]
            }
        },
        {
            title: 'TC-INT-WS-038 : User Cant Update Wash History Using Invalid Vehicle Id (UUID)',
            alias: 'UserCantUpdateWashHistoryUsingInvalidVehicleId(UUID)',
            payload: {
                vehicle_id: '1'
            },
            expected_status: 400,
            expected_response: {
                vehicle_id: ["The vehicle id field must be 36 characters."]
            }
        },
        {
            title: 'TC-INT-WS-039 : User Cant Update Wash History Using Invalid Vehicle Id (Not Found)',
            alias: 'UserCantUpdateWashHistoryUsingInvalidVehicleId(NotFound)',
            payload: {
                vehicle_id: '7d53371a-e363-2ad3-25fe-180dae88c069'
            },
            expected_status: 404,
            expected_response: 'vehicle not found'
        },
        {
            title: 'TC-INT-WS-040 : User Cant Update Wash History Using Invalid Wash Start Time Datetime Format',
            alias: 'UserCantUpdateWashHistoryUsingInvalidWashStartTimeDatetimeFormat',
            payload: {
                wash_start_time: '2026-01-14'
            },
            expected_status: 400,
            expected_response: {
                wash_start_time: ["The wash start time field must match the format Y-m-d H:i:s."]
            }
        },
        {
            title: 'TC-INT-WS-041 : User Cant Update Wash History Using Invalid Wash End Time (Wash End Time Same With Start Time)',
            alias: 'UserCantUpdateWashHistoryUsingInvalidWashEndTime(WashEndTimeSameWithStartTime)',
            payload: {
                wash_end_time: '2026-01-14 00:00:10'
            },
            expected_status: 400,
            expected_response: {
                wash_end_time: ["The wash end time field must be a date after wash start time."]
            }
        }
    ]

    // Negative Test Case
    testCases.forEach(tc => {
        it(tc.title, () => {
            const payload = {
                ...basePayload,
                ...tc.payload
            }

            if (tc.payload.wash_start_time === null) delete payload.wash_start_time

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
    it('TC-INT-WS-042 : User Cant Update Wash History Using Invalid Auth', () => {
        const payload = {
            ...basePayload
        }

        cy.request({
            method,
            url,
            body: payload,
            failOnStatusCode: false,
        }).as('UserCantUpdateWashHistoryUsingInvalidAuth')
        cy.get('@UserCantUpdateWashHistoryUsingInvalidAuth').then(dt => {
            cy.templateDelete(dt, 401, 'you need to include the authorization token from login')
        })
    })

    // Positive Test Case
    it('TC-INT-WS-043 : User Can Update Wash History Using Valid Data', () => {
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
            }).as('UserCanUpdateWashHistoryUsingValidData')
            cy.get('@UserCanUpdateWashHistoryUsingValidData').then(dt => {
                cy.templateDelete(dt, 200, 'wash updated')
            })
        })
    })
})