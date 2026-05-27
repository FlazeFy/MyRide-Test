import '../../../../support/template'

describe('Integration Test - Stats - Get : Total Vehicle By Context', () => {
    const method = 'get'
    const url = '/api/v1/stats/total/vehicle'

    it('TC-INT-ST-014 : User Can See Total Vehicle By Context With Valid Context And Valid Data', () => {
        const payload = {
            username : "flazen.edu",
            password: 'nopass123',
        }
        const context = 'vehicle_merk'

        cy.templateIntegrationLoginAPI(payload.username, payload.password).then(token => {
            cy.request({
                method,
                url: `${url}/${context}`,
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).as('UserCanSeeTotalVehicleByContextWithValidContextAndValidData')
            cy.get('@UserCanSeeTotalVehicleByContextWithValidContextAndValidData').then(dt => {
                cy.templateGet(200,dt, null)
                expect(dt.body.message).contain('stats fetched')
                
                // Get Item Holder
                const res = dt.body
                expect(res).to.have.property('data')
                const data = res.data
                expect(data).to.be.an('array')

                // Get List Key / Column
                const stringFields = ['context']
                const intFields = ['total']

                // Validate Column
                cy.templateValidateColumn(data, stringFields, 'string', false)
                cy.templateValidateColumn(data, intFields, 'number', false)
            })
        })
    })

    it('TC-INT-ST-015 : User Cant See Total Vehicle By Context With Invalid Context', () => {
        const payload = {
            username : "flazen.edu",
            password: 'nopass123',
        }
        const context = 'vehicle_categories'

        cy.templateIntegrationLoginAPI(payload.username, payload.password).then(token => {
            cy.request({
                method,
                url: `${url}/${context}`,
                headers: {
                    Authorization: `Bearer ${token}`
                },
                failOnStatusCode: false,
            }).as('UserCantSeeTotalVehicleByContextWithInvalidContext')
            cy.get('@UserCantSeeTotalVehicleByContextWithInvalidContext').then(dt => {
                cy.templateGet(400,dt, null)
                expect(dt.body.message).contain('Vehicle_categories is not available')
                
                // Get Item Holder
                const res = dt.body
                expect(res).to.not.have.property('data')
            })
        })
    })

    it('TC-INT-ST-016 : User Cant See Total Vehicle By Context With Valid Context And Empty Data', () => {
        const payload = {
            username : "testerempty",
            password: 'nopass123',
        }
        const context = 'vehicle_merk'

        cy.templateIntegrationLoginAPI(payload.username, payload.password).then(token => {
            cy.request({
                method,
                url: `${url}/${context}`,
                headers: {
                    Authorization: `Bearer ${token}`
                },
                failOnStatusCode: false,
            }).as('UserCantSeeTotalVehicleByContextWithValidContextAndEmptyData')
            cy.get('@UserCantSeeTotalVehicleByContextWithValidContextAndEmptyData').then(dt => {
                cy.templateGet(404,dt, null)
                expect(dt.body.message).contain('stats not found')
                
                // Get Item Holder
                const res = dt.body
                expect(res).to.not.have.property('data')
            })
        })
    })

    it('TC-INT-ST-017 : User Cant See Total Vehicle By Context With Invalid Auth', () => {
        const context = 'vehicle_merk'

        cy.request({
            method,
            url: `${url}/${context}`,
            headers: {
                Accept: `application/json`
            },
            failOnStatusCode: false,
        }).as('UserCantSeeTotalVehicleByContextWithInvalidAuth')
        cy.get('@UserCantSeeTotalVehicleByContextWithInvalidAuth').then(dt => {
            cy.templateGet(401,dt, null)
            expect(dt.body.message).contain('you need to include the authorization token from login')
            
            // Get Item Holder
            const res = dt.body
            expect(res).to.not.have.property('data')
        })
    })
})