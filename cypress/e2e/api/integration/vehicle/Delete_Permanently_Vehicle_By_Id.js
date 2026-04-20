import '../../../../support/template'

describe('MyRide Integration Test - Vehicle - Delete : Permanently Vehicle By Id (Hard)', () => {
    const method = 'delete'
    const url = '/api/v1/vehicle/destroy'

    it('TC-INT-VH-025 : User Cant Remove Vehicle Permanently Using Invalid ID Format', () => {
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
            }).as('UserCantRemoveVehiclePermanentlyUsingInvalidIDFormat')
            cy.get('@UserCantRemoveVehiclePermanentlyUsingInvalidIDFormat').then(dt => {
                cy.templateDelete(dt, 400, {
                    "id": ["The id field must be 36 characters."]
                })
            })
        })
    })

    it('TC-INT-VH-026 : User Cant Remove Vehicle Permanently Using Not Found ID', () => {
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
            }).as('UserCantRemoveVehiclePermanentlyUsingNotFoundID')
            cy.get('@UserCantRemoveVehiclePermanentlyUsingNotFoundID').then(dt => {
                cy.templateDelete(dt, 404, 'vehicle not found')
            })
        })
    })

    it('TC-INT-VH-027 : User Can Remove Vehicle Permanently Using Valid ID', () => {
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
            }).as('UserCanRemoveVehiclePermanentlyUsingValidID')
            cy.get('@UserCanRemoveVehiclePermanentlyUsingValidID').then(dt => {
                cy.templateDelete(dt, 200, 'vehicle permanently deleted')
            })
        })
    })

    it('TC-INT-VH-028 : User Cant Remove Permanently Active Vehicle', () => {
        const payload = {
            username : "flazefy",
            password: 'nopass123',
        }
        const id = '88a003eb-d1a6-6b3f-2015-1e11d3186975'

        cy.templateIntegrationLoginAPI(payload.username, payload.password).then(token => {
            cy.request({
                method: method,
                url: `${url}/${id}`,
                headers: {
                    Authorization: `Bearer ${token}`
                },
                failOnStatusCode: false,
            }).as('UserCantRemovePermanentlyActiveVehicle')
            cy.get('@UserCantRemovePermanentlyActiveVehicle').then(dt => {
                cy.templateDelete(dt, 422, 'vehicle still active, delete it first')
            })
        })
    })
})