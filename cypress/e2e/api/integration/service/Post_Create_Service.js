import '../../../../support/template'
import basePayload from '../../../resources/data/service.json'

describe('Integration Test - Service - Post : Create Service', () => {
    const method = 'post'
    const url = '/api/v1/service'

    const testCases = [
        {
            title: "TC-INT-SV-023 : User Cant Create Service History Using Invalid Rules For Service Category",
            alias: "UserCantCreateServiceHistoryUsingInvalidRulesForServiceRon",
            payload: {
                service_category: "Refuel"
            },
            expected_status: 400,
            expected_response: {
                service_category: ["Service Category is not available"]
            }
        },
        {
            title: "TC-INT-SV-024 : User Cant Create Service History Using Invalid Service Price Total",
            alias: "UserCantCreateServiceHistoryUsingInvalidServicePriceTotal",
            payload: {
                service_price_total: -1500000
            },
            expected_status: 400,
            expected_response: {
                service_price_total: ["The service price total field must be at least 1."]
            }
        },
        {
            title: "TC-INT-SV-025 : User Cant Create Service History Using Empty Service Note",
            alias: "UserCantCreateServiceHistoryUsingEmptyServiceNote",
            payload: {
                service_note: null
            },
            expected_status: 400,
            expected_response: {
                service_note: ["The service note field is required."]
            }
        },
        {
            title: "TC-INT-SV-026 : User Cant Create Service History Using Invalid Vehicle Id (UUID)",
            alias: "UserCantCreateServiceHistoryUsingInvalidVehicleId(UUID)",
            payload: {
                vehicle_id: "1"
            },
            expected_status: 400,
            expected_response: {
                vehicle_id: ["The vehicle id field must be 36 characters."]
            }
        },
        {
            title: "TC-INT-SV-027 : User Cant Create Service History Using Invalid Vehicle Id (Not Found)",
            alias: "UserCantCreateServiceHistoryUsingInvalidVehicleId(NotFound)",
            payload: {
                vehicle_id: "7d53371a-e363-2ad3-25fe-180dae88c069"
            },
            expected_status: 404,
            expected_response: "vehicle not found"
        },
        {
            title: "TC-INT-SV-028 : User Cant Create Service History Using Invalid Remind At Datetime Format",
            alias: "UserCantCreateServiceHistoryUsingInvalidRemindAtDatetimeFormat",
            payload: {
                remind_at: "2026-01-16"
            },
            expected_status: 400,
            expected_response: {
                remind_at: ["The remind at field must match the format Y-m-d H:i:s."]
            }
        },
        {
            title: "TC-INT-SV-029 : User Cant Create Service History Using Invalid Remind At (Remind At Before Created At)",
            alias: "UserCantCreateServiceHistoryUsingInvalidRemindAt(RemindAtBeforeCreatedAt)",
            payload: {
                remind_at: "2026-01-12 00:00:08"
            },
            expected_status: 400,
            expected_response: {
                remind_at: ["The remind at field must be a date after or equal to created at."]
            }
        }
    ]

    const payloadAuth = {
        username : "flazen.edu",
        password: 'nopass123'
    }

    // Looping Negative Test Case
    testCases.forEach(tc => {
        it(tc.title, () => {
            const payload = {
                ...basePayload,
                ...tc.payload
            }

            if (tc.payload.service_note === null) delete payload.service_note

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
    it('TC-INT-SV-030 : User Cant Create Service History Using Invalid Auth', () => {
        const payload = {
            ...basePayload
        }

        cy.request({
            method,
            url,
            body: payload,
            failOnStatusCode: false,
        }).as('UserCantCreateServiceHistoryUsingInvalidAuth')
        cy.get('@UserCantCreateServiceHistoryUsingInvalidAuth').then(dt => {
            cy.templateDelete(dt, 401, 'you need to include the authorization token from login')
        })
    })

    // Positive Test Case
    it('TC-INT-SV-031 : User Can Create Service History Using Valid Data', () => {
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
            }).as('UserCanCreateServiceHistoryUsingValidData')
            cy.get('@UserCanCreateServiceHistoryUsingValidData').then(dt => {
                cy.templateDelete(dt, 201, 'service created')
            })
        })
    })
})