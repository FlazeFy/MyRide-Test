import '../../../../support/template'

describe('MyRide Integration Test - Driver - Get : Export Driver Dataset', () => {
    const method = 'get'
    const url = '/api/v1/export/driver'

    it('TC-INT-EX-016 : User Can Export Driver Dataset', () => {
        const payload = {
            username : "flazefy",
            password: 'nopass123',
        }
        const expectedHeader = [
            'username','fullname','email','telegram_user_id','telegram_is_valid','phone','notes','created_at','updated_at'
        ]
        
        cy.templateIntegrationLoginAPI(payload.username, payload.password).then(token => {
            cy.templateExportExcel({
                url, token, fileNameStartWith: `Driver-${payload.username}`, expectedHeader
            })
        })
    })

    it('TC-INT-EX-017 : User Cant Export Driver Dataset With Invalid Auth', () => {
        cy.request({
            method: method,
            url,
            headers: {
                Accept: `application/json`
            },
            failOnStatusCode: false,
        }).as('UserCantExportDriverDatasetWithInvalidAuth')
        cy.get('@UserCantExportDriverDatasetWithInvalidAuth').then(dt => {
            cy.templateGet(401,dt, null)
            expect(dt.body.message).contain('you need to include the authorization token from login')
            
            // Get Item Holder
            const res = dt.body
            expect(res).to.not.have.property('data')
        })
    })

    it('TC-INT-EX-018 : User Cant Export Driver Dataset With Empty Data', () => {
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
            }).as('UserCantExportDriverDatasetWithEmptyData')
            cy.get('@UserCantExportDriverDatasetWithEmptyData').then(dt => {
                cy.templateGet(404,dt, null)
                expect(dt.body.message).contain('driver not found')
                
                // Get Item Holder
                const res = dt.body
                expect(res).to.not.have.property('data')
            })
        })
    })
})