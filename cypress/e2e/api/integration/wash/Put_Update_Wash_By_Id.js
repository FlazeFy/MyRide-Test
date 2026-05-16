import '../../../../support/template'

describe('Integration Test - Wash - Put : Update Wash By Id', () => {
    const id = '6e0187c5-ddd0-15d1-0add-5c57a649a792'
    const method = 'put'
    const url = `/api/v1/wash/${id}`

    it('TC-INT-WS-019 : User Cant Update Wash History Using Invalid Rules For Wash By', () => {
        const payloadAuth = {
            username : "flazefy",
            password: 'nopass123'
        }
        const payload = {
            vehicle_id: '7d53371a-e363-2ad3-25fe-180dae88c062',
            wash_desc: 'lorem ipsum', 
            wash_by: 'Stranger', 
            is_wash_body: true,
            is_wash_window: true,
            is_wash_dashboard: true,
            is_wash_tires: true,
            is_wash_trash: true,
            is_wash_engine: true,
            is_wash_seat: false,
            is_wash_carpet: false,
            is_wash_pillows: false,
            wash_address: 'Jl. Tandean',
            wash_start_time: '2026-01-14 00:00:10',
            wash_end_time: '2026-01-14 00:00:20',
            wash_price: 100000,
            is_fill_window_washing_water: true,
            is_wash_hollow: true
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
            }).as('UserCantUpdateWashHistoryUsingInvalidRulesForWashBy')
            cy.get('@UserCantUpdateWashHistoryUsingInvalidRulesForWashBy').then(dt => {
                cy.templateDelete(dt, 400, {
                    "wash_by": ["Wash By is not available"]
                })
            })
        })
    })

    it('TC-INT-WS-020 : User Cant Update Wash History Using Invalid Wash Price', () => {
        const payloadAuth = {
            username : "flazefy",
            password: 'nopass123'
        }
        const payload = {
            vehicle_id: '7d53371a-e363-2ad3-25fe-180dae88c062',
            wash_desc: 'lorem ipsum', 
            wash_by: 'Carwash', 
            is_wash_body: true,
            is_wash_window: true,
            is_wash_dashboard: true,
            is_wash_tires: true,
            is_wash_trash: true,
            is_wash_engine: true,
            is_wash_seat: false,
            is_wash_carpet: false,
            is_wash_pillows: false,
            wash_address: 'Jl. Tandean',
            wash_start_time: '2026-01-14 00:00:10',
            wash_end_time: '2026-01-14 00:00:20',
            wash_price: -100000,
            is_fill_window_washing_water: true,
            is_wash_hollow: true
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
            }).as('UserCantUpdateWashHistoryUsingInvalidWashPrice')
            cy.get('@UserCantUpdateWashHistoryUsingInvalidWashPrice').then(dt => {
                cy.templateDelete(dt, 400, {
                    "wash_price": ["The wash price field must be at least 1."]
                })
            })
        })
    })

    it('TC-INT-WS-021 : User Cant Update Wash History Using Invalid Wash Address Character Length', () => {
        const payloadAuth = {
            username : "flazefy",
            password: 'nopass123'
        }
        const payload = {
            vehicle_id: '7d53371a-e363-2ad3-25fe-180dae88c062',
            wash_desc: 'lorem ipsum', 
            wash_by: 'Carwash', 
            is_wash_body: true,
            is_wash_window: true,
            is_wash_dashboard: true,
            is_wash_tires: true,
            is_wash_trash: true,
            is_wash_engine: true,
            is_wash_seat: false,
            is_wash_carpet: false,
            is_wash_pillows: false,
            wash_address: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
            wash_start_time: '2026-01-14 00:00:10',
            wash_end_time: '2026-01-14 00:00:20',
            wash_price: 100000,
            is_fill_window_washing_water: true,
            is_wash_hollow: true
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
            }).as('UserCantUpdateWashHistoryUsingInvalidWashAddressCharacterLength')
            cy.get('@UserCantUpdateWashHistoryUsingInvalidWashAddressCharacterLength').then(dt => {
                console.log(dt)
                cy.templateDelete(dt, 400, {
                    "wash_address": ["The wash address field must not be greater than 75 characters."]
                })
            })
        })
    })

    it('TC-INT-WS-022 : User Cant Update Wash History Using Empty Wash Start Time', () => {
        const payloadAuth = {
            username : "flazefy",
            password: 'nopass123',
        }
        const payload = {
            vehicle_id: '7d53371a-e363-2ad3-25fe-180dae88c062',
            wash_desc: 'lorem ipsum', 
            wash_by: 'Carwash', 
            is_wash_body: true,
            is_wash_window: true,
            is_wash_dashboard: true,
            is_wash_tires: true,
            is_wash_trash: true,
            is_wash_engine: true,
            is_wash_seat: false,
            is_wash_carpet: false,
            is_wash_pillows: false,
            wash_address: 'Jl. Tandean',
            wash_end_time: '2026-01-14 00:00:20',
            wash_price: 100000,
            is_fill_window_washing_water: true,
            is_wash_hollow: true
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
            }).as('UserCantUpdateWashHistoryUsingEmptyWashStartTime')
            cy.get('@UserCantUpdateWashHistoryUsingEmptyWashStartTime').then(dt => {
                cy.templateDelete(dt, 400, {
                    "wash_start_time": ["The wash start time field is required."]
                })
            })
        })
    })

    it('TC-INT-WS-023 : User Cant Update Wash History Using Invalid Vehicle Id (UUID)', () => {
        const payloadAuth = {
            username : "flazefy",
            password: 'nopass123'
        }
        const payload = {
            vehicle_id: '1',
            wash_desc: 'lorem ipsum', 
            wash_by: 'Carwash', 
            is_wash_body: true,
            is_wash_window: true,
            is_wash_dashboard: true,
            is_wash_tires: true,
            is_wash_trash: true,
            is_wash_engine: true,
            is_wash_seat: false,
            is_wash_carpet: false,
            is_wash_pillows: false,
            wash_address: 'Jl. Tandean',
            wash_start_time: '2026-01-14 00:00:10',
            wash_end_time: '2026-01-14 00:00:20',
            wash_price: 100000,
            is_fill_window_washing_water: true,
            is_wash_hollow: true
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
            }).as('UserCantUpdateWashHistoryUsingInvalidVehicleId(UUID)')
            cy.get('@UserCantUpdateWashHistoryUsingInvalidVehicleId(UUID)').then(dt => {
                cy.templateDelete(dt, 400, {
                    "vehicle_id": ["The vehicle id field must be 36 characters."]
                })
            })
        })
    })

    it('TC-INT-WS-024 : User Cant Update Wash History Using Invalid Vehicle Id (Not Found)', () => {
        const payloadAuth = {
            username : "flazefy",
            password: 'nopass123'
        }
        const payload = {
            vehicle_id: '7d53371a-e363-2ad3-25fe-180dae88c069',
            wash_desc: 'lorem ipsum', 
            wash_by: 'Carwash', 
            is_wash_body: true,
            is_wash_window: true,
            is_wash_dashboard: true,
            is_wash_tires: true,
            is_wash_trash: true,
            is_wash_engine: true,
            is_wash_seat: false,
            is_wash_carpet: false,
            is_wash_pillows: false,
            wash_address: 'Jl. Tandean',
            wash_start_time: '2026-01-14 00:00:10',
            wash_end_time: '2026-01-14 00:00:20',
            wash_price: 100000,
            is_fill_window_washing_water: true,
            is_wash_hollow: true
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
            }).as('UserCantUpdateWashHistoryUsingInvalidVehicleId(NotFound)')
            cy.get('@UserCantUpdateWashHistoryUsingInvalidVehicleId(NotFound)').then(dt => {
                cy.templateDelete(dt, 404, 'vehicle not found')
            })
        })
    })

    it('TC-INT-WS-025 : User Cant Update Wash History Using Invalid Wash Start Time Datetime Format', () => {
        const payloadAuth = {
            username : "flazefy",
            password: 'nopass123'
        }
        const payload = {
            vehicle_id: '7d53371a-e363-2ad3-25fe-180dae88c062',
            wash_desc: 'lorem ipsum', 
            wash_by: 'Carwash', 
            is_wash_body: true,
            is_wash_window: true,
            is_wash_dashboard: true,
            is_wash_tires: true,
            is_wash_trash: true,
            is_wash_engine: true,
            is_wash_seat: false,
            is_wash_carpet: false,
            is_wash_pillows: false,
            wash_address: 'Jl. Tandean',
            wash_start_time: '2026-01-14',
            wash_end_time: '2026-01-14 00:00:20',
            wash_price: 100000,
            is_fill_window_washing_water: true,
            is_wash_hollow: true
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
            }).as('UserCantUpdateWashHistoryUsingInvalidWashStartTimeDatetimeFormat')
            cy.get('@UserCantUpdateWashHistoryUsingInvalidWashStartTimeDatetimeFormat').then(dt => {
                cy.templateDelete(dt, 400, {
                    "wash_start_time": ["The wash start time field must match the format Y-m-d H:i:s."]
                })
            })
        })
    })

    it('TC-INT-WS-026 : User Cant Update Wash History Using Invalid Wash End Time (Wash End Time Same With Start Time)', () => {
        const payloadAuth = {
            username : "flazefy",
            password: 'nopass123'
        }
        const payload = {
            vehicle_id: '7d53371a-e363-2ad3-25fe-180dae88c062',
            wash_desc: 'lorem ipsum', 
            wash_by: 'Carwash', 
            is_wash_body: true,
            is_wash_window: true,
            is_wash_dashboard: true,
            is_wash_tires: true,
            is_wash_trash: true,
            is_wash_engine: true,
            is_wash_seat: false,
            is_wash_carpet: false,
            is_wash_pillows: false,
            wash_address: 'Jl. Tandean',
            wash_start_time: '2026-01-14 00:00:10',
            wash_end_time: '2026-01-14 00:00:10',
            wash_price: 100000,
            is_fill_window_washing_water: true,
            is_wash_hollow: true
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
            }).as('UserCantUpdateWashHistoryUsingInvalidWashEndTime(WashEndTimeSameWithStartTime)')
            cy.get('@UserCantUpdateWashHistoryUsingInvalidWashEndTime(WashEndTimeSameWithStartTime)').then(dt => {
                cy.templateDelete(dt, 400, {
                    "wash_end_time": ["The wash end time field must be a date after wash start time."]
                })
            })
        })
    })

    it('TC-INT-WS-027 : User Cant Update Wash History Using Invalid Auth', () => {
        const payload = {
            vehicle_id: '7d53371a-e363-2ad3-25fe-180dae88c062',
            wash_desc: 'lorem ipsum', 
            wash_by: 'Carwash', 
            is_wash_body: true,
            is_wash_window: true,
            is_wash_dashboard: true,
            is_wash_tires: true,
            is_wash_trash: true,
            is_wash_engine: true,
            is_wash_seat: false,
            is_wash_carpet: false,
            is_wash_pillows: false,
            wash_address: 'Jl. Tandean',
            wash_start_time: '2026-01-14 00:00:10',
            wash_end_time: '2026-01-14 00:00:20',
            wash_price: 100000,
            is_fill_window_washing_water: true,
            is_wash_hollow: true
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

    it('TC-INT-WS-028 : User Can Update Wash History Using Valid Data', () => {
        const payloadAuth = {
            username : "flazefy",
            password: 'nopass123',
        }
        const payload = {
            vehicle_id: '7d53371a-e363-2ad3-25fe-180dae88c062',
            wash_desc: 'lorem ipsum', 
            wash_by: 'Carwash', 
            is_wash_body: true,
            is_wash_window: true,
            is_wash_dashboard: true,
            is_wash_tires: true,
            is_wash_trash: true,
            is_wash_engine: true,
            is_wash_seat: false,
            is_wash_carpet: false,
            is_wash_pillows: false,
            wash_address: 'Jl. Tandean',
            wash_start_time: '2026-01-14 00:00:10',
            wash_end_time: '2026-01-14 00:00:20',
            wash_price: 100000,
            is_fill_window_washing_water: true,
            is_wash_hollow: true
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