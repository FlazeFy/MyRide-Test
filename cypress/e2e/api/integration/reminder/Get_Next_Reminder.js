import '../../../../support/template'

describe('MyRide Integration Test - Reminder - Get : Next Reminder', () => {
    const method = 'get'
    const url = '/api/v1/reminder/next'

    it('TC-INT-RM-001 : User Can See Next Reminder With Valid Data', () => {
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
                failOnStatusCode: false,
            }).as('UserCanSeeNextReminderWithValidData')
            cy.get('@UserCanSeeNextReminderWithValidData').then(dt => {
                cy.templateGet(200,dt, null)
                expect(dt.body.message).contain('reminder fetched')
                
                // Get Item Holder
                const res = dt.body
                expect(res).to.have.property('data')
                const data = res.data
                expect(data).to.be.an('object')

                // Get List Key / Column
                const stringFields = ["reminder_title","reminder_context","reminder_body","vehicle_plate_number"]

                // Validate Column
                cy.templateValidateColumn(data, stringFields, 'string', false)
            })
        })
    })

    it('TC-INT-RM-002 : User Cant See Next Reminder With Empty Data', () => {
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
            }).as('UserCantSeeNextReminderWithEmptyData')
            cy.get('@UserCantSeeNextReminderWithEmptyData').then(dt => {
                cy.templateGet(404,dt, null)
                expect(dt.body.message).contain('reminder not found')
                
                // Get Item Holder
                const res = dt.body
                expect(res).to.not.have.property('data')
            })
        })
    })

    it('TC-INT-RM-003 : User Cant See Next Reminder With Invalid Auth', () => {
        cy.request({
            method: method,
            url,
            headers: {
                Accept: `application/json`
            },
            failOnStatusCode: false,
        }).as('UserCantSeeNextReminderWithInvalidAuth')
        cy.get('@UserCantSeeNextReminderWithInvalidAuth').then(dt => {
            cy.templateGet(401,dt, null)
            expect(dt.body.message).contain('you need to include the authorization token from login')
            
            // Get Item Holder
            const res = dt.body
            expect(res).to.not.have.property('data')
        })
    })
})