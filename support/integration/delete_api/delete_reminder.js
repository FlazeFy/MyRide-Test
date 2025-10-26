// Components
import '../../components/template'

describe('MyRide Integration Test - Reminder', () => {
    const method = 'delete'

    it('Hard Delete Reminder By Id', () => {
        const id = 'f997d3c3-f78c-46c9-1d95-602b24f29382' 
        const payload = {
            username : "ricky.cremin",
            password: 'nopass123',
        }

        cy.templateIntegrationLoginAPI(payload.username, payload.password).then(token => {
            cy.request({
                method: method,
                url: `/api/v1/reminder/destroy/${id}`,
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).as('HardDeleteReminderById')
            cy.get('@HardDeleteReminderById').then(dt => {
                cy.templateDelete(dt)
                expect(dt.body.message).contain('reminder permentally deleted')
            })
        })
    })
})