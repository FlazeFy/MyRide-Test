import '../../../../support/template'

describe('MyRide Integration Test - Inventory - Get : Export Inventory Dataset', () => {
    const method = 'get'
    const url = '/api/v1/export/inventory'

    it('TC-INT-EX-013 : User Can Export Inventory Dataset', () => {
        const payload = {
            username : "flazefy",
            password: 'nopass123',
        }
        const expectedHeader = [
            'vehicle_name','vehicle_type','vehicle_plate_number','inventory_name','inventory_category','inventory_qty','inventory_storage','created_at','updated_at'
        ]
        
        cy.templateIntegrationLoginAPI(payload.username, payload.password).then(token => {
            cy.templateExportExcel({
                url, token, fileNameStartWith: `Inventory-${payload.username}`, expectedHeader
            })
        })
    })

    it('TC-INT-EX-014 : User Cant Export Inventory Dataset With Invalid Auth', () => {
        cy.request({
            method: method,
            url,
            headers: {
                Accept: `application/json`
            },
            failOnStatusCode: false,
        }).as('UserCantExportInventoryDatasetWithInvalidAuth')
        cy.get('@UserCantExportInventoryDatasetWithInvalidAuth').then(dt => {
            cy.templateGet(401,dt, null)
            expect(dt.body.message).contain('you need to include the authorization token from login')
            
            // Get Item Holder
            const res = dt.body
            expect(res).to.not.have.property('data')
        })
    })

    it('TC-INT-EX-015 : User Cant Export Inventory Dataset With Empty Data', () => {
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
            }).as('UserCantExportInventoryDatasetWithEmptyData')
            cy.get('@UserCantExportInventoryDatasetWithEmptyData').then(dt => {
                cy.templateGet(404,dt, null)
                expect(dt.body.message).contain('inventory not found')
                
                // Get Item Holder
                const res = dt.body
                expect(res).to.not.have.property('data')
            })
        })
    })
})