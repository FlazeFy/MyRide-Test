// utils
import '../../utils/template'

describe('MyRide API Testing - History', () => {
    // Template
    const method = 'get'

    it(method.toUpperCase() + ' - All History', () => {
        const payload = {
            username : "ricky.cremin",
            password: 'nopass123',
        }

        cy.templateIntegrationLoginAPI(payload.username, payload.password).then(token => {
            const url = 'api/v1/history'
            cy.request({
                method: method,
                url: url,
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).as(method + 'AllHistory')
            cy.get('@' + method + 'AllHistory').then(dt => {
                cy.templateGet(dt, true)
                cy.templatePagination(url, dt.body.data.last_page)

                // Get item holder
                const resultItem = dt.body.data
                expect(resultItem).to.have.property('data')
                const dataArr = resultItem.data
                expect(dataArr).to.be.an('array')

                // Get list key / column
                const stringFields = ['id','history_type','history_context','created_at','created_by']

                // Validate column
                cy.templateValidateColumn(dataArr, stringFields, 'string', false)
            })
        })
    })
})