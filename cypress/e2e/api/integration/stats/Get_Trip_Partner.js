import '../../../../support/template'

describe('MyRide Integration Test - Stats - Get : Partner Trip', () => {
    const method = 'get'
    const url = '/api/v1/stats/partner'

    it('TC-INT-ST-006 : User Can See List Of Partner Trip', () => {
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
                }
            }).as('UserCanSeeListOfTripPartner')
            cy.get('@UserCanSeeListOfTripPartner').then(dt => {
                cy.templateGet(200,dt, null)
                expect(dt.body.message).contain('stats fetched')
                
                // Get Item Holder
                const res = dt.body
                expect(res).to.have.property('data')
                const data = res.data
                expect(data).to.be.an('array')

                // Get List Key / Column
                const stringFields = ['name','favorite_day','last_trip']
                const intFelds = ['total_trip','total_distance']

                // Validate Column
                cy.templateValidateColumn(data, stringFields, 'string', false)
                cy.templateValidateColumn(data, intFelds, 'number', false)
            })
        })
    })

    it('TC-INT-ST-007 : User Cant See Partner Trip List When No Trip Data Exists', () => {
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
            }).as('UserCantSeePartnerTripListWhenNoTripDataExists')
            cy.get('@UserCantSeePartnerTripListWhenNoTripDataExists').then(dt => {
                cy.templateGet(404,dt, null)
                expect(dt.body.message).contain('stats not found')
                
                // Get Item Holder
                const res = dt.body
                expect(res).to.not.have.property('data')
            })
        })
    })

    it('TC-INT-ST-008 : User Cant See Partner Trip List With Invalid Auth', () => {
        cy.request({
            method: method,
            url,
            headers: {
                Accept: `application/json`
            },
            failOnStatusCode: false,
        }).as('UserCantSeePartnerTripListWithInvalidAuth')
        cy.get('@UserCantSeePartnerTripListWithInvalidAuth').then(dt => {
            cy.templateGet(401,dt, null)
            expect(dt.body.message).contain('you need to include the authorization token from login')
            
            // Get Item Holder
            const res = dt.body
            expect(res).to.not.have.property('data')
        })
    })
})