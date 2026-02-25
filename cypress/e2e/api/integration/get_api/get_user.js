// utils
import '../../utils/template'

describe('MyRide API Testing - User', () => {
    // Template
    const method = 'get'

    it(method.toUpperCase() + ' - My Profile', () => {
        const payload = {
            username : "ricky.cremin",
            password: 'nopass123',
        }

        cy.templateIntegrationLoginAPI(payload.username, payload.password).then(token => {
            cy.request({
                method: method,
                url: 'api/v1/user/my_profile',
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).as(method + 'MyProfile')
            cy.get('@' + method + 'MyProfile').then(dt => {
                cy.templateGet(dt, null)

                // Get item holder
                const resultItem = dt.body
                expect(resultItem).to.have.property('data')
                const dataArr = resultItem.data
                expect(dataArr).to.be.an('object')

                // Get list key / column
                const stringFields = ['id','username','email','created_at','role']
                const stringNullableFields = ['telegram_user_id','updated_at']
                const intNullableFields = ['telegram_is_valid']

                // Validate column
                cy.templateValidateColumn(dataArr, stringFields, 'string', false)
                cy.templateValidateColumn(dataArr, stringNullableFields, 'string', true)
                cy.templateValidateColumn(dataArr, intNullableFields, 'number', true)
            })
        })
    })

    it(method.toUpperCase() + ' - Content Year', () => {
        const payload = {
            username : "ricky.cremin",
            password: 'nopass123',
        }

        cy.templateIntegrationLoginAPI(payload.username, payload.password).then(token => {
            cy.request({
                method: method,
                url: 'api/v1/user/my_year',
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).as(method + 'ContentYear')
            cy.get('@' + method + 'ContentYear').then(dt => {
                cy.templateGet(dt, null)

                // Get item holder
                const resultItem = dt.body
                expect(resultItem).to.have.property('data')
                const dataArr = resultItem.data
                expect(dataArr).to.be.an('array')

                // Get list key / column
                const intFields = ['year']

                // Validate column
                cy.templateValidateColumn(dataArr, intFields, 'number', false)
            })
        })
    })
})