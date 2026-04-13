import '../../../../support/template'

describe('MyRide Integration Test - Trip - Get : Nearest Coordinate', () => {
    const method = 'get'
    const url = '/api/v1/trip/coordinate/nearest'

    const validateValidResponse = (dt) => {
        cy.templateGet(200,dt, null)
        expect(dt.body.message).contain('trip fetched')
        
        // Get Item Holder
        const res = dt.body
        expect(res).to.have.property('data')
        const data = res.data
        expect(data).to.be.an('object')

        // Get List Key / Column
        const stringFields = ['place_name','place_coordinate','last_visit']
        const intFields = ['place_distance']

        // Validate Column
        cy.templateValidateColumn(data.data, stringFields, 'string', false)
        cy.templateValidateColumn(data.data, intFields, 'number', false)

        // Validate datetime
        const columnDateTime = [
            { column_name : 'last_visit', date_type: 'datetime', nullable: false }
        ]
        cy.templateValidateDateTime(data.data, columnDateTime)
    }

    it('TC-INT-TR-023 : User Can See Nearest Coordinate With Valid Data', () => {
        const payload = {
            username : "flazefy",
            password: 'nopass123',
        }
        const coor = '-6.193307477576132,106.8290024771821'

        cy.templateIntegrationLoginAPI(payload.username, payload.password).then(token => {
            cy.request({
                method: method,
                url: `${url}/${coor}`,
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).as('UserCanSeeNearestCoordinateWithValidData')
            cy.get('@UserCanSeeNearestCoordinateWithValidData').then(dt => {
                validateValidResponse(dt)

                // Check if all page accessible
                const last_page = dt.body.data.last_page
                cy.templatePagination(`${url}/${coor}`, last_page, token)
            })
        })
    })

    it('TC-INT-TR-024 : User Can See Nearest Coordinate With Custom Item Per Page', () => {
        const payload = {
            username : "flazefy",
            password: 'nopass123',
        }
        const coor = '-6.193307477576132,106.8290024771821'
        const itemPerPage = 2

        cy.templateIntegrationLoginAPI(payload.username, payload.password).then(token => {
            cy.request({
                method: method,
                url: `${url}/${coor}?per_page_key=${itemPerPage}`,
                headers: {
                    Authorization: `Bearer ${token}`
                },
            }).as('UserCanSeeNearestCoordinateWithCustomItemPerPage')
            cy.get('@UserCanSeeNearestCoordinateWithCustomItemPerPage').then(dt => {
                validateValidResponse(dt)

                // Check if item per page query same with data.length
                const data = dt.body.data.data
                cy.expect(data.length).to.equal(itemPerPage)
            })
        })
    })

    it('TC-INT-TR-025 : User Cant See Nearest Coordinate With Custom Invalid Item Per Page', () => {
        const payload = {
            username : "flazefy",
            password: 'nopass123',
        }
        const coor = '-6.193307477576132,106.8290024771821'
        const itemPerPage = 'test'

        cy.templateIntegrationLoginAPI(payload.username, payload.password).then(token => {
            cy.request({
                method: method,
                url: `${url}/${coor}?per_page_key=${itemPerPage}`,
                headers: {
                    Authorization: `Bearer ${token}`
                },
                failOnStatusCode: false,
            }).as('UserCantSeeNearestCoordinateWithCustomInvalidItemPerPage')
            cy.get('@UserCantSeeNearestCoordinateWithCustomInvalidItemPerPage').then(dt => {
                cy.templateGet(400,dt, null)
                expect(dt.body.message).contain('per_page_key is not a valid page')
                
                // Get Item Holder
                const res = dt.body
                expect(res).to.not.have.property('data')
            })
        })
    })

    it('TC-INT-TR-026 : User Cant See Nearest Coordinate With Empty Data', () => {
        const payload = {
            username : "testerempty",
            password: 'nopass123',
        }
        const coor = '-6.193307477576132,106.8290024771821'

        cy.templateIntegrationLoginAPI(payload.username, payload.password).then(token => {
            cy.request({
                method: method,
                url: `${url}/${coor}`,
                headers: {
                    Authorization: `Bearer ${token}`
                },
                failOnStatusCode: false,
            }).as('UserCantSeeNearestCoordinateWithEmptyData')
            cy.get('@UserCantSeeNearestCoordinateWithEmptyData').then(dt => {
                cy.templateGet(404,dt, null)
                expect(dt.body.message).contain('trip not found')
                
                // Get Item Holder
                const res = dt.body
                expect(res).to.not.have.property('data')
            })
        })
    })

    it('TC-INT-TR-027 : User Cant See Nearest Coordinate With Invalid Auth', () => {
        const coor = '-6.193307477576132,106.8290024771821'

        cy.request({
            method: method,
            url: `${url}/${coor}`,
            headers: {
                Accept: `application/json`
            },
            failOnStatusCode: false,
        }).as('UserCantSeeNearestCoordinateWithInvalidAuth')
        cy.get('@UserCantSeeNearestCoordinateWithInvalidAuth').then(dt => {
            cy.templateGet(401,dt, null)
            expect(dt.body.message).contain('you need to include the authorization token from login')
            
            // Get Item Holder
            const res = dt.body
            expect(res).to.not.have.property('data')
        })
    })
})