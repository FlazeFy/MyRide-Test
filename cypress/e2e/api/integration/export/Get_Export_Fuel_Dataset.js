import '../../../../support/template'

describe('MyRide Integration Test - Fuel - Get : Export Fuel Dataset', () => {
    const method = 'get'
    const url = '/api/v1/export/fuel'

    it('TC-INT-EX-007 : User Can Export Fuel Dataset', () => {
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
            }).as('UserCanExportFuelDataset')
            cy.get('@UserCanExportFuelDataset').then(dt => {
                cy.templateGetExportExcel(dt)
            })
        })
    })

    it('TC-INT-EX-008 : User Cant Export Fuel Dataset With Invalid Auth', () => {
        cy.request({
            method: method,
            url,
            headers: {
                Accept: `application/json`
            },
            failOnStatusCode: false,
        }).as('UserCantExportFuelDatasetWithInvalidAuth')
        cy.get('@UserCantExportFuelDatasetWithInvalidAuth').then(dt => {
            cy.templateGet(401,dt, null)
            expect(dt.body.message).contain('you need to include the authorization token from login')
            
            // Get Item Holder
            const res = dt.body
            expect(res).to.not.have.property('data')
        })
    })

    it('TC-INT-EX-009 : User Cant Export Fuel Dataset With Empty Data', () => {
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
            }).as('UserCantExportFuelDatasetWithEmptyData')
            cy.get('@UserCantExportFuelDatasetWithEmptyData').then(dt => {
                cy.templateGet(404,dt, null)
                expect(dt.body.message).contain('fuel not found')
                
                // Get Item Holder
                const res = dt.body
                expect(res).to.not.have.property('data')
            })
        })
    })
})