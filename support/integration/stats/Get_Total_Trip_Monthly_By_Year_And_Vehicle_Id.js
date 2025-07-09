import '../../utils/template'

describe('MyRide Integration Test - Stats - Get : Total Trip By Context', () => {
    const method = 'get'
    const url = '/api/v1/stats/total/trip/monthly'

    it('TC-E2E-ST-009 : Success Get Total Trip Monthly By Year And Vehicle Id With Valid Year & Vehicle And Valid Data', () => {
        const payload = {
            username : "flazefy",
            password: 'nopass123',
        }
        const vehicle_id = '2d98f524-de02-11ed-b5ea-0242ac120002'
        const year = 2024

        cy.templateE2ELoginAPI(payload.username, payload.password).then(token => {
            cy.request({
                method: method,
                url: `${url}/${year}/${vehicle_id}`,
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).as('SuccessGetTotalTripMonthlyByYearAndVehicleIdWithValidYear&VehicleAndValidData')
            cy.get('@SuccessGetTotalTripMonthlyByYearAndVehicleIdWithValidYear&VehicleAndValidData').then(dt => {
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

    it('TC-E2E-ST-010 : Failed Get Total Trip Monthly By Year And Vehicle Id With Invalid Vehicle Id', () => {
        const payload = {
            username : "flazefy",
            password: 'nopass123',
        }
        const vehicle_id = '2d98f524-de02-11ed-b5ea'
        const year = 2024

        cy.templateE2ELoginAPI(payload.username, payload.password).then(token => {
            cy.request({
                method: method,
                url: `${url}/${year}/${vehicle_id}`,
                headers: {
                    Authorization: `Bearer ${token}`
                },
                failOnStatusCode: false,
            }).as('FailedGetTotalTripMonthlyByYearAndVehicleIdWithInvalidVehicleId')
            cy.get('@FailedGetTotalTripMonthlyByYearAndVehicleIdWithInvalidVehicleId').then(dt => {
                cy.templateGet(404,dt, null)
                expect(dt.body.message).contain('stats not found')
                
                // Get Item Holder
                const res = dt.body
                expect(res).to.not.have.property('data')
            })
        })
    })

    it('TC-E2E-ST-011 : Success Get Total Trip By Context With Valid Context And Empty Data', () => {
        const payload = {
            username : "flazefy",
            password: 'nopass123',
        }
        const vehicle_id = '2d98f524-de02-11ed-b5ea-0242ac120002'
        const year = 2020

        cy.templateE2ELoginAPI(payload.username, payload.password).then(token => {
            cy.request({
                method: method,
                url: `${url}/${year}/${vehicle_id}`,
                headers: {
                    Authorization: `Bearer ${token}`
                },
                failOnStatusCode: false,
            }).as('SuccessGetTripMonthlyByYearAndVehicleIdWithEmptyData')
            cy.get('@SuccessGetTripMonthlyByYearAndVehicleIdWithEmptyData').then(dt => {
                cy.templateGet(404,dt, null)
                expect(dt.body.message).contain('stats not found')
                
                // Get Item Holder
                const res = dt.body
                expect(res).to.not.have.property('data')
            })
        })
    })

    it('TC-E2E-ST-012 : Failed Get Total Trip By Context With Invalid Auth', () => {
        const vehicle_id = '2d98f524-de02-11ed-b5ea-0242ac120002'
        const year = 2024

        cy.request({
            method: method,
            url: `${url}/${year}/${vehicle_id}`,
            headers: {
                Accept: `application/json`
            },
            failOnStatusCode: false,
        }).as('FailedGetTripMonthlyByYearAndVehicleIdWithInvalidAuth')
        cy.get('@FailedGetTripMonthlyByYearAndVehicleIdWithInvalidAuth').then(dt => {
            cy.templateGet(401,dt, null)
            expect(dt.body.message).contain('you need to include the authorization token from login')
            
            // Get Item Holder
            const res = dt.body
            expect(res).to.not.have.property('data')
        })
    })
})