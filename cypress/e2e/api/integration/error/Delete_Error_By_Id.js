import '../../../../support/template'

describe('MyRide Integration Test - Error - Delete : Error By Id', () => {
    const method = 'delete'
    const url = '/api/v1/error/destroy'

    it('TC-INT-ER-001 : Admin Cant Remove Error Using Not Found ID', () => {
        const payload = {
            username : "testeradmin",
            password: 'nopass123',
        }
        const id = '0'

        cy.templateIntegrationLoginAPI(payload.username, payload.password).then(token => {
            cy.request({
                method: method,
                url: `${url}/${id}`,
                headers: {
                    Authorization: `Bearer ${token}`
                },
                failOnStatusCode: false,
            }).as('AdminCantRemoveErrorUsingNotFoundID')
            cy.get('@AdminCantRemoveErrorUsingNotFoundID').then(dt => {
                cy.templateDelete(dt, 404, 'error not found')
            })
        })
    })

    it('TC-INT-ER-002 : Admin Can Remove Error Using Valid ID', () => {
        const payload = {
            username : "testeradmin",
            password: 'nopass123',
        }
        const id = '1'

        cy.templateIntegrationLoginAPI(payload.username, payload.password).then(token => {
            cy.request({
                method: method,
                url: `${url}/${id}`,
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).as('AdminCanRemoveErrorUsingValidID')
            cy.get('@AdminCanRemoveErrorUsingValidID').then(dt => {
                cy.templateDelete(dt, 200, 'error permentally deleted')
            })
        })
    })
})