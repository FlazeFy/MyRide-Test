import '../../../../support/template'

describe('MyRide Integration Test - Service - Get : Export Service Dataset', () => {
    const method = 'get'
    const url = '/api/v1/export/service'

    it('TC-INT-EX-010 : User Can Export Service Dataset', () => {
        const payload = {
            username : "flazefy",
            password: 'nopass123',
        }
        const expectedHeader = [
            'vehicle_name','vehicle_type','vehicle_plate_number','service_category','service_price_total','service_location','service_note','created_at','updated_at','remind_at'
        ]
        
        cy.templateIntegrationLoginAPI(payload.username, payload.password).then(token => {
            cy.templateExportExcel({
                url, token, fileNameStartWith: `Service-${payload.username}`, expectedHeader
            })
        })
    })

    it('TC-INT-EX-011 : User Cant Export Service Dataset With Invalid Auth', () => {
        cy.request({
            method: method,
            url,
            headers: {
                Accept: `application/json`
            },
            failOnStatusCode: false,
        }).as('UserCantExportServiceDatasetWithInvalidAuth')
        cy.get('@UserCantExportServiceDatasetWithInvalidAuth').then(dt => {
            cy.templateGet(401,dt, null)
            expect(dt.body.message).contain('you need to include the authorization token from login')
            
            // Get Item Holder
            const res = dt.body
            expect(res).to.not.have.property('data')
        })
    })

    it('TC-INT-EX-012 : User Cant Export Service Dataset With Empty Data', () => {
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
            }).as('UserCantExportServiceDatasetWithEmptyData')
            cy.get('@UserCantExportServiceDatasetWithEmptyData').then(dt => {
                cy.templateGet(404,dt, null)
                expect(dt.body.message).contain('service not found')
                
                // Get Item Holder
                const res = dt.body
                expect(res).to.not.have.property('data')
            })
        })
    })
})