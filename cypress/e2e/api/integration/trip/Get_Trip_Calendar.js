import '../../../../support/template'

describe('MyRide Integration Test - Trip - Get : Trip Calendar', () => {
    const method = 'get'
    const url = '/api/v1/trip/calendar'

    it('TC-INT-TR-015 : User Can See Trip Calendar With Valid Data', () => {
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
            }).as('UserCanSeeTripCalendarWithValidData')
            cy.get('@UserCanSeeTripCalendarWithValidData').then(dt => {
                cy.templateGet(200,dt, null)
                expect(dt.body.message).contain('trip fetched')
                
                // Get Item Holder
                const res = dt.body
                expect(res).to.have.property('data')
                const data = res.data
                expect(data).to.be.an('array')

                // Get List Key / Column
                const stringFields = ['id','vehicle_plate_number','trip_location_name','created_at']

                // Validate Column
                cy.templateValidateColumn(data, stringFields, 'string', false)
                
                // Validate datetime
                const columnDateTime = [
                    { column_name : 'created_at', date_type: 'datetime', nullable: false }
                ]
                cy.templateValidateDateTime(data, columnDateTime)
            })
        })
    })

    it('TC-INT-TR-016 : User Cant See Trip Calendar With Empty Data', () => {
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
            }).as('UserCantSeeTripCalendarWithEmptyData')
            cy.get('@UserCantSeeTripCalendarWithEmptyData').then(dt => {
                cy.templateGet(404,dt, null)
                expect(dt.body.message).contain('trip not found')
                
                // Get Item Holder
                const res = dt.body
                expect(res).to.not.have.property('data')
            })
        })
    })

    it('TC-INT-TR-017 : User Cant See Trip Calendar With Invalid Auth', () => {
        cy.request({
            method: method,
            url,
            headers: {
                Accept: `application/json`
            },
            failOnStatusCode: false,
        }).as('UserCantSeeTripCalendarWithInvalidAuth')
        cy.get('@UserCantSeeTripCalendarWithInvalidAuth').then(dt => {
            cy.templateGet(401,dt, null)
            expect(dt.body.message).contain('you need to include the authorization token from login')
            
            // Get Item Holder
            const res = dt.body
            expect(res).to.not.have.property('data')
        })
    })
})