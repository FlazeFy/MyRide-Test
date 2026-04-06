import '../../../../support/template'

describe('MyRide Integration Test - Stats - Get : Total Trip By Context', () => {
    const method = 'get'
    const url = '/api/v1/stats/total/trip'

    it('TC-INT-ST-002 : User Can See Total Trip By Context With Valid Context And Valid Data', () => {
        const payload = {
            username : "flazefy",
            password: 'nopass123',
        }
        const context = 'trip_category'

        cy.templateIntegrationLoginAPI(payload.username, payload.password).then(token => {
            cy.request({
                method: method,
                url: `${url}/${context}`,
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).as('SuccessGetTotalTripByContextWithValidContextAndValidData')
            cy.get('@SuccessGetTotalTripByContextWithValidContextAndValidData').then(dt => {
                cy.templateGet(200,dt, null)
                expect(dt.body.message).contain('stats fetched')
                
                // Get Item Holder
                const res = dt.body
                expect(res).to.have.property('data')
                const data = res.data
                expect(data).to.be.an('array')

                // Get List Key / Column
                const stringFields = ['context']
                const intFields = ['total']

                // Validate Column
                cy.templateValidateColumn(data, stringFields, 'string', false)
                cy.templateValidateColumn(data, intFields, 'number', false)
            })
        })
    })

    it('TC-INT-ST-003 : User Cant See Total Trip By Context With Invalid Context', () => {
        const payload = {
            username : "flazefy",
            password: 'nopass123',
        }
        const context = 'trip_categories'

        cy.templateIntegrationLoginAPI(payload.username, payload.password).then(token => {
            cy.request({
                method: method,
                url: `${url}/${context}`,
                headers: {
                    Authorization: `Bearer ${token}`
                },
                failOnStatusCode: false,
            }).as('FailedGetTotalTripByContextWithInvalidContext')
            cy.get('@FailedGetTotalTripByContextWithInvalidContext').then(dt => {
                cy.templateGet(400,dt, null)
                expect(dt.body.message).contain('trip_categories is not available')
                
                // Get Item Holder
                const res = dt.body
                expect(res).to.not.have.property('data')
            })
        })
    })

    it('TC-INT-ST-004 : User Cant See Total Trip By Context With Valid Context And Empty Data', () => {
        const payload = {
            username : "testerempty",
            password: 'nopass123',
        }
        const context = 'trip_category'

        cy.templateIntegrationLoginAPI(payload.username, payload.password).then(token => {
            cy.request({
                method: method,
                url: `${url}/${context}`,
                headers: {
                    Authorization: `Bearer ${token}`
                },
                failOnStatusCode: false,
            }).as('SuccessGetTotalTripByContextWithValidContextAndEmptyData')
            cy.get('@SuccessGetTotalTripByContextWithValidContextAndEmptyData').then(dt => {
                cy.templateGet(404,dt, null)
                expect(dt.body.message).contain('stats not found')
                
                // Get Item Holder
                const res = dt.body
                expect(res).to.not.have.property('data')
            })
        })
    })

    it('TC-INT-ST-005 : User Cant See Total Trip By Context With Invalid Auth', () => {
        const context = 'trip_category'

        cy.request({
            method: method,
            url: `${url}/${context}`,
            headers: {
                Accept: `application/json`
            },
            failOnStatusCode: false,
        }).as('FailedGetTotalTripByContextWithInvalidAuth')
        cy.get('@FailedGetTotalTripByContextWithInvalidAuth').then(dt => {
            cy.templateGet(401,dt, null)
            expect(dt.body.message).contain('you need to include the authorization token from login')
            
            // Get Item Holder
            const res = dt.body
            expect(res).to.not.have.property('data')
        })
    })
})