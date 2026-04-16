import '../../../../support/template'

describe('MyRide Integration Test - Fuel - Delete : Fuel By Id', () => {
    const method = 'delete'
    const url = '/api/v1/fuel/destroy'

    it('TC-INT-FL-014 : User Cant Remove Fuel Using Invalid ID Format', () => {
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
            }).as('UserCantRemoveFuelUsingInvalidIDFormat')
            cy.get('@UserCantRemoveFuelUsingInvalidIDFormat').then(dt => {
                cy.templateDelete(dt, 400, {
                    "id": ["The id field must be 36 characters."]
                })
            })
        })
    })

    it('TC-INT-FL-015 : User Cant Remove Fuel Using Not Found ID', () => {
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
            }).as('UserCantRemoveFuelUsingNotFoundID')
            cy.get('@UserCantRemoveFuelUsingNotFoundID').then(dt => {
                cy.templateDelete(dt, 404, 'fuel not found')
            })
        })
    })

    it('TC-INT-FL-016 : User Can Remove Fuel Using Valid ID', () => {
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
            }).as('UserCanRemoveFuelUsingValidID')
            cy.get('@UserCanRemoveFuelUsingValidID').then(dt => {
                cy.templateDelete(dt, 200, 'fuel permentally deleted')
            })
        })
    })
})