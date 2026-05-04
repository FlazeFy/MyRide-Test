import '../../../../support/template'

describe('MyRide Integration Test - Auth - Post : Create Fuel', () => {
    const method = 'post'
    const url = '/api/v1/fuel'

    it('TC-INT-FL-017 : User Cant Create Fuel History Using Invalid Rules For Fuel Ron', () => {
        const payloadAuth = {
            username : "flazefy",
            password: 'nopass123'
        }
        const payload = {
            vehicle_id: '7d53371a-e363-2ad3-25fe-180dae88c062',
            fuel_volume: 30,
            fuel_price_total: 350000,
            fuel_brand: 'Shell',
            fuel_type: 'V-Power',
            fuel_ron: '102',
            fuel_at: '2026-01-14 00:00:08'
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
            }).as('UserCantCreateFuelHistoryUsingInvalidRulesForFuelRon')
            cy.get('@UserCantCreateFuelHistoryUsingInvalidRulesForFuelRon').then(dt => {
                cy.templateDelete(dt, 400, {
                    "fuel_ron": ["Fuel Ron is not available"]
                })
            })
        })
    })

    it('TC-INT-FL-018 : User Cant Create Fuel History Using Invalid Fuel Volume', () => {
        const payloadAuth = {
            username : "flazefy",
            password: 'nopass123'
        }
        const payload = {
            vehicle_id: '7d53371a-e363-2ad3-25fe-180dae88c062',
            fuel_volume: 300,
            fuel_price_total: 350000,
            fuel_brand: 'Shell',
            fuel_type: 'V-Power',
            fuel_ron: '92',
            fuel_at: '2026-01-14 00:00:08'
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
            }).as('UserCantCreateFuelHistoryUsingInvalidFuelVolume')
            cy.get('@UserCantCreateFuelHistoryUsingInvalidFuelVolume').then(dt => {
                cy.templateDelete(dt, 400, {
                    "fuel_volume": ["The fuel volume field must not be greater than 99."]
                })
            })
        })
    })

    it('TC-INT-FL-019 : User Cant Create Fuel History Using Empty Fuel Volume', () => {
        const payloadAuth = {
            username : "flazefy",
            password: 'nopass123',
        }
        const payload = {
            vehicle_id: '7d53371a-e363-2ad3-25fe-180dae88c062',
            fuel_price_total: 350000,
            fuel_brand: 'Shell',
            fuel_type: 'V-Power',
            fuel_ron: '92',
            fuel_at: '2026-01-14 00:00:08'
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
            }).as('UserCantCreateFuelHistoryUsingEmptyFuelVolume')
            cy.get('@UserCantCreateFuelHistoryUsingEmptyFuelVolume').then(dt => {
                cy.templateDelete(dt, 400, {
                    "fuel_volume": ["The fuel volume field is required."]
                })
            })
        })
    })

    it('TC-INT-FL-020 : User Cant Create Fuel History Using Invalid Vehicle Id (UUID)', () => {
        const payloadAuth = {
            username : "flazefy",
            password: 'nopass123'
        }
        const payload = {
            vehicle_id: '1',
            fuel_volume: 30,
            fuel_price_total: 350000,
            fuel_brand: 'Shell',
            fuel_type: 'V-Power',
            fuel_ron: '92',
            fuel_at: '2026-01-14 00:00:08'
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
            }).as('UserCantCreateFuelHistoryUsingInvalidVehicleId(UUID)')
            cy.get('@UserCantCreateFuelHistoryUsingInvalidVehicleId(UUID)').then(dt => {
                console.log(dt)
                cy.templateDelete(dt, 400, {
                    "vehicle_id": ["The vehicle id field must be at least 36 characters."]
                })
            })
        })
    })

    it('TC-INT-FL-021 : User Cant Create Fuel History Using Invalid Vehicle Id (Not Found)', () => {
        const payloadAuth = {
            username : "flazefy",
            password: 'nopass123'
        }
        const payload = {
            vehicle_id: '7d53371a-e363-2ad3-25fe-180dae88c069',
            fuel_volume: 30,
            fuel_price_total: 350000,
            fuel_brand: 'Shell',
            fuel_type: 'V-Power',
            fuel_ron: '92',
            fuel_at: '2026-01-14 00:00:08'
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
            }).as('UserCantCreateFuelHistoryUsingInvalidVehicleId(NotFound)')
            cy.get('@UserCantCreateFuelHistoryUsingInvalidVehicleId(NotFound)').then(dt => {
                console.log(dt)
                cy.templateDelete(dt, 404, 'vehicle not found')
            })
        })
    })

    it('TC-INT-FL-022 : User Cant Create Fuel History Using Invalid Auth', () => {
        const payload = {
            vehicle_id: '7d53371a-e363-2ad3-25fe-180dae88c062',
            fuel_volume: 30,
            fuel_price_total: 350000,
            fuel_brand: 'Shell',
            fuel_type: 'V-Power',
            fuel_ron: '92',
            fuel_at: '2026-01-14 00:00:08'
        }

        cy.request({
            method: method,
            url,
            body: payload,
            failOnStatusCode: false,
        }).as('UserCantCreateFuelHistoryUsingInvalidAuth')
        cy.get('@UserCantCreateFuelHistoryUsingInvalidAuth').then(dt => {
            cy.templateDelete(dt, 401, 'you need to include the authorization token from login')
        })
    })

    it('TC-INT-FL-023 : User Can Create Fuel History Using Valid Data', () => {
        const payloadAuth = {
            username : "flazefy",
            password: 'nopass123',
        }
        const payload = {
            vehicle_id: '7d53371a-e363-2ad3-25fe-180dae88c062',
            fuel_volume: 30,
            fuel_price_total: 350000,
            fuel_brand: 'Shell',
            fuel_type: 'V-Power',
            fuel_ron: '92',
            fuel_at: '2026-01-14 00:00:08'
        }

        cy.templateIntegrationLoginAPI(payloadAuth.username, payloadAuth.password).then(token => {
            cy.request({
                method: method,
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