// Components
import '../../components/template'

describe('MyRide Integration Test - Driver', () => {
    const method = 'delete'

    it('Hard Delete Driver By Id', () => {
        const id = 'f997d3c3-f78c-46c9-1d95-602b24f29382' 
        const payload = {
            username : "ricky.cremin",
            password: 'nopass123',
        }

        cy.templateIntegrationLoginAPI(payload.username, payload.password).then(token => {
            cy.request({
                method: method,
                url: `/api/v1/driver/destroy/${id}`,
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).as('HardDeleteDriverById')
            cy.get('@HardDeleteDriverById').then(dt => {
                cy.templateDelete(dt)
                expect(dt.body.message).contain('driver permentally deleted')
            })
        })
    })

    it('Hard Delete Driver Relation By Id', () => {
        const id = 'f997d3c3-f78c-46c9-1d95-602b24f29382' 
        const payload = {
            username : "ricky.cremin",
            password: 'nopass123',
        }

        cy.templateIntegrationLoginAPI(payload.username, payload.password).then(token => {
            cy.request({
                method: method,
                url: `/api/v1/driver/destroy/relation/${id}`,
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).as('HardDeleteDriverRelationById')
            cy.get('@HardDeleteDriverRelationById').then(dt => {
                cy.templateDelete(dt)
                expect(dt.body.message).contain('driver relation permentally deleted')
            })
        })
    })
})