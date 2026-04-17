import '../../../../support/template'

describe('MyRide Integration Test - Driver - Delete : Driver By Id', () => {
    const method = 'delete'
    const url = '/api/v1/driver/destroy'

    it('TC-INT-DR-020 : User Cant Remove Driver Using Invalid ID Format', () => {
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
            }).as('UserCantRemoveDriverUsingInvalidIDFormat')
            cy.get('@UserCantRemoveDriverUsingInvalidIDFormat').then(dt => {
                cy.templateDelete(dt, 400, {
                    "id": ["The id field must be 36 characters."]
                })
            })
        })
    })

    it('TC-INT-DR-021 : User Cant Remove Driver Using Not Found ID', () => {
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
            }).as('UserCantRemoveDriverUsingNotFoundID')
            cy.get('@UserCantRemoveDriverUsingNotFoundID').then(dt => {
                cy.templateDelete(dt, 404, 'driver not found')
            })
        })
    })

    it('TC-INT-DR-022 : User Can Remove Driver Using Valid ID', () => {
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
            }).as('UserCanRemoveDriverUsingValidID')
            cy.get('@UserCanRemoveDriverUsingValidID').then(dt => {
                cy.templateDelete(dt, 200, 'driver permentally deleted')
            })
        })
    })
})