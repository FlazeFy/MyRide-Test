import '../../utils/template'

describe('MyRide Integration Test - Auth - Post : Sign Out', () => {
    const method = 'post'
    const url = '/api/v1/logout'

    it('TC-E2E-AU-005 : Success Post Sign Out With Valid Token', () => {
        const payload = {
            username : "flazefy",
            password: 'nopass123',
        }

        cy.templateE2ELoginAPI(payload.username, payload.password).then(token => {
            cy.request({
                method: method,
                url: url,
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).as('SuccessPostSignOutWithValidToken')
            cy.get('@SuccessPostSignOutWithValidToken').then(dt => {
                cy.templateGet(200,dt, null)
                expect(dt.body.message).contain('logout success')
            })
        })
    })

    it('TC-E2E-AU-006 : Failed Post Sign Out With Empty Token', () => {
        cy.request({
            method: method,
            url: url,
            failOnStatusCode: false,
            headers: {
                Accept: 'application/json'
            }
        }).as('FailedPostSignOutWithEmptyToken')
        cy.get('@FailedPostSignOutWithEmptyToken').then(dt => {
            cy.templateGet(401,dt, null)
            expect(dt.body.message).contain('you need to include the authorization token from login')
        })
    })

    it('TC-E2E-AU-007 : Failed Post Sign Out With Invalid Token', () => {
        cy.request({
            method: method,
            url: url,
            failOnStatusCode: false,
            headers: {
                Accept: 'application/json',
                Authorization: `Bearer 123123`
            }
        }).as('FailedPostSignOutWithInvalidToken')
        cy.get('@FailedPostSignOutWithInvalidToken').then(dt => {
            cy.templateGet(401,dt, null)
            expect(dt.body.message).contain('you need to include the authorization token from login')
        })
    })
})