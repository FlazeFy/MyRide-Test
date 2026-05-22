import '../../../../support/template'

describe('Integration Test - Reminder - Get : All Reminder', () => {
    const method = 'get'
    const url = '/api/v1/reminder'

    const validateValidResponse = (dt) => {
        cy.templateGet(200,dt, null)
        expect(dt.body.message).contain('reminder fetched')
        
        // Get Item Holder
        const res = dt.body
        expect(res).to.have.property('data')
        const data = res.data
        expect(data).to.be.an('object')

        // Get List Key / Column
        const stringFields = ['id','vehicle_plate_number','reminder_title','reminder_context','reminder_body','created_at']
        const stringNullableFields = ['remind_at']

        // Validate Column
        cy.templateValidateColumn(data.data, stringFields, 'string', false)
        cy.templateValidateColumn(data.data, stringNullableFields, 'string', true)

        // Validate datetime
        const columnDateTime = [
            { column_name : 'created_at', date_type: 'datetime', nullable: false },
            { column_name : 'remind_at', date_type: 'datetime', nullable: true }
        ]
        cy.templateValidateDateTime(data.data, columnDateTime)
    }

    it('TC-INT-RM-024 : User Can See All Reminder With Valid Data', () => {
        const payload = {
            username : "flazen.edu",
            password: 'nopass123',
        }

        cy.templateIntegrationLoginAPI(payload.username, payload.password).then(token => {
            cy.request({
                method,
                url,
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).as('UserCanSeeAllReminderWithValidData')
            cy.get('@UserCanSeeAllReminderWithValidData').then(dt => {
                validateValidResponse(dt)

                // Check if all page accessible
                const last_page = dt.body.data.last_page
                cy.templatePagination(url, last_page, token)
            })
        })
    })

    it('TC-INT-RM-025 : User Can See All Reminder With Custom Item Per Page', () => {
        const payload = {
            username : "flazen.edu",
            password: 'nopass123',
        }
        const itemPerPage = 2

        cy.templateIntegrationLoginAPI(payload.username, payload.password).then(token => {
            cy.request({
                method,
                url: `${url}?per_page_key=${itemPerPage}`,
                headers: {
                    Authorization: `Bearer ${token}`
                },
            }).as('UserCanSeeAllReminderWithCustomItemPerPage')
            cy.get('@UserCanSeeAllReminderWithCustomItemPerPage').then(dt => {
                validateValidResponse(dt)

                // Check if item per page query same with data.length
                const data = dt.body.data.data
                cy.expect(data.length).to.equal(itemPerPage)
            })
        })
    })

    it('TC-INT-RM-026 : User Cant See All Reminder With Custom Invalid Item Per Page', () => {
        const payload = {
            username : "flazen.edu",
            password: 'nopass123',
        }
        const itemPerPage = 'test'

        cy.templateIntegrationLoginAPI(payload.username, payload.password).then(token => {
            cy.request({
                method,
                url: `${url}?per_page_key=${itemPerPage}`,
                headers: {
                    Authorization: `Bearer ${token}`
                },
                failOnStatusCode: false,
            }).as('UserCantSeeAllReminderWithCustomInvalidItemPerPage')
            cy.get('@UserCantSeeAllReminderWithCustomInvalidItemPerPage').then(dt => {
                cy.templateGet(400,dt, null)
                expect(dt.body.message).contain('per_page_key is not a valid page')
                
                // Get Item Holder
                const res = dt.body
                expect(res).to.not.have.property('data')
            })
        })
    })

    it('TC-INT-RM-027 : User Cant See All Reminder With Empty Data', () => {
        const payload = {
            username : "testerempty",
            password: 'nopass123',
        }

        cy.templateIntegrationLoginAPI(payload.username, payload.password).then(token => {
            cy.request({
                method,
                url,
                headers: {
                    Authorization: `Bearer ${token}`
                },
                failOnStatusCode: false,
            }).as('UserCantSeeAllReminderWithEmptyData')
            cy.get('@UserCantSeeAllReminderWithEmptyData').then(dt => {
                cy.templateGet(404,dt, null)
                expect(dt.body.message).contain('reminder not found')
                
                // Get Item Holder
                const res = dt.body
                expect(res).to.not.have.property('data')
            })
        })
    })

    it('TC-INT-RM-028 : User Cant See All Reminder With Invalid Auth', () => {
        cy.request({
            method,
            url,
            headers: {
                Accept: `application/json`
            },
            failOnStatusCode: false,
        }).as('UserCantSeeAllReminderWithInvalidAuth')
        cy.get('@UserCantSeeAllReminderWithInvalidAuth').then(dt => {
            cy.templateGet(401,dt, null)
            expect(dt.body.message).contain('you need to include the authorization token from login')
            
            // Get Item Holder
            const res = dt.body
            expect(res).to.not.have.property('data')
        })
    })

    it('TC-INT-RM-029 : User Can See All Reminder With Custom Search', () => {
        const payload = {
            username : "flazen.edu",
            password: 'nopass123',
        }
        const search = 'Drop'

        cy.templateIntegrationLoginAPI(payload.username, payload.password).then(token => {
            cy.request({
                method,
                url: `${url}?search=${search}`,
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).as('UserCanSeeAllReminderWithCustomSearch')
            cy.get('@UserCanSeeAllReminderWithCustomSearch').then(dt => {
                validateValidResponse(dt)

                // Check if all page accessible
                const last_page = dt.body.data.last_page
                cy.templatePagination(url, last_page, token)
            })
        })
    })

    it('TC-INT-RM-030 : User Cant See All Reminder With Failed Custom Search', () => {
        const payload = {
            username : "flazen.edu",
            password: 'nopass123',
        }
        const search = 'Lorem Sponge'

        cy.templateIntegrationLoginAPI(payload.username, payload.password).then(token => {
            cy.request({
                method,
                url: `${url}?search=${search}`,
                headers: {
                    Authorization: `Bearer ${token}`
                },
                failOnStatusCode: false,
            }).as('UserCantSeeAllReminderWithFailedCustomSearch')
            cy.get('@UserCantSeeAllReminderWithFailedCustomSearch').then(dt => {
                cy.templateGet(404,dt, null)
                expect(dt.body.message).contain('reminder not found')
                
                // Get Item Holder
                const res = dt.body
                expect(res).to.not.have.property('data')
            })
        })
    })
})