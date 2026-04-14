import '../../../../support/template'

describe('MyRide Integration Test - Driver - Get : All Driver Vehicle Management List Management List', () => {
    const method = 'get'
    const url = '/api/v1/driver/vehicle/list'

    const validateValidResponse = (dt) => {
        cy.templateGet(200,dt, null)
        expect(dt.body.message).contain('driver fetched')
        
        // Get Item Holder
        const res = dt.body
        expect(res).to.have.property('data')
        const data = res.data
        expect(data).to.be.an('object')

        // Get List Key / Column
        const stringVehicleFields = ['id','vehicle_name','vehicle_plate_number','deleted_at']
        const stringDriverFields = ['id','username','fullname']
        const stringAssignedFields = ['id','vehicle_id','vehicle_plate_number','driver_id','username','fullname']

        // Validate Column
        if (data.vehicle) cy.templateValidateColumn(data.vehicle, stringVehicleFields, 'string', false)
        if (data.driver) cy.templateValidateColumn(data.driver, stringDriverFields, 'string', false)
        if (data.assigned) cy.templateValidateColumn(data.assigned, stringAssignedFields, 'string', false)
    }

    it('TC-INT-DR-014 : User Can See All Driver Vehicle Management List With Valid Data', () => {
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
            }).as('UserCanSeeAllDriverVehicleManagementListWithValidData')
            cy.get('@UserCanSeeAllDriverVehicleManagementListWithValidData').then(dt => {
                validateValidResponse(dt)

                // Check if all page accessible
                const last_page = dt.body.data.last_page
                cy.templatePagination(url, last_page, token)
            })
        })
    })

    it('TC-INT-DR-015 : User Cant See All Driver Vehicle Management List With Empty Data', () => {
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
            }).as('UserCantSeeAllDriverVehicleManagementListWithEmptyData')
            cy.get('@UserCantSeeAllDriverVehicleManagementListWithEmptyData').then(dt => {
                cy.templateGet(404,dt, null)
                expect(dt.body.message).contain('driver not found')
                
                // Get Item Holder
                const res = dt.body
                expect(res).to.not.have.property('data')
            })
        })
    })

    it('TC-INT-DR-016 : User Cant See All Driver Vehicle Management List With Invalid Auth', () => {
        cy.request({
            method: method,
            url,
            headers: {
                Accept: `application/json`
            },
            failOnStatusCode: false,
        }).as('UserCantSeeAllDriverVehicleManagementListWithInvalidAuth')
        cy.get('@UserCantSeeAllDriverVehicleManagementListWithInvalidAuth').then(dt => {
            cy.templateGet(401,dt, null)
            expect(dt.body.message).contain('you need to include the authorization token from login')
            
            // Get Item Holder
            const res = dt.body
            expect(res).to.not.have.property('data')
        })
    })
})