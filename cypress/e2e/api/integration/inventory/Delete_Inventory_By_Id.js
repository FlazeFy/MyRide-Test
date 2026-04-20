import '../../../../support/template'

describe('MyRide Integration Test - Inventory - Delete : Inventory By Id', () => {
    const method = 'delete'
    const url = '/api/v1/inventory/destroy'

    it('TC-INT-IN-015 : User Cant Remove Inventory Using Invalid ID Format', () => {
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
            }).as('UserCantRemoveInventoryUsingInvalidIDFormat')
            cy.get('@UserCantRemoveInventoryUsingInvalidIDFormat').then(dt => {
                cy.templateDelete(dt, 400, {
                    "id": ["The id field must be 36 characters."]
                })
            })
        })
    })

    it('TC-INT-IN-016 : User Cant Remove Inventory Using Not Found ID', () => {
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
            }).as('UserCantRemoveInventoryUsingNotFoundID')
            cy.get('@UserCantRemoveInventoryUsingNotFoundID').then(dt => {
                cy.templateDelete(dt, 404, 'inventory not found')
            })
        })
    })

    it('TC-INT-IN-017 : User Can Remove Inventory Using Valid ID', () => {
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
            }).as('UserCanRemoveInventoryUsingValidID')
            cy.get('@UserCanRemoveInventoryUsingValidID').then(dt => {
                cy.templateDelete(dt, 200, 'inventory permanently deleted')
            })
        })
    })
})