import '../../../../support/template'

describe('MyRide Integration Test - Dictionary - Get : All Dictionary By Type', () => {
    const method = 'get'
    const url = '/api/v1/dictionary/type'

    it('TC-INT-DC-001 : User Can See All Dictionary Valid Data By Category', () => {
        const payload = {
            username : "flazefy",
            password: 'nopass123',
        }
        const context = 'inventory_storage'

        cy.templateIntegrationLoginAPI(payload.username, payload.password).then(token => {
            cy.request({
                method: method,
                url: `${url}/${context}`,
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).as('UserCanSeeAllDictionaryValidDataByCategory')
            cy.get('@UserCanSeeAllDictionaryValidDataByCategory').then(dt => {
                cy.templateGet(200,dt, null)
                expect(dt.body.message).contain('dictionary fetched')
                
                // Get Item Holder
                const res = dt.body
                expect(res).to.have.property('data')
                const data = res.data
                expect(data).to.be.an('array')

                // Get List Key / Column
                const stringFields = ['dictionary_name','dictionary_type']

                // Validate Column
                cy.templateValidateColumn(data, stringFields, 'string', false)
            })
        })
    })

    it('TC-INT-DC-002 : User Cant See Total Trip By Context With Invalid Context', () => {
        const payload = {
            username : "flazefy",
            password: 'nopass123',
        }
        const context = 'inventory_storage_old'

        cy.templateIntegrationLoginAPI(payload.username, payload.password).then(token => {
            cy.request({
                method: method,
                url: `${url}/${context}`,
                headers: {
                    Authorization: `Bearer ${token}`
                },
                failOnStatusCode: false,
            }).as('UserCantSeeTotalTripByContextWithInvalidContext')
            cy.get('@UserCantSeeTotalTripByContextWithInvalidContext').then(dt => {
                cy.templateGet(404,dt, null)
                expect(dt.body.message).contain('dictionary not found')
                
                // Get Item Holder
                const res = dt.body
                expect(res).to.not.have.property('data')
            })
        })
    })
})