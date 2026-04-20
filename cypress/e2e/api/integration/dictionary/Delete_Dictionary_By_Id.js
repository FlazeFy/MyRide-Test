import '../../../../support/template'

describe('MyRide Integration Test - Dictionary - Delete : Dictionary By Id', () => {
    const method = 'delete'
    const url = '/api/v1/dictionary'

    it('TC-INT-DC-003 : Admin Cant Remove Dictionary Using Invalid ID Format', () => {
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
                },
                failOnStatusCode: false,
            }).as('AdminCantRemoveDictionaryUsingInvalidIDFormat')
            cy.get('@AdminCantRemoveDictionaryUsingInvalidIDFormat').then(dt => {
                cy.templateDelete(dt, 400, {
                    "id": ["The id field must be 36 characters."]
                })
            })
        })
    })

    it('TC-INT-DC-004 : Admin Cant Remove Dictionary Using Not Found ID', () => {
        const payload = {
            username : "testeradmin",
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
            }).as('AdminCantRemoveDictionaryUsingNotFoundID')
            cy.get('@AdminCantRemoveDictionaryUsingNotFoundID').then(dt => {
                cy.templateDelete(dt, 404, 'dictionary not found')
            })
        })
    })

    it('TC-INT-DC-005 : Admin Can Remove Dictionary Using Valid ID', () => {
        const payload = {
            username : "testeradmin",
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
            }).as('AdminCanRemoveDictionaryUsingValidID')
            cy.get('@AdminCanRemoveDictionaryUsingValidID').then(dt => {
                cy.templateDelete(dt, 200, 'dictionary permanently deleted')
            })
        })
    })
})