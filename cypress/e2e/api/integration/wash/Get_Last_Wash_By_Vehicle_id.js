import '../../../../support/template'

describe('MyRide Integration Test - Wash - Get : Last Wash By Vehicle Id', () => {
    const method = 'get'
    const url = '/api/v1/wash/last'

    it('TC-INT-WS-011 : User Can See Last Wash By Vehicle Id With Valid Data', () => {
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
                }
            }).as('UserCanSeeLastWashByVehicleIdWithValidData')
            cy.get('@UserCanSeeLastWashByVehicleIdWithValidData').then(dt => {
                cy.templateGet(200,dt, null)
                expect(dt.body.message).contain('wash fetched')
                
                // Get Item Holder
                const res = dt.body
                expect(res).to.have.property('data')
                const data = res.data
                expect(data).to.be.an('object')

                // Get List Key / Column
                const stringFields = ['created_at','wash_by']
                const stringNullableFields = ['wash_desc','wash_address']

                // Validate Column
                cy.templateValidateColumn(data, stringFields, 'string', false)
                cy.templateValidateColumn(data, stringNullableFields, 'string', true)

                // Validate Contain
                cy.templateValidateContain(data, ['Myself','Carwash'], 'wash_by')

                // Validate datetime
                const columnDateTime = [
                    { column_name : 'created_at', date_type: 'datetime', nullable: false },
                ]
                cy.templateValidateDateTime(data, columnDateTime)

                // Validate Boolean
                const intBoolFields = ['is_wash_body', 'is_wash_window', 'is_wash_dashboard', 'is_wash_tires', 'is_wash_trash', 'is_wash_engine', 'is_wash_seat', 'is_wash_carpet', 'is_wash_pillows', 'is_fill_window_washing_water', 'is_wash_hollow']
                cy.templateValidateColumn(data, intBoolFields, 'bool_number', false)
            })
        })
    })

    it('TC-INT-WS-012 : User Cant See Last Wash By Vehicle Id With Invalid UUID', () => {
        const payload = {
            username : "flazefy",
            password: 'nopass123',
        }
        const vehicleId = '1'

        cy.templateIntegrationLoginAPI(payload.username, payload.password).then(token => {
            cy.request({
                method: method,
                url: `${url}/${vehicleId}`,
                headers: {
                    Authorization: `Bearer ${token}`
                },
                failOnStatusCode: false,
            }).as('UserCantSeeLastWashByVehicleIdWithInvalidUUID')
            cy.get('@UserCantSeeLastWashByVehicleIdWithInvalidUUID').then(dt => {
                cy.templateGet(400,dt, null)
                expect(dt.body.message).contain('vehicle_id must be a valid UUID')
                
                // Get Item Holder
                const res = dt.body
                expect(res).to.not.have.property('data')
            })
        })
    })

    it('TC-INT-WS-013 : User Cant See Last Wash By Vehicle Id With Not Found Vehicle', () => {
        const payload = {
            username : "testerempty",
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
            }).as('UserCantSeeLastWashByVehicleIdWithNotFoundVehicle')
            cy.get('@UserCantSeeLastWashByVehicleIdWithNotFoundVehicle').then(dt => {
                cy.templateGet(404,dt, null)
                expect(dt.body.message).contain('vehicle not found')
                
                // Get Item Holder
                const res = dt.body
                expect(res).to.not.have.property('data')
            })
        })
    })

    it('TC-INT-WS-014 : User Cant See Last Wash By Vehicle Id With Never Used Vehicle', () => {
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
            }).as('UserCantSeeLastWashByVehicleIdWithNeverUsedVehicle')
            cy.get('@UserCantSeeLastWashByVehicleIdWithNeverUsedVehicle').then(dt => {
                cy.templateGet(404,dt, null)
                expect(dt.body.message).contain('wash not found')
                
                // Get Item Holder
                const res = dt.body
                expect(res).to.not.have.property('data')
            })
        })
    })

    it('TC-INT-WS-015 : User Cant See Last Wash By Vehicle Id With Invalid Auth', () => {
        const id = '7d53371a-e363-2ad3-25fe-180dae88c062'

        cy.request({
            method: method,
            url: `${url}/${id}`,
            headers: {
                Accept: `application/json`
            },
            failOnStatusCode: false,
        }).as('UserCantSeeLastWashByVehicleIdWithInvalidAuth')
        cy.get('@UserCantSeeLastWashByVehicleIdWithInvalidAuth').then(dt => {
            cy.templateGet(401,dt, null)
            expect(dt.body.message).contain('you need to include the authorization token from login')
            
            // Get Item Holder
            const res = dt.body
            expect(res).to.not.have.property('data')
        })
    })
})