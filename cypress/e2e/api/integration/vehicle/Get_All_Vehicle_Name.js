import '../../../../support/template'

describe('MyRide Integration Test - Vehicle - Get : All Vehicle Name', () => {
    const method = 'get'
    const url = '/api/v1/vehicle/name'

    it('TC-INT-VH-001 : User Can See All Vehicle Name With Valid Data', () => {
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
            }).as('UserCanSeeAllVehicleNameWithValidData')
            cy.get('@UserCanSeeAllVehicleNameWithValidData').then(dt => {
                cy.templateGet(200,dt, null)
                expect(dt.body.message).contain('vehicle fetched')
                
                // Get Item Holder
                const res = dt.body
                expect(res).to.have.property('data')
                const data = res.data
                expect(data).to.be.an('array')

                // Get List Key / Column
                const stringFields = ['id','vehicle_plate_number','vehicle_name']
                const stringNullableFields = ['deleted_at']

                // Validate Column
                cy.templateValidateColumn(data, stringFields, 'string', false)
                cy.templateValidateColumn(data, stringNullableFields, 'string', true)

                // Validate datetime
                const columnDateTime = [
                    { column_name : 'deleted_at', date_type: 'datetime', nullable: true }
                ]
                cy.templateValidateDateTime(data, columnDateTime)
            })
        })
    })

    it('TC-INT-VH-002 : User Cant See All Vehicle Name With Empty Data', () => {
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
            }).as('UserCantSeeAllVehicleNameWithEmptyData')
            cy.get('@UserCantSeeAllVehicleNameWithEmptyData').then(dt => {
                cy.templateGet(404,dt, null)
                expect(dt.body.message).contain('vehicle not found')
                
                // Get Item Holder
                const res = dt.body
                expect(res).to.not.have.property('data')
            })
        })
    })

    it('TC-INT-VH-003 : User Cant See All Vehicle Name With Invalid Auth', () => {
        cy.request({
            method: method,
            url,
            headers: {
                Accept: `application/json`
            },
            failOnStatusCode: false,
        }).as('UserCantSeeAllVehicleNameWithInvalidAuth')
        cy.get('@UserCantSeeAllVehicleNameWithInvalidAuth').then(dt => {
            cy.templateGet(401,dt, null)
            expect(dt.body.message).contain('you need to include the authorization token from login')
            
            // Get Item Holder
            const res = dt.body
            expect(res).to.not.have.property('data')
        })
    })
})