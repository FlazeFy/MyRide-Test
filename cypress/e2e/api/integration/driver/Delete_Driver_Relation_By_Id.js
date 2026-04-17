import '../../../../support/template'

describe('MyRide Integration Test - Driver - Delete : Driver Relation By Id', () => {
    const method = 'delete'
    const url = '/api/v1/driver/destroy/relation'

    it('TC-INT-DR-017 : User Cant Remove Driver Relation Using Invalid ID Format', () => {
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
            }).as('UserCantRemoveDriverRelationUsingInvalidIDFormat')
            cy.get('@UserCantRemoveDriverRelationUsingInvalidIDFormat').then(dt => {
                cy.templateDelete(dt, 400, {
                    "id": ["The id field must be 36 characters."]
                })
            })
        })
    })

    it('TC-INT-DR-018 : User Cant Remove Driver Relation Using Not Found ID', () => {
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
            }).as('UserCantRemoveDriverRelationUsingNotFoundID')
            cy.get('@UserCantRemoveDriverRelationUsingNotFoundID').then(dt => {
                cy.templateDelete(dt, 404, 'driver relation not found')
            })
        })
    })

    it('TC-INT-DR-019 : User Can Remove Driver Relation Using Valid ID', () => {
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
            }).as('UserCanRemoveDriverRelationUsingValidID')
            cy.get('@UserCanRemoveDriverRelationUsingValidID').then(dt => {
                cy.templateDelete(dt, 200, 'driver removed')
            })
        })
    })
})