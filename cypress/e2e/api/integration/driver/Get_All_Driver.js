import '../../../../support/template'

describe('MyRide Integration Test - Driver - Get : All Driver', () => {
    const method = 'get'
    const url = '/api/v1/driver'

    const validateValidResponse = (dt) => {
        cy.templateGet(200,dt, null)
        expect(dt.body.message).contain('driver fetched')
        
        // Get Item Holder
        const res = dt.body
        expect(res).to.have.property('data')
        const data = res.data
        expect(data).to.be.an('object')

        // Get List Key / Column
        const stringFields = ['id','username','fullname','email','phone','created_at']
        const stringNullableFields = ['telegram_user_id','notes','updated_at']
        const intFields = ['total_trip']
        const intBoolFields = ['telegram_is_valid']

        // Validate Column
        cy.templateValidateColumn(data.data, stringFields, 'string', false)
        cy.templateValidateColumn(data.data, stringNullableFields, 'string', true)
        cy.templateValidateColumn(data.data, intFields, 'number', false)
        cy.templateValidateColumn(data.data, intBoolFields, 'bool_number', false)

        // Validate datetime
        const columnDateTime = [
            { column_name : 'created_at', date_type: 'datetime', nullable: false },
            { column_name : 'updated_at', date_type: 'datetime', nullable: true }
        ]
        cy.templateValidateDateTime(data.data, columnDateTime)
    }

    it('TC-INT-DR-004 : User Can See All Driver With Valid Data', () => {
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
            }).as('UserCanSeeAllDriverWithValidData')
            cy.get('@UserCanSeeAllDriverWithValidData').then(dt => {
                validateValidResponse(dt)

                // Check if all page accessible
                const last_page = dt.body.data.last_page
                cy.templatePagination(url, last_page, token)
            })
        })
    })

    it('TC-INT-DR-005 : User Can See All Driver With Custom Item Per Page', () => {
        const payload = {
            username : "flazefy",
            password: 'nopass123',
        }
        const itemPerPage = 1

        cy.templateIntegrationLoginAPI(payload.username, payload.password).then(token => {
            cy.request({
                method: method,
                url: `${url}?per_page_key=${itemPerPage}`,
                headers: {
                    Authorization: `Bearer ${token}`
                },
            }).as('UserCanSeeAllDriverWithCustomItemPerPage')
            cy.get('@UserCanSeeAllDriverWithCustomItemPerPage').then(dt => {
                validateValidResponse(dt)

                // Check if item per page query same with data.length
                const data = dt.body.data.data
                cy.expect(data.length).to.equal(itemPerPage)
            })
        })
    })

    it('TC-INT-DR-006 : User Cant See All Driver With Custom Invalid Item Per Page', () => {
        const payload = {
            username : "flazefy",
            password: 'nopass123',
        }
        const itemPerPage = 'test'

        cy.templateIntegrationLoginAPI(payload.username, payload.password).then(token => {
            cy.request({
                method: method,
                url: `${url}?per_page_key=${itemPerPage}`,
                headers: {
                    Authorization: `Bearer ${token}`
                },
                failOnStatusCode: false,
            }).as('UserCantSeeAllDriverWithCustomInvalidItemPerPage')
            cy.get('@UserCantSeeAllDriverWithCustomInvalidItemPerPage').then(dt => {
                cy.templateGet(400,dt, null)
                expect(dt.body.message).contain('per_page_key is not a valid page')
                
                // Get Item Holder
                const res = dt.body
                expect(res).to.not.have.property('data')
            })
        })
    })

    it('TC-INT-DR-007 : User Cant See All Driver With Empty Data', () => {
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
            }).as('UserCantSeeAllDriverWithEmptyData')
            cy.get('@UserCantSeeAllDriverWithEmptyData').then(dt => {
                cy.templateGet(404,dt, null)
                expect(dt.body.message).contain('driver not found')
                
                // Get Item Holder
                const res = dt.body
                expect(res).to.not.have.property('data')
            })
        })
    })

    it('TC-INT-DR-008 : User Cant See All Driver With Invalid Auth', () => {
        cy.request({
            method: method,
            url,
            headers: {
                Accept: `application/json`
            },
            failOnStatusCode: false,
        }).as('UserCantSeeAllDriverWithInvalidAuth')
        cy.get('@UserCantSeeAllDriverWithInvalidAuth').then(dt => {
            cy.templateGet(401,dt, null)
            expect(dt.body.message).contain('you need to include the authorization token from login')
            
            // Get Item Holder
            const res = dt.body
            expect(res).to.not.have.property('data')
        })
    })
})