import '../../../../support/template'

describe('MyRide Integration Test - Driver - Get : All Driver Name', () => {
    const method = 'get'
    const url = '/api/v1/driver/name'

    it('TC-INT-DR-001 : User Can See All Driver Name With Valid Data', () => {
        const payload = {
            username : "flazefy",
            password: 'nopass123',
        }

        cy.templateIntegrationLoginAPI(payload.username, payload.password).then(token => {
            cy.request({
                method: method,
                url,
                headers: {
                    Authorization: `Bearer ${token}`
                },
            }).as('UserCanSeeAllDriverNameWithValidData')
            cy.get('@UserCanSeeAllDriverNameWithValidData').then(dt => {
                cy.templateGet(200,dt, null)
                expect(dt.body.message).contain('driver fetched')
                
                // Get Item Holder
                const res = dt.body
                expect(res).to.have.property('data')
                const data = res.data
                expect(data).to.be.an('array')

                // Get List Key / Column
                const stringFields = ["id","username","fullname"] 

                // Validate Column
                cy.templateValidateColumn(data, stringFields, 'string', false)
            })
        })
    })

    it('TC-INT-DR-002 : User Cant See All Driver Name With Empty Data', () => {
        const payload = {
            username : "testerempty",
            password: 'nopass123',
        }

        cy.templateIntegrationLoginAPI(payload.username, payload.password).then(token => {
            cy.request({
                method: method,
                url,
                headers: {
                    Authorization: `Bearer ${token}`
                },
                failOnStatusCode: false,
            }).as('UserCantSeeAllDriverNameWithEmptyData')
            cy.get('@UserCantSeeAllDriverNameWithEmptyData').then(dt => {
                cy.templateGet(404,dt, null)
                expect(dt.body.message).contain('driver not found')
                
                // Get Item Holder
                const res = dt.body
                expect(res).to.not.have.property('data')
            })
        })
    })

    it('TC-INT-DR-003 : User Cant See All Driver Name With Invalid Auth', () => {
        cy.request({
            method: method,
            url,
            headers: {
                Accept: `application/json`
            },
            failOnStatusCode: false,
        }).as('UserCantSeeAllDriverNameWithInvalidAuth')
        cy.get('@UserCantSeeAllDriverNameWithInvalidAuth').then(dt => {
            cy.templateGet(401,dt, null)
            expect(dt.body.message).contain('you need to include the authorization token from login')
            
            // Get Item Holder
            const res = dt.body
            expect(res).to.not.have.property('data')
        })
    })
})