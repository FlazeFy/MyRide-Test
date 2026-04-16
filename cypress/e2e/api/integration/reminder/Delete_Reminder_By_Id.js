import '../../../../support/template'

describe('MyRide Integration Test - Reminder - Delete : Reminder By Id', () => {
    const method = 'delete'
    const url = '/api/v1/reminder/destroy'

    it('TC-INT-RM-013 : User Cant Remove Reminder Using Invalid ID Format', () => {
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
            }).as('UserCantRemoveReminderUsingInvalidIDFormat')
            cy.get('@UserCantRemoveReminderUsingInvalidIDFormat').then(dt => {
                cy.templateDelete(dt, 400, {
                    "id": ["The id field must be at least 36 characters."]
                })
            })
        })
    })

    it('TC-INT-RM-014 : User Cant Remove Reminder Using Not Found ID', () => {
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
            }).as('UserCantRemoveReminderUsingNotFoundID')
            cy.get('@UserCantRemoveReminderUsingNotFoundID').then(dt => {
                cy.templateDelete(dt, 404, 'reminder not found')
            })
        })
    })

    it('TC-INT-RM-015 : User Can Remove Reminder Using Valid ID', () => {
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
            }).as('UserCanRemoveReminderUsingValidID')
            cy.get('@UserCanRemoveReminderUsingValidID').then(dt => {
                cy.templateDelete(dt, 200, 'reminder permentally deleted')
            })
        })
    })
})