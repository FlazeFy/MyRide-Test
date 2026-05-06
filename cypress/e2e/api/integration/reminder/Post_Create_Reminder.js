import '../../../../support/template'
import { getDatePlusDays } from '../../../helpers/generator'

describe('MyRide Integration Test - Reminder - Post : Create Reminder', () => {
    const method = 'post'
    const url = '/api/v1/reminder'

    it('TC-INT-RM-016 : User Cant Create Reminder Using Invalid Rules For Reminder Context', () => {
        const payloadAuth = {
            username : "flazefy",
            password: 'nopass123'
        }
        const payload = {
            vehicle_id: '7d53371a-e363-2ad3-25fe-180dae88c062',
            reminder_title: 'lorem ipsum',
            reminder_context: 'Warm Down',
            reminder_body: 'lorem ipsum',
            remind_at: getDatePlusDays(3)
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
            }).as('UserCantCreateReminderUsingInvalidRulesForReminderRon')
            cy.get('@UserCantCreateReminderUsingInvalidRulesForReminderRon').then(dt => {
                console.log(dt)
                cy.templateDelete(dt, 400, {
                    "reminder_context": ["Reminder Context is not available"]
                })
            })
        })
    })

    it('TC-INT-RM-017 : User Cant Create Reminder Using Invalid Char Length Reminder Title', () => {
        const payloadAuth = {
            username : "flazefy",
            password: 'nopass123'
        }
        const payload = {
            vehicle_id: '7d53371a-e363-2ad3-25fe-180dae88c062',
            reminder_title: 'Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien.',
            reminder_context: 'Warm Up',
            reminder_body: 'lorem ipsum',
            remind_at: getDatePlusDays(3)
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
            }).as('UserCantCreateReminderUsingInvalidCharLengthReminderReminderTitle')
            cy.get('@UserCantCreateReminderUsingInvalidCharLengthReminderReminderTitle').then(dt => {
                cy.templateDelete(dt, 400, {
                    "reminder_title": ["The reminder title field must not be greater than 75 characters."]
                })
            })
        })
    })

    it('TC-INT-RM-018 : User Cant Create Reminder Using Empty Reminder Title', () => {
        const payloadAuth = {
            username : "flazefy",
            password: 'nopass123',
        }
        const payload = {
            vehicle_id: '7d53371a-e363-2ad3-25fe-180dae88c062',
            reminder_context: 'Warm Up',
            reminder_body: 'lorem ipsum',
            remind_at: getDatePlusDays(3)
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
            }).as('UserCantCreateReminderUsingEmptyReminderNote')
            cy.get('@UserCantCreateReminderUsingEmptyReminderNote').then(dt => {
                cy.templateDelete(dt, 400, {
                    "reminder_title": ["The reminder title field is required."]
                })
            })
        })
    })

    it('TC-INT-RM-019 : User Cant Create Reminder Using Invalid Vehicle Id (Not Found)', () => {
        const payloadAuth = {
            username : "flazefy",
            password: 'nopass123'
        }
        const payload = {
            vehicle_id: '7d53371a-e363-2ad3-25fe-180dae88c069',
            reminder_title: 'lorem ipsum',
            reminder_context: 'Warm Up',
            reminder_body: 'lorem ipsum',
            remind_at: getDatePlusDays(3),
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
            }).as('UserCantCreateReminderUsingInvalidVehicleId(NotFound)')
            cy.get('@UserCantCreateReminderUsingInvalidVehicleId(NotFound)').then(dt => {
                console.log(dt)
                cy.templateDelete(dt, 404, 'vehicle not found')
            })
        })
    })

    it('TC-INT-RM-020 : User Cant Create Reminder Using Invalid Remind At Datetime Format', () => {
        const payloadAuth = {
            username : "flazefy",
            password: 'nopass123'
        }
        const payload = {
            vehicle_id: '7d53371a-e363-2ad3-25fe-180dae88c062',
            reminder_title: 'lorem ipsum',
            reminder_context: 'Warm Up',
            reminder_body: 'lorem ipsum',
            remind_at: '2026-01-16',
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
            }).as('UserCantCreateReminderUsingInvalidRemindAtDatetimeFormat')
            cy.get('@UserCantCreateReminderUsingInvalidRemindAtDatetimeFormat').then(dt => {
                cy.templateDelete(dt, 400, {
                    "remind_at": ["The remind at field must match the format Y-m-d H:i:s."]
                })
            })
        })
    })

    it('TC-INT-RM-021 : User Cant Create Reminder Using Invalid Remind At (Remind At Is Past Datetime', () => {
        const payloadAuth = {
            username : "flazefy",
            password: 'nopass123'
        }
        const payload = {
            vehicle_id: '7d53371a-e363-2ad3-25fe-180dae88c062',
            reminder_title: 'lorem ipsum',
            reminder_context: 'Warm Up',
            reminder_body: 'lorem ipsum',
            remind_at: getDatePlusDays(-3),
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
            }).as('UserCantCreateReminderUsingInvalidRemindAt(RemindAtIsPastDatetime)')
            cy.get('@UserCantCreateReminderUsingInvalidRemindAt(RemindAtIsPastDatetime)').then(dt => {
                cy.templateDelete(dt, 400, {
                    "remind_at": ["The remind at field must be a date after now."]
                })
            })
        })
    })

    it('TC-INT-RM-022 : User Cant Create Reminder Using Invalid Auth', () => {
        const payload = {
            vehicle_id: '7d53371a-e363-2ad3-25fe-180dae88c062',
            reminder_title: 'lorem ipsum',
            reminder_context: 'Warm Up',
            reminder_body: 'lorem ipsum',
            reminder_price_total: 1500000,
            remind_at: '2026-01-16 00:00:08',
            remind_at: getDatePlusDays(3)
        }

        cy.request({
            method: method,
            url,
            body: payload,
            failOnStatusCode: false,
        }).as('UserCantCreateReminderUsingInvalidAuth')
        cy.get('@UserCantCreateReminderUsingInvalidAuth').then(dt => {
            cy.templateDelete(dt, 401, 'you need to include the authorization token from login')
        })
    })

    it('TC-INT-RM-023 : User Can Create Reminder Using Valid Data', () => {
        const payloadAuth = {
            username : "flazefy",
            password: 'nopass123',
        }
        const payload = {
            vehicle_id: '7d53371a-e363-2ad3-25fe-180dae88c062',
            reminder_title: 'lorem ipsum',
            reminder_context: 'Warm Up',
            reminder_body: 'lorem ipsum',
            remind_at: getDatePlusDays(3),
        }

        cy.templateIntegrationLoginAPI(payloadAuth.username, payloadAuth.password).then(token => {
            cy.request({
                method: method,
                url,
                headers: {
                    Authorization: `Bearer ${token}`
                },
                body: payload,
            }).as('UserCanCreateReminderUsingValidData')
            cy.get('@UserCanCreateReminderUsingValidData').then(dt => {
                console.log(dt)
                cy.templateDelete(dt, 201, 'reminder created')
            })
        })
    })
})