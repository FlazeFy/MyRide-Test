import '../../../../support/template'

describe('Integration Test - Fuel - Put : Update Fuel By ID', () => {
    const id = 'd253ebdc-b7c1-da7c-1bed-053201f7f748'
    const method = 'put'
    const url = `/api/v1/fuel/${id}`

    it('TC-INT-FL-024 : User Cant Update Fuel History Using Invalid Rules For Fuel Ron', () => {
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
                method,
                url,
                headers: {
                    Authorization: `Bearer ${token}`
                },
                body: payload,
                failOnStatusCode: false,
            }).as('UserCantUpdateFuelHistoryUsingInvalidRulesForFuelRon')
            cy.get('@UserCantUpdateFuelHistoryUsingInvalidRulesForFuelRon').then(dt => {
                cy.templateDelete(dt, 400, {
                    "fuel_ron": ["Fuel Ron is not available"]
                })
            })
        })
    })

    it('TC-INT-FL-025 : User Cant Update Fuel History Using Invalid Fuel Volume', () => {
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
                method,
                url,
                headers: {
                    Authorization: `Bearer ${token}`
                },
                body: payload,
                failOnStatusCode: false,
            }).as('UserCantUpdateFuelHistoryUsingInvalidFuelVolume')
            cy.get('@UserCantUpdateFuelHistoryUsingInvalidFuelVolume').then(dt => {
                cy.templateDelete(dt, 400, {
                    "fuel_volume": ["The fuel volume field must not be greater than 99."]
                })
            })
        })
    })

    it('TC-INT-FL-026 : User Cant Update Fuel History Using Empty Fuel Volume', () => {
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
                method,
                url,
                headers: {
                    Authorization: `Bearer ${token}`
                },
                body: payload,
                failOnStatusCode: false,
            }).as('UserCantUpdateFuelHistoryUsingEmptyFuelVolume')
            cy.get('@UserCantUpdateFuelHistoryUsingEmptyFuelVolume').then(dt => {
                cy.templateDelete(dt, 400, {
                    "fuel_volume": ["The fuel volume field is required."]
                })
            })
        })
    })

    it('TC-INT-FL-027 : User Cant Update Fuel History Using Invalid Vehicle Id (UUID)', () => {
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
                method,
                url,
                headers: {
                    Authorization: `Bearer ${token}`
                },
                body: payload,
                failOnStatusCode: false,
            }).as('UserCantUpdateFuelHistoryUsingInvalidVehicleId(UUID)')
            cy.get('@UserCantUpdateFuelHistoryUsingInvalidVehicleId(UUID)').then(dt => {
                cy.templateDelete(dt, 400, {
                    "vehicle_id": ["The vehicle id field must be 36 characters."]
                })
            })
        })
    })

    it('TC-INT-FL-028 : User Cant Update Fuel History Using Invalid Vehicle Id (Not Found)', () => {
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
                method,
                url,
                headers: {
                    Authorization: `Bearer ${token}`
                },
                body: payload,
                failOnStatusCode: false,
            }).as('UserCantUpdateFuelHistoryUsingInvalidVehicleId(NotFound)')
            cy.get('@UserCantUpdateFuelHistoryUsingInvalidVehicleId(NotFound)').then(dt => {
                cy.templateDelete(dt, 404, 'vehicle not found')
            })
        })
    })

    it('TC-INT-FL-029 : User Cant Update Fuel History Using Invalid Fuel Type (Based On Brand)', () => {
        const payloadAuth = {
            username : "flazefy",
            password: 'nopass123'
        }
        const payload = {
            vehicle_id: '7d53371a-e363-2ad3-25fe-180dae88c062',
            fuel_volume: 30,
            fuel_price_total: 350000,
            fuel_brand: 'Shell',
            fuel_type: 'Dexlite',
            fuel_ron: '92',
            fuel_at: '2026-01-14 00:00:08'
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
            }).as('UserCantUpdateFuelHistoryUsingInvalidFuelType(BasedOnBrand)')
            cy.get('@UserCantUpdateFuelHistoryUsingInvalidFuelType(BasedOnBrand)').then(dt => {
                cy.templateDelete(dt, 400, `Fuel type is not available for ${payload.fuel_brand}`)
            })
        })
    })

    it('TC-INT-FL-030 : User Cant Update Fuel History Using Invalid Auth', () => {
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
            method,
            url,
            body: payload,
            failOnStatusCode: false,
        }).as('UserCantUpdateFuelHistoryUsingInvalidAuth')
        cy.get('@UserCantUpdateFuelHistoryUsingInvalidAuth').then(dt => {
            cy.templateDelete(dt, 401, 'you need to include the authorization token from login')
        })
    })

    it('TC-INT-FL-031 : User Can Update Fuel History Using Valid Data', () => {
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