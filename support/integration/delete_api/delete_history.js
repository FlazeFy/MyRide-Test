// Components
import '../../components/template'

describe('MyRide Integration Test - History', () => {
    const method = 'delete'

    it('Hard Delete History By Id', () => {
        const id = 'f997d3c3-f78c-46c9-1d95-602b24f29382' 
        const payload = {
            username : "ricky.cremin",
            password: 'nopass123',
        }

        cy.templateIntegrationLoginAPI(payload.username, payload.password).then(token => {
            cy.request({
                method: method,
                url: `/api/v1/history/destroy/${id}`,
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).as('HardDeleteHistoryById')
            cy.get('@HardDeleteHistoryById').then(dt => {
                cy.templateDelete(dt)
                expect(dt.body.message).contain('history permentally deleted')
            })
        })
    })
})