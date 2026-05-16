import '../../../../support/template'

describe('Integration Test - Wash - Put : Finish Wash By Id', () => {
    const method = 'put'
    const url = '/api/v1/wash/finish'

    it('TC-INT-WS-029 : User Cant Finish Wash Who Already Finished', () => {
        const id = '0660078a-15ed-710e-32a8-c78cf5ec13f0'
        const payloadAuth = {
            username : "flazefy",
            password: 'nopass123'
        }

        cy.templateIntegrationLoginAPI(payloadAuth.username, payloadAuth.password).then(token => {
            cy.request({
                method,
                url: `${url}/${id}`,
                headers: {
                    Authorization: `Bearer ${token}`
                },
                failOnStatusCode: false,
            }).as('UserCantFinishWashWhoAlreadyFinished')
            cy.get('@UserCantFinishWashWhoAlreadyFinished').then(dt => {
                cy.templateDelete(dt, 422, "Wash already finished")
            })
        })
    })

    it('TC-INT-WS-030 : User Cant Finish Wash Using Invalid Wash ID (Not Found)', () => {
        const id = '7d53371a-e363-2ad3-25fe-180dae88c069'
        const payloadAuth = {
            username : "flazefy",
            password: 'nopass123'
        }

        cy.templateIntegrationLoginAPI(payloadAuth.username, payloadAuth.password).then(token => {
            cy.request({
                method,
                url: `${url}/${id}`,
                headers: {
                    Authorization: `Bearer ${token}`
                },
                failOnStatusCode: false,
            }).as('UserCantFinishWashUsingInvalidWashID(NotFound)')
            cy.get('@UserCantFinishWashUsingInvalidWashID(NotFound)').then(dt => {
                console.log(dt)
                cy.templateDelete(dt, 404, "wash not found")
            })
        })
    })

    it('TC-INT-WS-031 : User Cant Finish Wash Using Invalid ID (UUID)', () => {
        const id = '1'
        const payloadAuth = {
            username : "flazefy",
            password: 'nopass123'
        }

        cy.templateIntegrationLoginAPI(payloadAuth.username, payloadAuth.password).then(token => {
            cy.request({
                method,
                url: `${url}/${id}`,
                headers: {
                    Authorization: `Bearer ${token}`
                },
                failOnStatusCode: false,
            }).as('UserCantFinishWashUsingInvalidID(UUID)')
            cy.get('@UserCantFinishWashUsingInvalidID(UUID)').then(dt => {
                cy.templateDelete(dt, 400, {
                    "id": ["The id field must be 36 characters."]
                })
            })
        })
    })

    it('TC-INT-WS-032 : User Cant Finish Wash Using Invalid Auth', () => {
        const id = '6e0187c5-ddd0-15d1-0add-5c57a649a792'

        cy.request({
            method,
            url: `${url}/${id}`,
            failOnStatusCode: false,
        }).as('UserCantFinishWashUsingInvalidAuth')
        cy.get('@UserCantFinishWashUsingInvalidAuth').then(dt => {
            cy.templateDelete(dt, 401, 'you need to include the authorization token from login')
        })
    })

    it('TC-INT-WS-033 : User Can Finish Wash Who Still Unfinished', () => {
        const id = '6e0187c5-ddd0-15d1-0add-5c57a649a792'
        const payloadAuth = {
            username : "flazefy",
            password: 'nopass123',
        }

        cy.templateIntegrationLoginAPI(payloadAuth.username, payloadAuth.password).then(token => {
            cy.request({
                method,
                url: `${url}/${id}`,
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).as('UserCanFinishWashWhoStillUnfinished')
            cy.get('@UserCanFinishWashWhoStillUnfinished').then(dt => {
                cy.templateDelete(dt, 200, 'wash updated')
            })
        })
    })
})