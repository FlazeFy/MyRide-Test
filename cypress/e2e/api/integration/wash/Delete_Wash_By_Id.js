import '../../../../support/template'

describe('MyRide Integration Test - Wash - Delete : Wash By Id', () => {
    const method = 'delete'
    const url = '/api/v1/wash/destroy'

    it('TC-INT-WS-016 : User Cant Remove Wash Using Invalid ID Format', () => {
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
            }).as('UserCantRemoveWashUsingInvalidIDFormat')
            cy.get('@UserCantRemoveWashUsingInvalidIDFormat').then(dt => {
                cy.templateDelete(dt, 400, {
                    "id": ["The id field must be 36 characters."]
                })
            })
        })
    })

    it('TC-INT-WS-017 : User Cant Remove Wash Using Not Found ID', () => {
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
            }).as('UserCantRemoveWashUsingNotFoundID')
            cy.get('@UserCantRemoveWashUsingNotFoundID').then(dt => {
                cy.templateDelete(dt, 404, 'wash not found')
            })
        })
    })

    it('TC-INT-WS-018 : User Can Remove Wash Using Valid ID', () => {
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
            }).as('UserCanRemoveWashUsingValidID')
            cy.get('@UserCanRemoveWashUsingValidID').then(dt => {
                cy.templateDelete(dt, 200, 'wash permentally deleted')
            })
        })
    })
})