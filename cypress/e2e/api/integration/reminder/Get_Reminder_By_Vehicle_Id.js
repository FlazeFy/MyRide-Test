import '../../../../support/template'

describe('MyRide Integration Test - Reminder - Get : Reminder By Vehicle Id', () => {
    const method = 'get'
    const url = '/api/v1/reminder/vehicle'

    it('TC-INT-RM-009 : User Can See Reminder By Vehicle Id With Valid Data', () => {
        const payload = {
            username : "flazefy",
            password: 'nopass123',
        }
        const vehicleId = '7d53371a-e363-2ad3-25fe-180dae88c062'

        cy.templateIntegrationLoginAPI(payload.username, payload.password).then(token => {
            cy.request({
                method: method,
                url: `${url}/${vehicleId}`,
                headers: {
                    Authorization: `Bearer ${token}`
                },
                failOnStatusCode: false,
            }).as('UserCanSeeReminderByVehicleIdWithValidData')
            cy.get('@UserCanSeeReminderByVehicleIdWithValidData').then(dt => {
                cy.templateGet(200,dt, null)
                expect(dt.body.message).contain('reminder fetched')
                
                // Get Item Holder
                const res = dt.body
                expect(res).to.have.property('data')
                const data = res.data
                expect(data).to.be.an('array')

                // Get List Key / Column
                const stringFields = ["reminder_title","reminder_context","reminder_body","remind_at"]

                // Validate Column
                cy.templateValidateColumn(data, stringFields, 'string', false)

                // Validate datetime
                const columnDateTime = [
                    { column_name : 'remind_at', date_type: 'datetime', nullable: false }
                ]
                cy.templateValidateDateTime(data, columnDateTime)
            })
        })
    })

    it('TC-INT-RM-010 : User Cant See Reminder By Vehicle Id With Empty Data', () => {
        const payload = {
            username : "flazefy",
            password: 'nopass123',
        }
        const vehicleId = '88a003eb-d1a6-6b3f-2015-1e11d3186975'

        cy.templateIntegrationLoginAPI(payload.username, payload.password).then(token => {
            cy.request({
                method: method,
                url: `${url}/${vehicleId}`,
                headers: {
                    Authorization: `Bearer ${token}`
                },
                failOnStatusCode: false,
            }).as('UserCantSeeReminderByVehicleIdWithEmptyData')
            cy.get('@UserCantSeeReminderByVehicleIdWithEmptyData').then(dt => {
                cy.templateGet(404,dt, null)
                expect(dt.body.message).contain('reminder not found')
                
                // Get Item Holder
                const res = dt.body
                expect(res).to.not.have.property('data')
            })
        })
    })

    it('TC-INT-RM-011 : User Cant See Reminder By Vehicle Id With Not Found Vehicle', () => {
        const payload = {
            username : "testerempty",
            password: 'nopass123',
        }
        const vehicleId = '88a003eb-d1a6-6b3f-2015-1e11d3186911'

        cy.templateIntegrationLoginAPI(payload.username, payload.password).then(token => {
            cy.request({
                method: method,
                url: `${url}/${vehicleId}`,
                headers: {
                    Authorization: `Bearer ${token}`
                },
                failOnStatusCode: false,
            }).as('UserCantSeeReminderByVehicleIdWithNotFoundVehicle')
            cy.get('@UserCantSeeReminderByVehicleIdWithNotFoundVehicle').then(dt => {
                cy.templateGet(404,dt, null)
                expect(dt.body.message).contain('vehicle not found')
                
                // Get Item Holder
                const res = dt.body
                expect(res).to.not.have.property('data')
            })
        })
    })

    it('TC-INT-RM-012 : User Cant See Reminder By Vehicle Id With Invalid Auth', () => {
        const vehicleId = '7d53371a-e363-2ad3-25fe-180dae88c062'

        cy.request({
            method: method,
            url: `${url}/${vehicleId}`,
            headers: {
                Accept: `application/json`
            },
            failOnStatusCode: false,
        }).as('UserCantSeeReminderByVehicleIdWithInvalidAuth')
        cy.get('@UserCantSeeReminderByVehicleIdWithInvalidAuth').then(dt => {
            cy.templateGet(401,dt, null)
            expect(dt.body.message).contain('you need to include the authorization token from login')
            
            // Get Item Holder
            const res = dt.body
            expect(res).to.not.have.property('data')
        })
    })
})