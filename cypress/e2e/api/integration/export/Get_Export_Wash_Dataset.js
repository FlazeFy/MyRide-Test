import '../../../../support/template'

describe('MyRide Integration Test - Wash - Get : Export Wash Dataset', () => {
    const method = 'get'
    const url = '/api/v1/export/wash'

    it('TC-INT-EX-001 : User Can Export Wash Dataset', () => {
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
            }).as('UserCanExportWashDataset')
            cy.get('@UserCanExportWashDataset').then(dt => {
                cy.templateGetExportExcel(dt)
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
})