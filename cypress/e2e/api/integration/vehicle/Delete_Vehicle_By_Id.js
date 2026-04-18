import '../../../../support/template'

describe('MyRide Integration Test - Vehicle - Delete : Vehicle By Id (Soft)', () => {
    const method = 'delete'
    const url = '/api/v1/vehicle/delete'

    it('TC-INT-VH-017 : User Cant Remove Vehicle Using Invalid ID Format', () => {
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
            }).as('UserCantRemoveVehicleUsingInvalidIDFormat')
            cy.get('@UserCantRemoveVehicleUsingInvalidIDFormat').then(dt => {
                cy.templateDelete(dt, 400, {
                    "id": ["The id field must be 36 characters."]
                })
            })
        })
    })

    it('TC-INT-VH-018 : User Cant Remove Vehicle Using Not Found ID', () => {
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
            }).as('UserCantRemoveVehicleUsingNotFoundID')
            cy.get('@UserCantRemoveVehicleUsingNotFoundID').then(dt => {
                cy.templateDelete(dt, 404, 'vehicle not found')
            })
        })
    })

    it('TC-INT-VH-019 : User Can Remove Vehicle Using Valid ID', () => {
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
            }).as('UserCanRemoveVehicleUsingValidID')
            cy.get('@UserCanRemoveVehicleUsingValidID').then(dt => {
                cy.templateDelete(dt, 200, 'vehicle deleted')
            })
        })
    })

    it('TC-INT-VH-020 : User Cant Remove Already Removed Vehicle', () => {
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
            }).as('UserCantRemoveAlreadyRemovedVehicle')
            cy.get('@UserCantRemoveAlreadyRemovedVehicle').then(dt => {
                cy.templateDelete(dt, 422, 'vehicle already deleted')
            })
        })
    })
})