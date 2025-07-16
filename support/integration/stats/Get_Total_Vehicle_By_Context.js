import '../../utils/template'

describe('MyRide Integration Test - Stats - Get : Total Vehicle By Context', () => {
    const method = 'get'
    const url = '/api/v1/stats/total/vehicle'

    it('TC-E2E-ST-005 : Success Get Total Vehicle By Context With Valid Context And Valid Data', () => {
        const payload = {
            username : "flazefy",
            password: 'nopass123',
        }
        const context = 'vehicle_merk'

        cy.templateE2ELoginAPI(payload.username, payload.password).then(token => {
            cy.request({
                method: method,
                url: `${url}/${context}`,
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).as('SuccessGetTotalVehicleByContextWithValidContextAndValidData')
            cy.get('@SuccessGetTotalVehicleByContextWithValidContextAndValidData').then(dt => {
                cy.templateGet(200,dt, null)
                expect(dt.body.message).contain('stats fetched')
                
                // Get Item Holder
                const res = dt.body
                expect(res).to.have.property('data')
                const data = res.data
                expect(data).to.be.an('array')

                // Get List Key / Column
                const stringFields = ['context']
                const intFelds = ['total']

                // Validate Column
                cy.templateValidateColumn(data, stringFields, 'string', false)
                cy.templateValidateColumn(data, intFelds, 'number', false)
            })
        })
    })

    it('TC-E2E-ST-006 : Failed Get Total Vehicle By Context With Invalid Context', () => {
        const payload = {
            username : "flazefy",
            password: 'nopass123',
        }
        const context = 'vehicle_categories'

        cy.templateE2ELoginAPI(payload.username, payload.password).then(token => {
            cy.request({
                method: method,
                url: `${url}/${context}`,
                headers: {
                    Authorization: `Bearer ${token}`
                },
                failOnStatusCode: false,
            }).as('FailedGetTotalVehicleByContextWithInvalidContext')
            cy.get('@FailedGetTotalVehicleByContextWithInvalidContext').then(dt => {
                cy.templateGet(400,dt, null)
                expect(dt.body.message).contain('Vehicle_categories is not available')
                
                // Get Item Holder
                const res = dt.body
                expect(res).to.not.have.property('data')
            })
        })
    })

    it('TC-E2E-ST-007 : Success Get Total Vehicle By Context With Valid Context And Empty Data', () => {
        const payload = {
            username : "testerempty",
            password: 'nopass123',
        }
        const context = 'vehicle_merk'

        cy.templateE2ELoginAPI(payload.username, payload.password).then(token => {
            cy.request({
                method: method,
                url: `${url}/${context}`,
                headers: {
                    Authorization: `Bearer ${token}`
                },
                failOnStatusCode: false,
            }).as('SuccessGetTotalVehicleByContextWithValidContextAndEmptyData')
            cy.get('@SuccessGetTotalVehicleByContextWithValidContextAndEmptyData').then(dt => {
                cy.templateGet(404,dt, null)
                expect(dt.body.message).contain('stats not found')
                
                // Get Item Holder
                const res = dt.body
                expect(res).to.not.have.property('data')
            })
        })
    })

    it('TC-E2E-ST-008 : Failed Get Total Vehicle By Context With Invalid Auth', () => {
        const context = 'vehicle_merk'

        cy.request({
            method: method,
            url: `${url}/${context}`,
            headers: {
                Accept: `application/json`
            },
            failOnStatusCode: false,
        }).as('FailedGetTotalVehicleByContextWithInvalidAuth')
        cy.get('@FailedGetTotalVehicleByContextWithInvalidAuth').then(dt => {
            cy.templateGet(401,dt, null)
            expect(dt.body.message).contain('you need to include the authorization token from login')
            
            // Get Item Holder
            const res = dt.body
            expect(res).to.not.have.property('data')
        })
    })
})