import '../../../../support/template'

describe('MyRide Integration Test - Vehicle - Put : Recover Deleted Vehicle By Id', () => {
    const method = 'put'
    const url = '/api/v1/vehicle/recover'

    it('TC-INT-VH-021 : User Cant Recover Deleted Vehicle Using Invalid ID Format', () => {
        const payload = {
            username : "flazefy",
            password: 'nopass123',
        }
        const id = '1'

        cy.templateIntegrationLoginAPI(payload.username, payload.password).then(token => {
            cy.request({
                method: method,
                url: `${url}/${id}`,
                headers: {
                    Authorization: `Bearer ${token}`
                },
                failOnStatusCode: false,
            }).as('UserCantRecoverDeletedVehicleUsingInvalidIDFormat')
            cy.get('@UserCantRecoverDeletedVehicleUsingInvalidIDFormat').then(dt => {
                cy.templateDelete(dt, 400, {
                    "id": ["The id field must be 36 characters."]
                })
            })
        })
    })

    it('TC-INT-VH-022 : User Cant Recover Deleted Vehicle Using Not Found ID', () => {
        const payload = {
            username : "flazefy",
            password: 'nopass123',
        }
        const id = '0a0c6580-213e-7469-229e-b53f2e12abcd'

        cy.templateIntegrationLoginAPI(payload.username, payload.password).then(token => {
            cy.request({
                method: method,
                url: `${url}/${id}`,
                headers: {
                    Authorization: `Bearer ${token}`
                },
                failOnStatusCode: false,
            }).as('UserCantRecoverDeletedVehicleUsingNotFoundID')
            cy.get('@UserCantRecoverDeletedVehicleUsingNotFoundID').then(dt => {
                cy.templateDelete(dt, 404, 'vehicle not found')
            })
        })
    })

    it('TC-INT-VH-023 : User Can Recover Deleted Vehicle Using Valid ID', () => {
        const payload = {
            username : "flazefy",
            password: 'nopass123',
        }
        const id = '0a0c6580-213e-7469-229e-b53f2e12860b'

        cy.templateIntegrationLoginAPI(payload.username, payload.password).then(token => {
            cy.request({
                method: method,
                url: `${url}/${id}`,
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).as('UserCanRecoverDeletedVehicleUsingValidID')
            cy.get('@UserCanRecoverDeletedVehicleUsingValidID').then(dt => {
                cy.templateDelete(dt, 200, 'vehicle recovered')
            })
        })
    })

    it('TC-INT-VH-024 : User Cant Recover Active Vehicle', () => {
        const payload = {
            username : "flazefy",
            password: 'nopass123',
        }
        const id = '0a0c6580-213e-7469-229e-b53f2e12860b'

        cy.templateIntegrationLoginAPI(payload.username, payload.password).then(token => {
            cy.request({
                method: method,
                url: `${url}/${id}`,
                headers: {
                    Authorization: `Bearer ${token}`
                },
                failOnStatusCode: false,
            }).as('UserCantRecoverActiveVehicle')
            cy.get('@UserCantRecoverActiveVehicle').then(dt => {
                cy.templateDelete(dt, 422, 'vehicle already active')
            })
        })
    })
})