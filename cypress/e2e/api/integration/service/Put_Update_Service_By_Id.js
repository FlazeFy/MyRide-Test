import '../../../../support/template'
import basePayload from '../../../resources/data/service.json'

describe('Integration Test - Service - Put : Update Service By Id', () => {
    const id = '4a75a7be-281f-685e-0fde-999b279b7ed5'
    const method = 'put'
    const url = `/api/v1/service/${id}`

    const testCases = [
        {
            title: "TC-INT-SV-032 : User Cant Update Service History Using Invalid Rules For Service Category",
            alias: "UserCantUpdateServiceHistoryUsingInvalidRulesForServiceRon",
            payload: {
                service_category: "Refuel"
            },
            expected_status: 400,
            expected_response: {
                service_category: ["Service Category is not available"]
            }
        },
        {
            title: "TC-INT-SV-033 : User Cant Update Service History Using Invalid Service Price Total",
            alias: "UserCantUpdateServiceHistoryUsingInvalidServicePriceTotal",
            payload: {
                service_price_total: -1500000
            },
            expected_status: 400,
            expected_response: {
                service_price_total: ["The service price total field must be at least 1."]
            }
        },
        {
            title: "TC-INT-SV-034 : User Cant Update Service History Using Empty Service Note",
            alias: "UserCantUpdateServiceHistoryUsingEmptyServiceNote",
            payload: {
                service_note: null
            },
            expected_status: 400,
            expected_response: {
                service_note: ["The service note field is required."]
            }
        },
        {
            title: "TC-INT-SV-035 : User Cant Update Service History Using Invalid Vehicle Id (UUID)",
            alias: "UserCantUpdateServiceHistoryUsingInvalidVehicleId(UUID)",
            payload: {
                vehicle_id: "1"
            },
            expected_status: 400,
            expected_response: {
                vehicle_id: ["The vehicle id field must be 36 characters."]
            }
        },
        {
            title: "TC-INT-SV-036 : User Cant Update Service History Using Invalid Vehicle Id (Not Found)",
            alias: "UserCantUpdateServiceHistoryUsingInvalidVehicleId(NotFound)",
            payload: {
                vehicle_id: "7d53371a-e363-2ad3-25fe-180dae88c069"
            },
            expected_status: 404,
            expected_response: "vehicle not found"
        },
        {
            title: "TC-INT-SV-037 : User Cant Update Service History Using Invalid Remind At Datetime Format",
            alias: "UserCantUpdateServiceHistoryUsingInvalidRemindAtDatetimeFormat",
            payload: {
                remind_at: "2026-01-16"
            },
            expected_status: 400,
            expected_response: {
                remind_at: ["The remind at field must match the format Y-m-d H:i:s."]
            }
        },
        {
            title: "TC-INT-SV-038 : User Cant Update Service History Using Invalid Remind At (Remind At Before Updated At)",
            alias: "UserCantUpdateServiceHistoryUsingInvalidRemindAt(RemindAtBeforeUpdatedAt)",
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
        username : "flazefy",
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
    it('TC-INT-SV-039 : User Cant Update Service History Using Invalid Auth', () => {
        const payload = {
            ...basePayload
        }

        cy.request({
            method,
            url,
            body: payload,
            failOnStatusCode: false,
        }).as('UserCantUpdateServiceHistoryUsingInvalidAuth')
        cy.get('@UserCantUpdateServiceHistoryUsingInvalidAuth').then(dt => {
            cy.templateDelete(dt, 401, 'you need to include the authorization token from login')
        })
    })

    // Positive Test Case
    it('TC-INT-SV-040 : User Can Update Service History Using Valid Data', () => {
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
            }).as('UserCanUpdateServiceHistoryUsingValidData')
            cy.get('@UserCanUpdateServiceHistoryUsingValidData').then(dt => {
                cy.templateDelete(dt, 200, 'service updated')
            })
        })
    })
})