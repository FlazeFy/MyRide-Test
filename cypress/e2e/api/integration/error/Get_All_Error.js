import '../../../../support/template'

describe('MyRide Integration Test - Error - Get : All Error', () => {
    const method = 'get'
    const url = '/api/v1/error'

    const validateValidResponse = (dt) => {
        cy.templateGet(200,dt, null)
        expect(dt.body.message).contain('error fetched')
        
        // Get Item Holder
        const res = dt.body
        expect(res).to.have.property('data')
        const data = res.data
        expect(data).to.be.an('object')

        // Get List Key / Column
        const stringFields = ['message','stack_trace','file','created_at']
        const stringNullableFields = ['faced_by']
        const intFields = ['id','line']
        const intBoolFields = ['is_fixed']

        // Validate Column
        cy.templateValidateColumn(data.data, stringFields, 'string', false)
        cy.templateValidateColumn(data.data, stringNullableFields, 'string', true)
        cy.templateValidateColumn(data.data, intFields, 'number', false)
        cy.templateValidateColumn(data.data, intBoolFields, 'bool_number', false)

        // Validate datetime
        const columnDateTime = [
            { column_name : 'created_at', date_type: 'datetime', nullable: true }
        ]
        cy.templateValidateDateTime(data.data, columnDateTime)
    }

    it('TC-INT-ER-001 : User Can See All Error With Valid Data', () => {
        const payload = {
            username : "testeradmin",
            password: 'nopass123',
        }

        cy.templateIntegrationLoginAPI(payload.username, payload.password).then(token => {
            cy.request({
                method: method,
                url,
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).as('UserCanSeeAllErrorWithValidData')
            cy.get('@UserCanSeeAllErrorWithValidData').then(dt => {
                validateValidResponse(dt)

                // Check if all page accessible
                const last_page = dt.body.data.last_page
                cy.templatePagination(url, last_page, token)
            })
        })
    })

    it('TC-INT-ER-002 : User Can See All Error With Custom Item Per Page', () => {
        const payload = {
            username : "testeradmin",
            password: 'nopass123',
        }
        const itemPerPage = 2

        cy.templateIntegrationLoginAPI(payload.username, payload.password).then(token => {
            cy.request({
                method: method,
                url: `${url}?per_page_key=${itemPerPage}`,
                headers: {
                    Authorization: `Bearer ${token}`
                },
            }).as('UserCanSeeAllErrorWithCustomItemPerPage')
            cy.get('@UserCanSeeAllErrorWithCustomItemPerPage').then(dt => {
                validateValidResponse(dt)

                // Check if item per page query same with data.length
                const data = dt.body.data.data
                cy.expect(data.length).to.equal(itemPerPage)
            })
        })
    })

    it('TC-INT-ER-003 : User Cant See All Error With Custom Invalid Item Per Page', () => {
        const payload = {
            username : "testeradmin",
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
            }).as('UserCantSeeAllErrorWithCustomInvalidItemPerPage')
            cy.get('@UserCantSeeAllErrorWithCustomInvalidItemPerPage').then(dt => {
                cy.templateGet(400,dt, null)
                expect(dt.body.message).contain('per_page_key is not a valid page')
                
                // Get Item Holder
                const res = dt.body
                expect(res).to.not.have.property('data')
            })
        })
    })

    it('TC-INT-ER-004 : User Cant See All Error With Empty Data', () => {
        const payload = {
            username : "testeradmin",
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
            }).as('UserCantSeeAllErrorWithEmptyData')
            cy.get('@UserCantSeeAllErrorWithEmptyData').then(dt => {
                cy.templateGet(404,dt, null)
                expect(dt.body.message).contain('error not found')
                
                // Get Item Holder
                const res = dt.body
                expect(res).to.not.have.property('data')
            })
        })
    })

    it('TC-INT-ER-005 : User Cant See All Error With Invalid Auth', () => {
        cy.request({
            method: method,
            url,
            headers: {
                Accept: `application/json`
            },
            failOnStatusCode: false,
        }).as('UserCantSeeAllErrorWithInvalidAuth')
        cy.get('@UserCantSeeAllErrorWithInvalidAuth').then(dt => {
            cy.templateGet(401,dt, null)
            expect(dt.body.message).contain('you need to include the authorization token from login')
            
            // Get Item Holder
            const res = dt.body
            expect(res).to.not.have.property('data')
        })
    })
})