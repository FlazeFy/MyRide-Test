import '../../../../support/template'

describe('Integration Test - Auth - Post : Sign Out', () => {
    const method = 'post'
    const url = '/api/v1/logout'

    it('TC-INT-AU-005 : User Can Sign Out With Valid Token', () => {
        const payload = {
            username : "flazen.edu",
            password: 'nopass123',
        }

        cy.templateIntegrationLoginAPI(payload.username, payload.password).then(token => {
            cy.request({
                method,
                url: url,
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).as('UserCanPostSignOutWithValidToken')
            cy.get('@UserCanPostSignOutWithValidToken').then(dt => {
                cy.templateGet(200,dt, null)
                expect(dt.body.message).contain('logout success')
            })
        })
    })

    it('TC-INT-AU-006 : User Cant Sign Out With Empty Token', () => {
        cy.request({
            method,
            url: url,
            failOnStatusCode: false,
            headers: {
                Accept: 'application/json'
            }
        }).as('UserCantPostSignOutWithEmptyToken')
        cy.get('@UserCantPostSignOutWithEmptyToken').then(dt => {
            cy.templateGet(401,dt, null)
            expect(dt.body.message).contain('you need to include the authorization token from login')
        })
    })

    it('TC-INT-AU-007 : User Cant Sign Out With Invalid Token', () => {
        cy.request({
            method,
            url: url,
            failOnStatusCode: false,
            headers: {
                Accept: 'application/json',
                Authorization: `Bearer 123123`
            }
        }).as('UserCantPostSignOutWithInvalidToken')
        cy.get('@UserCantPostSignOutWithInvalidToken').then(dt => {
            cy.templateGet(401,dt, null)
            expect(dt.body.message).contain('you need to include the authorization token from login')
        })
    })
})