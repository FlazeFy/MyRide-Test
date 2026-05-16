import '../../../../support/template'

describe('Integration Test - Service - Put : Update Service By Id', () => {
    const id = '4a75a7be-281f-685e-0fde-999b279b7ed5'
    const method = 'put'
    const url = `/api/v1/service/${id}`

    it('TC-INT-SV-032 : User Cant Update Service History Using Invalid Rules For Service Category', () => {
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
                method,
                url,
                headers: {
                    Authorization: `Bearer ${token}`
                },
                body: payload,
                failOnStatusCode: false,
            }).as('UserCantUpdateServiceHistoryUsingInvalidRulesForServiceRon')
            cy.get('@UserCantUpdateServiceHistoryUsingInvalidRulesForServiceRon').then(dt => {
                cy.templateDelete(dt, 400, {
                    "service_category": ["Service Category is not available"]
                })
            })
        })
    })

    it('TC-INT-SV-033 : User Cant Update Service History Using Invalid Service Price Total', () => {
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
                method,
                url,
                headers: {
                    Authorization: `Bearer ${token}`
                },
                body: payload,
                failOnStatusCode: false,
            }).as('UserCantUpdateServiceHistoryUsingInvalidServicePriceTotal')
            cy.get('@UserCantUpdateServiceHistoryUsingInvalidServicePriceTotal').then(dt => {
                cy.templateDelete(dt, 400, {
                    "service_price_total": ["The service price total field must be at least 1."]
                })
            })
        })
    })

    it('TC-INT-SV-034 : User Cant Update Service History Using Empty Service Note', () => {
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
                method,
                url,
                headers: {
                    Authorization: `Bearer ${token}`
                },
                body: payload,
                failOnStatusCode: false,
            }).as('UserCantUpdateServiceHistoryUsingEmptyServiceNote')
            cy.get('@UserCantUpdateServiceHistoryUsingEmptyServiceNote').then(dt => {
                cy.templateDelete(dt, 400, {
                    "service_note": ["The service note field is required."]
                })
            })
        })
    })

    it('TC-INT-SV-035 : User Cant Update Service History Using Invalid Vehicle Id (UUID)', () => {
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
                method,
                url,
                headers: {
                    Authorization: `Bearer ${token}`
                },
                body: payload,
                failOnStatusCode: false,
            }).as('UserCantUpdateServiceHistoryUsingInvalidVehicleId(UUID)')
            cy.get('@UserCantUpdateServiceHistoryUsingInvalidVehicleId(UUID)').then(dt => {
                cy.templateDelete(dt, 400, {
                    "vehicle_id": ["The vehicle id field must be 36 characters."]
                })
            })
        })
    })

    it('TC-INT-SV-036 : User Cant Update Service History Using Invalid Vehicle Id (Not Found)', () => {
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
                method,
                url,
                headers: {
                    Authorization: `Bearer ${token}`
                },
                body: payload,
                failOnStatusCode: false,
            }).as('UserCantUpdateServiceHistoryUsingInvalidVehicleId(NotFound)')
            cy.get('@UserCantUpdateServiceHistoryUsingInvalidVehicleId(NotFound)').then(dt => {
                cy.templateDelete(dt, 404, 'vehicle not found')
            })
        })
    })

    it('TC-INT-SV-037 : User Cant Update Service History Using Invalid Remind At Datetime Format', () => {
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
                method,
                url,
                headers: {
                    Authorization: `Bearer ${token}`
                },
                body: payload,
                failOnStatusCode: false,
            }).as('UserCantUpdateServiceHistoryUsingInvalidRemindAtDatetimeFormat')
            cy.get('@UserCantUpdateServiceHistoryUsingInvalidRemindAtDatetimeFormat').then(dt => {
                cy.templateDelete(dt, 400, {
                    "remind_at": ["The remind at field must match the format Y-m-d H:i:s."]
                })
            })
        })
    })

    it('TC-INT-SV-038 : User Cant Update Service History Using Invalid Remind At (Remind At Before Updated At)', () => {
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
                method,
                url,
                headers: {
                    Authorization: `Bearer ${token}`
                },
                body: payload,
                failOnStatusCode: false,
            }).as('UserCantUpdateServiceHistoryUsingInvalidRemindAt(RemindAtBeforeUpdatedAt)')
            cy.get('@UserCantUpdateServiceHistoryUsingInvalidRemindAt(RemindAtBeforeUpdatedAt)').then(dt => {
                cy.templateDelete(dt, 400, {
                    "remind_at": ["The remind at field must be a date after or equal to created at."]
                })
            })
        })
    })

    it('TC-INT-SV-039 : User Cant Update Service History Using Invalid Auth', () => {
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
            method,
            url,
            body: payload,
            failOnStatusCode: false,
        }).as('UserCantUpdateServiceHistoryUsingInvalidAuth')
        cy.get('@UserCantUpdateServiceHistoryUsingInvalidAuth').then(dt => {
            cy.templateDelete(dt, 401, 'you need to include the authorization token from login')
        })
    })

    it('TC-INT-SV-040 : User Can Update Service History Using Valid Data', () => {
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