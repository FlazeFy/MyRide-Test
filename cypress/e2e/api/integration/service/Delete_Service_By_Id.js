import '../../../../support/template'

describe('MyRide Integration Test - Service - Delete : Service By Id', () => {
    const method = 'delete'
    const url = '/api/v1/service/destroy'

    it('TC-INT-SV-020 : User Cant Remove Service Using Invalid ID Format', () => {
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
            }).as('UserCantRemoveServiceUsingInvalidIDFormat')
            cy.get('@UserCantRemoveServiceUsingInvalidIDFormat').then(dt => {
                cy.templateDelete(dt, 400, {
                    "id": ["The id field must be 36 characters."]
                })
            })
        })
    })

    it('TC-INT-SV-021 : User Cant Remove Service Using Not Found ID', () => {
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
            }).as('UserCantRemoveServiceUsingNotFoundID')
            cy.get('@UserCantRemoveServiceUsingNotFoundID').then(dt => {
                cy.templateDelete(dt, 404, 'service not found')
            })
        })
    })

    it('TC-INT-SV-022 : User Can Remove Service Using Valid ID', () => {
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
            }).as('UserCanRemoveServiceUsingValidID')
            cy.get('@UserCanRemoveServiceUsingValidID').then(dt => {
                cy.templateDelete(dt, 200, 'service permentally deleted')
            })
        })
    })
})