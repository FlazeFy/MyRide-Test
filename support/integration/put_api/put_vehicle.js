// Components
import '../../components/template'

describe('MyRide Integration Test - Vehicle', () => {
    const method = 'put'

    it('Recover Vehicle By Id', () => {
        const id = 'f997d3c3-f78c-46c9-1d95-602b24f29382' 
        const payload = {
            username : "ricky.cremin",
            password: 'nopass123',
        }

        cy.templateIntegrationLoginAPI(payload.username, payload.password).then(token => {
            cy.request({
                method: method,
                url: `/api/v1/vehicle/recover/${id}`,
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).as('RecoverVehicleById')
            cy.get('@RecoverVehicleById').then(dt => {
                cy.templatePut(dt)
                expect(dt.body.message).contain('driver recovered')
            })
        })
    })
})