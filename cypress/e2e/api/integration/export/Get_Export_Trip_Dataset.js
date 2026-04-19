import '../../../../support/template'

describe('MyRide Integration Test - Trip - Get : Export Trip Dataset', () => {
    const method = 'get'
    const url = '/api/v1/export/trip'

    it('TC-INT-EX-004 : User Can Export Trip Dataset', () => {
        const payload = {
            username : "flazefy",
            password: 'nopass123',
        }
        const expectedHeader = [
            'vehicle_name','vehicle_type','vehicle_plate_number','driver_name','trip_desc','trip_category','trip_person','trip_origin_name','trip_origin_coordinate','trip_destination_name','trip_destination_coordinate','created_at','updated_at'
        ]
        
        cy.templateIntegrationLoginAPI(payload.username, payload.password).then(token => {
            cy.templateExportExcel({
                url, token, fileNameStartWith: `Trip-${payload.username}`, expectedHeader
            })
        })
    })

    it('TC-INT-EX-005 : User Cant Export Trip Dataset With Invalid Auth', () => {
        cy.request({
            method: method,
            url,
            headers: {
                Accept: `application/json`
            },
            failOnStatusCode: false,
        }).as('UserCantExportTripDatasetWithInvalidAuth')
        cy.get('@UserCantExportTripDatasetWithInvalidAuth').then(dt => {
            cy.templateGet(401,dt, null)
            expect(dt.body.message).contain('you need to include the authorization token from login')
            
            // Get Item Holder
            const res = dt.body
            expect(res).to.not.have.property('data')
        })
    })

    it('TC-INT-EX-006 : User Cant Export Trip Dataset With Empty Data', () => {
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
            }).as('UserCantExportTripDatasetWithEmptyData')
            cy.get('@UserCantExportTripDatasetWithEmptyData').then(dt => {
                cy.templateGet(404,dt, null)
                expect(dt.body.message).contain('trip not found')
                
                // Get Item Holder
                const res = dt.body
                expect(res).to.not.have.property('data')
            })
        })
    })
})