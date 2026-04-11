import '../../../../support/template'

describe('MyRide Integration Test - Chat - Get : All Chat By Type', () => {
    const method = 'get'
    const url = '/api/v1/chat'

    const validateValidResponse = (dt) => {
        cy.templateGet(200,dt, null)
        expect(dt.body.message).contain('chat fetched')
        
        // Get Item Holder
        const res = dt.body
        expect(res).to.have.property('data')
        const data = res.data
        expect(data).to.be.an('object')

        // Get List Key / Column
        const stringFields = ['question','answer','created_at']
        const intBoolFields = ['is_success']

        // Validate Column
        cy.templateValidateColumn(data.data, stringFields, 'string', false)
        cy.templateValidateColumn(data.data, intBoolFields, 'bool_number', false)

        // Validate datetime
        const columnDateTime = [
            { column_name : 'created_at', date_type: 'datetime', nullable: false }
        ]
        cy.templateValidateDateTime(data.data, columnDateTime)
    }

    it('TC-INT-CT-001 : User Can See All Chat By Type With Valid Data', () => {
        const payload = {
            username : "flazefy",
            password: 'nopass123',
        }
        const chatType = 'ai'

        cy.templateIntegrationLoginAPI(payload.username, payload.password).then(token => {
            cy.request({
                method: method,
                url: `${url}/${chatType}`,
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).as('UserCanSeeAllChatByTypeWithValidData')
            cy.get('@UserCanSeeAllChatByTypeWithValidData').then(dt => {
                validateValidResponse(dt)

                // Check if all page accessible
                const last_page = dt.body.data.last_page
                cy.templatePagination(`${url}/${chatType}`, last_page, token)
            })
        })
    })

    it('TC-INT-CT-002 : User Can See All Chat By Type With Custom Item Per Page', () => {
        const payload = {
            username : "flazefy",
            password: 'nopass123',
        }
        const chatType = 'ai'
        const itemPerPage = 2

        cy.templateIntegrationLoginAPI(payload.username, payload.password).then(token => {
            cy.request({
                method: method,
                url: `${url}/${chatType}?per_page_key=${itemPerPage}`,
                headers: {
                    Authorization: `Bearer ${token}`
                },
            }).as('UserCanSeeAllChatByTypeWithCustomItemPerPage')
            cy.get('@UserCanSeeAllChatByTypeWithCustomItemPerPage').then(dt => {
                validateValidResponse(dt)

                // Check if item per page query same with data.length
                const data = dt.body.data.data
                cy.expect(data.length).to.equal(itemPerPage)
            })
        })
    })

    it('TC-INT-CT-003 : User Cant See All Chat By Type With Custom Invalid Item Per Page', () => {
        const payload = {
            username : "flazefy",
            password: 'nopass123',
        }
        const chatType = 'ai'
        const itemPerPage = 'test'

        cy.templateIntegrationLoginAPI(payload.username, payload.password).then(token => {
            cy.request({
                method: method,
                url: `${url}/${chatType}?per_page_key=${itemPerPage}`,
                headers: {
                    Authorization: `Bearer ${token}`
                },
                failOnStatusCode: false,
            }).as('UserCantSeeAllChatByTypeWithCustomInvalidItemPerPage')
            cy.get('@UserCantSeeAllChatByTypeWithCustomInvalidItemPerPage').then(dt => {
                cy.templateGet(400,dt, null)
                expect(dt.body.message).contain('per_page_key is not a valid page')
                
                // Get Item Holder
                const res = dt.body
                expect(res).to.not.have.property('data')
            })
        })
    })

    it('TC-INT-CT-004 : User Cant See All Chat By Type With Empty Data', () => {
        const payload = {
            username : "testerempty",
            password: 'nopass123',
        }
        const chatType = 'ai'

        cy.templateIntegrationLoginAPI(payload.username, payload.password).then(token => {
            cy.request({
                method: method,
                url: `${url}/${chatType}`,
                headers: {
                    Authorization: `Bearer ${token}`
                },
                failOnStatusCode: false,
            }).as('UserCantSeeAllChatByTypeWithEmptyData')
            cy.get('@UserCantSeeAllChatByTypeWithEmptyData').then(dt => {
                cy.templateGet(404,dt, null)
                expect(dt.body.message).contain('chat not found')
                
                // Get Item Holder
                const res = dt.body
                expect(res).to.not.have.property('data')
            })
        })
    })

    it('TC-INT-CT-005 : User Cant See All Chat With Invalid Auth', () => {
        const chatType = 'ai'

        cy.request({
            method: method,
            url: `${url}/${chatType}`,
            headers: {
                Accept: `application/json`
            },
            failOnStatusCode: false,
        }).as('UserCantSeeAllChatWithInvalidAuth')
        cy.get('@UserCantSeeAllChatWithInvalidAuth').then(dt => {
            cy.templateGet(401,dt, null)
            expect(dt.body.message).contain('you need to include the authorization token from login')
            
            // Get Item Holder
            const res = dt.body
            expect(res).to.not.have.property('data')
        })
    })

    it('TC-INT-CT-006 : User Cant See All Chat By Type With Invalid Type', () => {
        const payload = {
            username : "flazefy",
            password: 'nopass123',
        }
        const chatType = 'telegram'

        cy.templateIntegrationLoginAPI(payload.username, payload.password).then(token => {
            cy.request({
                method: method,
                url: `${url}/${chatType}`,
                headers: {
                    Authorization: `Bearer ${token}`
                },
                failOnStatusCode: false,
            }).as('UserCantSeeAllChatByTypeWithInvalidType')
            cy.get('@UserCantSeeAllChatByTypeWithInvalidType').then(dt => {
                cy.templateGet(400,dt, null)
                expect(dt.body.message).contain(`Chat type : ${chatType} is not available`)
                
                // Get Item Holder
                const res = dt.body
                expect(res).to.not.have.property('data')
            })
        })
    })
})