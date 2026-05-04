import '../../../../support/template'

describe('MyRide Integration Test - Service - Post : Create Service', () => {
    const method = 'post'
    const url = '/api/v1/service'

    it('TC-INT-SV-023 : User Cant Create Service History Using Invalid Rules For Service Category', () => {
        const payloadAuth = {
            username : "flazefy",
            password: 'nopass123'
        }
        const payload = {
            vehicle_id: '7d53371a-e363-2ad3-25fe-180dae88c062',
            service_note: 'lorem ipsum',
            service_category: 'Refuel',
            service_location: 'Jl Tandean',
            service_price_total: 1500000,
            remind_at: '2026-01-16 00:00:08',
            created_at: '2026-01-14 00:00:08'
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
            }).as('UserCantCreateServiceHistoryUsingInvalidRulesForServiceRon')
            cy.get('@UserCantCreateServiceHistoryUsingInvalidRulesForServiceRon').then(dt => {
                cy.templateDelete(dt, 400, {
                    "service_category": ["Service Category is not available"]
                })
            })
        })
    })

    it('TC-INT-SV-024 : User Cant Create Service History Using Invalid Service Price Total', () => {
        const payloadAuth = {
            username : "flazefy",
            password: 'nopass123'
        }
        const payload = {
            vehicle_id: '7d53371a-e363-2ad3-25fe-180dae88c062',
            service_note: 'lorem ipsum',
            service_category: 'Inspection',
            service_location: 'Jl Tandean',
            service_price_total: -1500000,
            remind_at: '2026-01-16 00:00:08',
            created_at: '2026-01-14 00:00:08'
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
            }).as('UserCantCreateServiceHistoryUsingInvalidServicePriceTotal')
            cy.get('@UserCantCreateServiceHistoryUsingInvalidServicePriceTotal').then(dt => {
                cy.templateDelete(dt, 400, {
                    "service_price_total": ["The service price total field must be at least 1."]
                })
            })
        })
    })

    it('TC-INT-SV-025 : User Cant Create Service History Using Empty Service Note', () => {
        const payloadAuth = {
            username : "flazefy",
            password: 'nopass123',
        }
        const payload = {
            vehicle_id: '7d53371a-e363-2ad3-25fe-180dae88c062',
            service_category: 'Inspection',
            service_location: 'Jl Tandean',
            service_price_total: 1500000,
            remind_at: '2026-01-16 00:00:08',
            created_at: '2026-01-14 00:00:08'
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
            }).as('UserCantCreateServiceHistoryUsingEmptyServiceNote')
            cy.get('@UserCantCreateServiceHistoryUsingEmptyServiceNote').then(dt => {
                cy.templateDelete(dt, 400, {
                    "service_note": ["The service note field is required."]
                })
            })
        })
    })

    it('TC-INT-SV-026 : User Cant Create Service History Using Invalid Vehicle Id (UUID)', () => {
        const payloadAuth = {
            username : "flazefy",
            password: 'nopass123'
        }
        const payload = {
            vehicle_id: '1',
            service_note: 'lorem ipsum',
            service_category: 'Refuel',
            service_location: 'Jl Tandean',
            service_price_total: 1500000,
            remind_at: '2026-01-16 00:00:08',
            created_at: '2026-01-14 00:00:08'
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
            }).as('UserCantCreateServiceHistoryUsingInvalidVehicleId(UUID)')
            cy.get('@UserCantCreateServiceHistoryUsingInvalidVehicleId(UUID)').then(dt => {
                cy.templateDelete(dt, 400, {
                    "vehicle_id": ["The vehicle id field must be 36 characters."]
                })
            })
        })
    })

    it('TC-INT-SV-027 : User Cant Create Service History Using Invalid Vehicle Id (Not Found)', () => {
        const payloadAuth = {
            username : "flazefy",
            password: 'nopass123'
        }
        const payload = {
            vehicle_id: '7d53371a-e363-2ad3-25fe-180dae88c069',
            service_note: 'lorem ipsum',
            service_category: 'Inspection',
            service_location: 'Jl Tandean',
            service_price_total: 1500000,
            remind_at: '2026-01-16 00:00:08',
            created_at: '2026-01-14 00:00:08'
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
            }).as('UserCantCreateServiceHistoryUsingInvalidVehicleId(NotFound)')
            cy.get('@UserCantCreateServiceHistoryUsingInvalidVehicleId(NotFound)').then(dt => {
                cy.templateDelete(dt, 404, 'vehicle not found')
            })
        })
    })

    it('TC-INT-SV-028 : User Cant Create Service History Using Invalid Remind At Datetime Format', () => {
        const payloadAuth = {
            username : "flazefy",
            password: 'nopass123'
        }
        const payload = {
            vehicle_id: '7d53371a-e363-2ad3-25fe-180dae88c062',
            service_note: 'lorem ipsum',
            service_category: 'Inspection',
            service_location: 'Jl Tandean',
            service_price_total: 1500000,
            remind_at: '2026-01-16',
            created_at: '2026-01-14 00:00:08'
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
            }).as('UserCantCreateServiceHistoryUsingInvalidRemindAtDatetimeFormat')
            cy.get('@UserCantCreateServiceHistoryUsingInvalidRemindAtDatetimeFormat').then(dt => {
                cy.templateDelete(dt, 400, {
                    "remind_at": ["The remind at field must match the format Y-m-d H:i:s."]
                })
            })
        })
    })

    it('TC-INT-SV-029 : User Cant Create Service History Using Invalid Remind At (Remind At Before Created At)', () => {
        const payloadAuth = {
            username : "flazefy",
            password: 'nopass123'
        }
        const payload = {
            vehicle_id: '7d53371a-e363-2ad3-25fe-180dae88c062',
            service_note: 'lorem ipsum',
            service_category: 'Inspection',
            service_location: 'Jl Tandean',
            service_price_total: 1500000,
            remind_at: '2026-01-12 00:00:08',
            created_at: '2026-01-14 00:00:08'
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
            }).as('UserCantCreateServiceHistoryUsingInvalidRemindAt(RemindAtBeforeCreatedAt)')
            cy.get('@UserCantCreateServiceHistoryUsingInvalidRemindAt(RemindAtBeforeCreatedAt)').then(dt => {
                cy.templateDelete(dt, 400, {
                    "remind_at": ["The remind at field must be a date after or equal to created at."]
                })
            })
        })
    })

    it('TC-INT-SV-030 : User Cant Create Service History Using Invalid Auth', () => {
        const payload = {
            vehicle_id: '7d53371a-e363-2ad3-25fe-180dae88c062',
            service_note: 'lorem ipsum',
            service_category: 'Inspection',
            service_location: 'Jl Tandean',
            service_price_total: 1500000,
            remind_at: '2026-01-16 00:00:08',
            created_at: '2026-01-14 00:00:08'
        }

        cy.request({
            method: method,
            url,
            body: payload,
            failOnStatusCode: false,
        }).as('UserCantCreateServiceHistoryUsingInvalidAuth')
        cy.get('@UserCantCreateServiceHistoryUsingInvalidAuth').then(dt => {
            cy.templateDelete(dt, 401, 'you need to include the authorization token from login')
        })
    })

    it('TC-INT-SV-031 : User Can Create Service History Using Valid Data', () => {
        const payloadAuth = {
            username : "flazefy",
            password: 'nopass123',
        }
        const payload = {
            vehicle_id: '7d53371a-e363-2ad3-25fe-180dae88c062',
            service_note: 'lorem ipsum',
            service_category: 'Inspection',
            service_location: 'Jl Tandean',
            service_price_total: 1500000,
            remind_at: '2026-01-16 00:00:08',
            created_at: '2026-01-14 00:00:08'
        }

        cy.templateIntegrationLoginAPI(payloadAuth.username, payloadAuth.password).then(token => {
            cy.request({
                method: method,
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