import '../../../../support/template'

describe('MyRide Integration Test - Driver - Post : Create Driver', () => {
    const method = 'post'
    const url = '/api/v1/driver'

    it('TC-INT-DR-023 : User Cant Create Driver Using Invalid Telegram User Id', () => {
        const payloadAuth = {
            username : "flazefy",
            password: 'nopass123'
        }
        const payload = {
            username: 'tester_driver',
            email: 'flazen.driver@gmail.com',
            fullname: 'Tester Driver',
            phone: '08123456789',
            notes: 'lorem ipsum',
            password: 'nopass123',
            password_confirmation: 'nopass123',
            telegram_user_id: '1234567890123'
        }

        cy.templateIntegrationLoginAPI(payloadAuth.username, payloadAuth.password).then(token => {
            cy.request({
                method: method,
                url,
                headers: {
                    Authorization: `Bearer ${token}`
                },
                body: payload,
                failOnStatusCode: false,
            }).as('UserCantCreateDriverUsingInvalidTelegramUserId')
            cy.get('@UserCantCreateDriverUsingInvalidTelegramUserId').then(dt => {
                console.log(dt)
                cy.templateDelete(dt, 400, {
                    "telegram_user_id": ["The telegram user id field must not be greater than 10 characters."]
                })
            })
        })
    })

    it('TC-INT-DR-024 : User Cant Create Driver Using Empty Email', () => {
        const payloadAuth = {
            username : "flazefy",
            password: 'nopass123',
        }
        const payload = {
            username: 'tester_driver',
            fullname: 'Tester Driver',
            phone: '08123456789',
            notes: 'lorem ipsum',
            password: 'nopass123',
            password_confirmation: 'nopass123',
            telegram_user_id: '123456789'
        }

        cy.templateIntegrationLoginAPI(payloadAuth.username, payloadAuth.password).then(token => {
            cy.request({
                method: method,
                url,
                headers: {
                    Authorization: `Bearer ${token}`
                },
                body: payload,
                failOnStatusCode: false,
            }).as('UserCantCreateDriverUsingEmptyEmail')
            cy.get('@UserCantCreateDriverUsingEmptyEmail').then(dt => {
                cy.templateDelete(dt, 400, {
                    "email": ["The email field is required."]
                })
            })
        })
    })

    it('TC-INT-DR-025 : User Cant Create Driver Using Mismatch Password Confirmation', () => {
        const payloadAuth = {
            username : "flazefy",
            password: 'nopass123'
        }
        const payload = {
            username: 'tester_driver',
            email: 'flazen.driver@gmail.com',
            fullname: 'Tester Driver',
            phone: '08123456789',
            notes: 'lorem ipsum',
            password: 'nopass123',
            password_confirmation: 'nopass321',
            telegram_user_id: '1234567890'
        }

        cy.templateIntegrationLoginAPI(payloadAuth.username, payloadAuth.password).then(token => {
            cy.request({
                method: method,
                url,
                headers: {
                    Authorization: `Bearer ${token}`
                },
                body: payload,
                failOnStatusCode: false,
            }).as('UserCantCreateDriverUsingMismatchPasswordConfirmation')
            cy.get('@UserCantCreateDriverUsingMismatchPasswordConfirmation').then(dt => {
                cy.templateDelete(dt, 400, 'Password confirmation does not match.')
            })
        })
    })


    it('TC-INT-DR-026 : User Cant Create Driver Using Invalid Auth', () => {
        const payload = {
            username: 'tester_driver',
            email: 'flazen.driver@gmail.com',
            fullname: 'Tester Driver',
            phone: '08123456789',
            notes: 'lorem ipsum',
            password: 'nopass123',
            password_confirmation: 'nopass123',
            telegram_user_id: '1234567890'
        }

        cy.request({
            method: method,
            url,
            body: payload,
            failOnStatusCode: false,
        }).as('UserCantCreateDriverUsingInvalidAuth')
        cy.get('@UserCantCreateDriverUsingInvalidAuth').then(dt => {
            cy.templateDelete(dt, 401, 'you need to include the authorization token from login')
        })
    })

    it('TC-INT-DR-027 : User Can Create Driver Using Valid Data', () => {
        const payloadAuth = {
            username : "flazefy",
            password: 'nopass123',
        }
        const payload = {
            username: 'tester_driver',
            email: 'flazen.driver@gmail.com',
            fullname: 'Tester Driver',
            phone: '08123456789',
            notes: 'lorem ipsum',
            password: 'nopass123',
            password_confirmation: 'nopass123',
            telegram_user_id: '1234567890'
        }

        cy.templateIntegrationLoginAPI(payloadAuth.username, payloadAuth.password).then(token => {
            cy.request({
                method: method,
                url,
                headers: {
                    Authorization: `Bearer ${token}`
                },
                body: payload,
            }).as('UserCanCreateDriverUsingValidData')
            cy.get('@UserCanCreateDriverUsingValidData').then(dt => {
                cy.templateDelete(dt, 201, 'driver created')
            })
        })
    })

    it('TC-INT-DR-028 : User Cant Create Driver Using Duplicated Email', () => {
        const payloadAuth = {
            username : "flazefy",
            password: 'nopass123',
        }
        const payload = {
            username: 'tester_driver_02',
            email: 'flazen.driver@gmail.com',
            fullname: 'Tester Driver 02',
            phone: '08123456789',
            notes: 'lorem ipsum',
            password: 'nopass123',
            password_confirmation: 'nopass123',
            telegram_user_id: '1234567890'
        }

        cy.templateIntegrationLoginAPI(payloadAuth.username, payloadAuth.password).then(token => {
            cy.request({
                method: method,
                url,
                headers: {
                    Authorization: `Bearer ${token}`
                },
                body: payload,
                failOnStatusCode: false,
            }).as('UserCantCreateDriverUsingDuplicatedEmail')
            cy.get('@UserCantCreateDriverUsingDuplicatedEmail').then(dt => {
                cy.templateDelete(dt, 409, 'driver has been used. try another')
            })
        })
    })
})