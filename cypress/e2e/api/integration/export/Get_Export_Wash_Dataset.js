import '../../../../support/template'

describe('MyRide Integration Test - Wash - Get : Export Wash Dataset', () => {
    const method = 'get'
    const url = '/api/v1/export/wash'

    it('TC-INT-EX-001 : User Can Export Wash Dataset', () => {
        const payload = {
            username: 'flazefy',
            password: 'nopass123',
        }
        const expectedHeader = [
            'vehicle_name', 'wash_desc', 'wash_by', 'is_wash_body', 'is_wash_window', 'is_wash_dashboard', 'is_wash_tires', 'is_wash_trash', 'is_wash_engine', 'is_wash_seat', 'is_wash_carpet', 'is_wash_pillows', 'wash_address', 'wash_start_time', 'wash_end_time', 'is_fill_window_washing_water', 'is_wash_hollow', 'datetime'
        ]

        cy.templateIntegrationLoginAPI(payload.username, payload.password).then(token => {
            cy.templateExportExcel({
                url, token, fileNameStartWith: `Wash-${payload.username}`, expectedHeader
            })
        })
    })

    it('TC-INT-EX-002 : User Cant Export Wash Dataset With Invalid Auth', () => {
        cy.request({
            method: method,
            url,
            headers: {
                Accept: `application/json`
            },
            failOnStatusCode: false,
        }).as('UserCantExportWashDatasetWithInvalidAuth')
        cy.get('@UserCantExportWashDatasetWithInvalidAuth').then(dt => {
            cy.templateGet(401,dt, null)
            expect(dt.body.message).contain('you need to include the authorization token from login')
            
            // Get Item Holder
            const res = dt.body
            expect(res).to.not.have.property('data')
        })
    })

    it('TC-INT-EX-003 : User Cant Export Wash Dataset With Empty Data', () => {
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
            }).as('UserCantExportWashDatasetWithEmptyData')
            cy.get('@UserCantExportWashDatasetWithEmptyData').then(dt => {
                cy.templateGet(404,dt, null)
                expect(dt.body.message).contain('wash not found')
                
                // Get Item Holder
                const res = dt.body
                expect(res).to.not.have.property('data')
            })
        })
    })
})