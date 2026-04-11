import '../../../../support/template'

describe('MyRide Integration Test - Service - Get : Next Service', () => {
    const method = 'get'
    const url = '/api/v1/service/next'

    it('TC-INT-SV-013 : User Can See Next Service With Valid Data', () => {
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
            }).as('UserCanSeeNextServiceWithValidData')
            cy.get('@UserCanSeeNextServiceWithValidData').then(dt => {
                cy.templateGet(200,dt, null)
                expect(dt.body.message).contain('service fetched')
                
                // Get Item Holder
                const res = dt.body
                expect(res).to.have.property('data')
                const data = res.data
                expect(data).to.be.an('object')

                // Get List Key / Column
                const stringFields = ["service_category","service_location","vehicle_plate_number","remind_at"] 
                // In the database, the remind_at column is nullable. However, for this feature, it is always filled, because the data is retrieved based on whether remind_at is defined or not
                const stringNullableFields = ["service_note"]
                const intNullableFields = ["service_price_total"]

                // Validate Column
                cy.templateValidateColumn(data, stringFields, 'string', false)
                cy.templateValidateColumn(data, stringNullableFields, 'string', true)
                cy.templateValidateColumn(data, intNullableFields, 'number', true)

                // Validate Contain
                cy.templateValidateContain(data, ['Routine', 'Repair', 'Inspection', 'Emergency'], "service_category")

                // Validate datetime
                const columnDateTime = [
                    { column_name : 'remind_at', date_type: 'datetime', nullable: false }
                ]
                cy.templateValidateDateTime(data, columnDateTime)
            })
        })
    })

    it('TC-INT-SV-014 : User Cant See Next Service With Empty Data', () => {
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
            }).as('UserCantSeeNextServiceWithEmptyData')
            cy.get('@UserCantSeeNextServiceWithEmptyData').then(dt => {
                cy.templateGet(404,dt, null)
                expect(dt.body.message).contain('service not found')
                
                // Get Item Holder
                const res = dt.body
                expect(res).to.not.have.property('data')
            })
        })
    })

    it('TC-INT-SV-015 : User Cant See Next Service With Invalid Auth', () => {
        cy.request({
            method: method,
            url,
            headers: {
                Accept: `application/json`
            },
            failOnStatusCode: false,
        }).as('UserCantSeeNextServiceWithInvalidAuth')
        cy.get('@UserCantSeeNextServiceWithInvalidAuth').then(dt => {
            cy.templateGet(401,dt, null)
            expect(dt.body.message).contain('you need to include the authorization token from login')
            
            // Get Item Holder
            const res = dt.body
            expect(res).to.not.have.property('data')
        })
    })
})