import '../../../../support/template'

describe('MyRide Integration Test - Wash - Get : Wash Summary Per Vehicle', () => {
    const method = 'get'
    const url = '/api/v1/wash/summary'

    it('TC-INT-WS-008 : User Can See Wash Summary Per Vehicle With Valid Data', () => {
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
            }).as('UserCanSeeWashSummaryPerVehicleWithValidData')
            cy.get('@UserCanSeeWashSummaryPerVehicleWithValidData').then(dt => {
                cy.templateGet(200,dt, null)
                expect(dt.body.message).contain('wash fetched')
                
                // Get Item Holder
                const res = dt.body
                expect(res).to.have.property('data')
                const data = res.data
                expect(data).to.be.an('array')

                // Get List Key / Column
                const stringFields = ['vehicle_type','vehicle_plate_number','vehicle_name']
                const intFields = ["total_wash", "total_wash_body", "total_wash_window", "total_wash_dashboard", "total_wash_tires", "total_wash_trash", "total_wash_engine", "total_wash_seat", "total_wash_carpet", "total_wash_pillows", "total_fill_window_washing_water", "total_wash_hollow", "total_price", "avg_price_per_wash"]

                // Validate Column
                cy.templateValidateColumn(data, stringFields, 'string', false)
                cy.templateValidateColumn(data, intFields, 'number', false)
            })
        })
    })

    it('TC-INT-WS-009 : User Cant See Wash Summary Per Vehicle With Empty Data', () => {
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
            }).as('UserCantSeeWashSummaryPerVehicleWithEmptyData')
            cy.get('@UserCantSeeWashSummaryPerVehicleWithEmptyData').then(dt => {
                cy.templateGet(404,dt, null)
                expect(dt.body.message).contain('wash not found')
                
                // Get Item Holder
                const res = dt.body
                expect(res).to.not.have.property('data')
            })
        })
    })

    it('TC-INT-WS-010 : User Cant See Wash Summary Per Vehicle With Invalid Auth', () => {
        cy.request({
            method: method,
            url,
            headers: {
                Accept: `application/json`
            },
            failOnStatusCode: false,
        }).as('UserCantSeeWashSummaryPerVehicleWithInvalidAuth')
        cy.get('@UserCantSeeWashSummaryPerVehicleWithInvalidAuth').then(dt => {
            cy.templateGet(401,dt, null)
            expect(dt.body.message).contain('you need to include the authorization token from login')
            
            // Get Item Holder
            const res = dt.body
            expect(res).to.not.have.property('data')
        })
    })
})