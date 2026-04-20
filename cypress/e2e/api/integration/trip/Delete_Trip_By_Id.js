import '../../../../support/template'

describe('MyRide Integration Test - Trip - Delete : Trip By Id', () => {
    const method = 'delete'
    const url = '/api/v1/trip/destroy'

    it('TC-INT-TR-035 : User Cant Remove Trip Using Invalid ID Format', () => {
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
            }).as('UserCantRemoveTripUsingInvalidIDFormat')
            cy.get('@UserCantRemoveTripUsingInvalidIDFormat').then(dt => {
                cy.templateDelete(dt, 400, {
                    "id": ["The id field must be 36 characters."]
                })
            })
        })
    })

    it('TC-INT-TR-036 : User Cant Remove Trip Using Not Found ID', () => {
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
            }).as('UserCantRemoveTripUsingNotFoundID')
            cy.get('@UserCantRemoveTripUsingNotFoundID').then(dt => {
                cy.templateDelete(dt, 404, 'trip not found')
            })
        })
    })

    it('TC-INT-TR-037 : User Can Remove Trip Using Valid ID', () => {
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
            }).as('UserCanRemoveTripUsingValidID')
            cy.get('@UserCanRemoveTripUsingValidID').then(dt => {
                cy.templateDelete(dt, 200, 'trip permanently deleted')
            })
        })
    })
})