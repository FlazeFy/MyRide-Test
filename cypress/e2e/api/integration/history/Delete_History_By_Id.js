import '../../../../support/template'

describe('MyRide Integration Test - History - Delete : History By Id', () => {
    const method = 'delete'
    const url = '/api/v1/history/destroy'

    it('TC-INT-HS-006 : User Cant Remove History Using Invalid ID Format', () => {
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
            }).as('UserCantRemoveHistoryUsingInvalidIDFormat')
            cy.get('@UserCantRemoveHistoryUsingInvalidIDFormat').then(dt => {
                cy.templateDelete(dt, 400, {
                    "id": ["The id field must be 36 characters."]
                })
            })
        })
    })

    it('TC-INT-HS-007 : User Cant Remove History Using Not Found ID', () => {
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
            }).as('UserCantRemoveHistoryUsingNotFoundID')
            cy.get('@UserCantRemoveHistoryUsingNotFoundID').then(dt => {
                cy.templateDelete(dt, 404, 'history not found')
            })
        })
    })

    it('TC-INT-HS-008 : User Can Remove History Using Valid ID', () => {
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
            }).as('UserCanRemoveHistoryUsingValidID')
            cy.get('@UserCanRemoveHistoryUsingValidID').then(dt => {
                cy.templateDelete(dt, 200, 'history permanently deleted')
            })
        })
    })
})