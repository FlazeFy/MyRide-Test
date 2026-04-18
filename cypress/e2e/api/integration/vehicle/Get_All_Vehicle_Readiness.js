import '../../../../support/template'

describe('MyRide Integration Test - Vehicle - Get : All Vehicle Readiness', () => {
    const method = 'get'
    const url = '/api/v1/vehicle/readiness'

    const validateValidResponse = (dt) => {
        cy.templateGet(200,dt, null)
        expect(dt.body.message).contain('vehicle fetched')
        
        // Get Item Holder
        const res = dt.body
        expect(res).to.have.property('data')
        const data = res.data
        expect(data).to.be.an('object')

        // Get List Key / Column
        const stringFields = ['id','vehicle_name','vehicle_status','vehicle_fuel_status','vehicle_plate_number','vehicle_type','vehicle_transmission']
        const stringNullableFields = ['deleted_at']
        const intFields = ['readiness','vehicle_capacity']

        // Validate Column
        cy.templateValidateColumn(data.data, stringFields, 'string', false)
        cy.templateValidateColumn(data.data, stringNullableFields, 'string', true)
        cy.templateValidateColumn(data.data, intFields, 'number', false)

        // Validate Contain
        cy.templateValidateContain(data.data, ['Available','Under Maintenance','Damaged','Reserved'], 'vehicle_status')
        cy.templateValidateContain(data.data, ['Normal','Full','High','Low','Empty','Not Monitored'], 'vehicle_fuel_status')
        cy.templateValidateContain(data.data, [
            'City Car','Minibus','Motorcycle','Hatchback','Sedan','SUV','Pickup Truck','Convertible','Coupe','Van','Wagon','Crossover','Electric Vehicle'
        ], 'vehicle_type')
        cy.templateValidateContain(data.data, ['CVT','Manual','Automatic'], 'vehicle_transmission')

        // Validate datetime
        const columnDateTime = [
            { column_name : 'deleted_at', date_type: 'datetime', nullable: true }
        ]
        cy.templateValidateDateTime(data.data, columnDateTime)
    }

    it('TC-INT-VH-007 : User Can See All Vehicle Readiness With Valid Data', () => {
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
            }).as('UserCanSeeAllVehicleReadinessWithValidData')
            cy.get('@UserCanSeeAllVehicleReadinessWithValidData').then(dt => {
                validateValidResponse(dt)

                // Check if all page accessible
                const last_page = dt.body.data.last_page
                cy.templatePagination(url, last_page, token)
            })
        })
    })

    it('TC-INT-VH-008 : User Can See All Vehicle Readiness With Custom Item Per Page', () => {
        const payload = {
            username : "flazefy",
            password: 'nopass123',
        }
        const itemPerPage = 2

        cy.templateIntegrationLoginAPI(payload.username, payload.password).then(token => {
            cy.request({
                method: method,
                url: `${url}?per_page_key=${itemPerPage}`,
                headers: {
                    Authorization: `Bearer ${token}`
                },
            }).as('UserCanSeeAllVehicleReadinessWithCustomItemPerPage')
            cy.get('@UserCanSeeAllVehicleReadinessWithCustomItemPerPage').then(dt => {
                validateValidResponse(dt)

                // Check if item per page query same with data.length
                const data = dt.body.data.data
                cy.expect(data.length).to.equal(itemPerPage)
            })
        })
    })

    it('TC-INT-VH-009 : User Cant See All Vehicle Readiness With Custom Invalid Item Per Page', () => {
        const payload = {
            username : "flazefy",
            password: 'nopass123',
        }
        const itemPerPage = 'test'

        cy.templateIntegrationLoginAPI(payload.username, payload.password).then(token => {
            cy.request({
                method: method,
                url: `${url}?per_page_key=${itemPerPage}`,
                headers: {
                    Authorization: `Bearer ${token}`
                },
                failOnStatusCode: false,
            }).as('UserCantSeeAllVehicleReadinessWithCustomInvalidItemPerPage')
            cy.get('@UserCantSeeAllVehicleReadinessWithCustomInvalidItemPerPage').then(dt => {
                cy.templateGet(400,dt, null)
                expect(dt.body.message).contain('per_page_key is not a valid page')
                
                // Get Item Holder
                const res = dt.body
                expect(res).to.not.have.property('data')
            })
        })
    })

    it('TC-INT-VH-010 : User Cant See All Vehicle Readiness With Empty Data', () => {
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
            }).as('UserCantSeeAllVehicleReadinessWithEmptyData')
            cy.get('@UserCantSeeAllVehicleReadinessWithEmptyData').then(dt => {
                cy.templateGet(404,dt, null)
                expect(dt.body.message).contain('vehicle not found')
                
                // Get Item Holder
                const res = dt.body
                expect(res).to.not.have.property('data')
            })
        })
    })

    it('TC-INT-VH-011 : User Cant See All Vehicle Readiness With Invalid Auth', () => {
        cy.request({
            method: method,
            url,
            headers: {
                Accept: `application/json`
            },
            failOnStatusCode: false,
        }).as('UserCantSeeAllVehicleReadinessWithInvalidAuth')
        cy.get('@UserCantSeeAllVehicleReadinessWithInvalidAuth').then(dt => {
            cy.templateGet(401,dt, null)
            expect(dt.body.message).contain('you need to include the authorization token from login')
            
            // Get Item Holder
            const res = dt.body
            expect(res).to.not.have.property('data')
        })
    })
})