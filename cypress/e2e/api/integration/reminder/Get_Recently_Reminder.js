import '../../../../support/template'

describe('MyRide Integration Test - Reminder - Get : Recently Reminder', () => {
    const method = 'get'
    const url = '/api/v1/reminder/recently'

    const validateValidResponse = (dt) => {
        cy.templateGet(200,dt, null)
        expect(dt.body.message).contain('reminder fetched')
        
        // Get Item Holder
        const res = dt.body
        expect(res).to.have.property('data')
        const data = res.data
        expect(data).to.be.an('object')

        // Get List Key / Column
        const stringFields = ['id','vehicle_plate_number','reminder_title','reminder_context','reminder_body','remind_at']

        // Validate Column
        cy.templateValidateColumn(data.data, stringFields, 'string', false)

        // Validate datetime
        const columnDateTime = [
            { column_name : 'remind_at', date_type: 'datetime', nullable: false }
        ]
        cy.templateValidateDateTime(data.data, columnDateTime)
    }

    it('TC-INT-RM-004 : User Can See Recently Reminder With Valid Data', () => {
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
            }).as('UserCanSeeRecentlyReminderWithValidData')
            cy.get('@UserCanSeeRecentlyReminderWithValidData').then(dt => {
                validateValidResponse(dt)

                // Check if all page accessible
                const last_page = dt.body.data.last_page
                cy.templatePagination(url, last_page, token)
            })
        })
    })

    it('TC-INT-RM-005 : User Can See Recently Reminder With Custom Item Per Page', () => {
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
            }).as('UserCanSeeRecentlyReminderWithCustomItemPerPage')
            cy.get('@UserCanSeeRecentlyReminderWithCustomItemPerPage').then(dt => {
                validateValidResponse(dt)

                // Check if item per page query same with data.length
                const data = dt.body.data.data
                cy.expect(data.length).to.equal(itemPerPage)
            })
        })
    })

    it('TC-INT-RM-006 : User Cant See Recently Reminder With Custom Invalid Item Per Page', () => {
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
            }).as('UserCantSeeRecentlyReminderWithCustomInvalidItemPerPage')
            cy.get('@UserCantSeeRecentlyReminderWithCustomInvalidItemPerPage').then(dt => {
                cy.templateGet(400,dt, null)
                expect(dt.body.message).contain('per_page_key is not a valid page')
                
                // Get Item Holder
                const res = dt.body
                expect(res).to.not.have.property('data')
            })
        })
    })

    it('TC-INT-RM-007 : User Cant See Recently Reminder With Empty Data', () => {
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
            }).as('UserCantSeeRecentlyReminderWithEmptyData')
            cy.get('@UserCantSeeRecentlyReminderWithEmptyData').then(dt => {
                cy.templateGet(404,dt, null)
                expect(dt.body.message).contain('reminder not found')
                
                // Get Item Holder
                const res = dt.body
                expect(res).to.not.have.property('data')
            })
        })
    })

    it('TC-INT-RM-008 : User Cant See Recently Reminder With Invalid Auth', () => {
        cy.request({
            method: method,
            url,
            headers: {
                Accept: `application/json`
            },
            failOnStatusCode: false,
        }).as('UserCantSeeRecentlyReminderWithInvalidAuth')
        cy.get('@UserCantSeeRecentlyReminderWithInvalidAuth').then(dt => {
            cy.templateGet(401,dt, null)
            expect(dt.body.message).contain('you need to include the authorization token from login')
            
            // Get Item Holder
            const res = dt.body
            expect(res).to.not.have.property('data')
        })
    })
})