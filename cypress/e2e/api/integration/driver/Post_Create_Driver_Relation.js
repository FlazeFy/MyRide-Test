import '../../../../support/template'

describe('Integration Test - Driver - Post : Create Driver - Vehicle Relation', () => {
    const method = 'post'
    const url = '/api/v1/driver/vehicle'

    it('TC-INT-DR-029 : User Cant Create Driver Relation Using Invalid Vehicle Id', () => {
        const payloadAuth = {
            username : "flazefy",
            password: 'nopass123'
        }
        const payload = {
            vehicle_id: '1',
            driver_id: '5eaa10e9-1e2a-a789-0c96-fb3714ee9b85',
            relation_note: 'Daily driver'
        }

        cy.templateIntegrationLoginAPI(payloadAuth.username, payloadAuth.password).then(token => {
            cy.request({
                method,
                url,
                headers: {
                    Authorization: `Bearer ${token}`
                },
                body: payload,
                failOnStatusCode: false,
            }).as('UserCantCreateDriverRelationUsingInvalidVehicleId')
            cy.get('@UserCantCreateDriverRelationUsingInvalidVehicleId').then(dt => {
                cy.templateDelete(dt, 400, {
                    vehicle_id: ["The vehicle id field must be 36 characters."]
                })
            })
        })
    })

    it('TC-INT-DR-030 : User Cant Create Driver Relation Using Empty Driver Id', () => {
        const payloadAuth = {
            username : "flazefy",
            password: 'nopass123',
        }
        const payload = {
            vehicle_id: '7d53371a-e363-2ad3-25fe-180dae88c062',
            relation_note: 'Daily driver'
        }

        cy.templateIntegrationLoginAPI(payloadAuth.username, payloadAuth.password).then(token => {
            cy.request({
                method,
                url,
                headers: {
                    Authorization: `Bearer ${token}`
                },
                body: payload,
                failOnStatusCode: false,
            }).as('UserCantCreateDriverRelationUsingEmptyDriverId')
            cy.get('@UserCantCreateDriverRelationUsingEmptyDriverId').then(dt => {
                cy.templateDelete(dt, 400, {
                    "driver_id": ["The driver id field is required."]
                })
            })
        })
    })

    it('TC-INT-DR-031 : User Cant Create Driver Relation Using Invalid Char Length Relation Note', () => {
        const payloadAuth = {
            username : "flazefy",
            password: 'nopass123',
        }
        const payload = {
            vehicle_id: '7d53371a-e363-2ad3-25fe-180dae88c062',
            driver_id: '5eaa10e9-1e2a-a789-0c96-fb3714ee9b85',
            relation_note: 'A'
        }

        cy.templateIntegrationLoginAPI(payloadAuth.username, payloadAuth.password).then(token => {
            cy.request({
                method,
                url,
                headers: {
                    Authorization: `Bearer ${token}`
                },
                body: payload,
                failOnStatusCode: false,
            }).as('UserCantCreateDriverRelationUsingInvalidCharLengthRelationNote')
            cy.get('@UserCantCreateDriverRelationUsingInvalidCharLengthRelationNote').then(dt => {
                cy.templateDelete(dt, 400, {
                    "relation_note": ["The relation note field must be at least 2 characters."]
                })
            })
        })
    })

    it('TC-INT-DR-032 : User Cant Create Driver Relation Using Invalid Auth', () => {
        const payload = {
            vehicle_id: '7d53371a-e363-2ad3-25fe-180dae88c062',
            driver_id: '5eaa10e9-1e2a-a789-0c96-fb3714ee9b85',
            relation_note: 'Daily driver'
        }

        cy.request({
            method,
            url,
            body: payload,
            failOnStatusCode: false,
        }).as('UserCantCreateDriverRelationUsingInvalidAuth')
        cy.get('@UserCantCreateDriverRelationUsingInvalidAuth').then(dt => {
            cy.templateDelete(dt, 401, 'you need to include the authorization token from login')
        })
    })

    it('TC-INT-DR-033 : User Can Create Driver Relation Using Valid Data', () => {
        const payloadAuth = {
            username : "flazefy",
            password: 'nopass123',
        }
        const payload = {
            vehicle_id: '7d53371a-e363-2ad3-25fe-180dae88c062',
            driver_id: '5eaa10e9-1e2a-a789-0c96-fb3714ee9b85',
            relation_note: 'Daily driver'
        }

        cy.templateIntegrationLoginAPI(payloadAuth.username, payloadAuth.password).then(token => {
            cy.request({
                method,
                url,
                headers: {
                    Authorization: `Bearer ${token}`
                },
                body: payload,
            }).as('UserCanCreateDriverRelationUsingValidData')
            cy.get('@UserCanCreateDriverRelationUsingValidData').then(dt => {
                cy.templateDelete(dt, 201, 'driver relation created')
            })
        })
    })

    it('TC-INT-DR-034 : User Cant Create Duplicated Driver Relation', () => {
        const payloadAuth = {
            username : "flazefy",
            password: 'nopass123',
        }
        const payload = {
            vehicle_id: '7d53371a-e363-2ad3-25fe-180dae88c062',
            driver_id: '5eaa10e9-1e2a-a789-0c96-fb3714ee9b85',
            relation_note: 'Daily driver'
        }

        cy.templateIntegrationLoginAPI(payloadAuth.username, payloadAuth.password).then(token => {
            cy.request({
                method,
                url,
                headers: {
                    Authorization: `Bearer ${token}`
                },
                body: payload,
                failOnStatusCode: false,
            }).as('UserCantCreateDuplicatedDriverRelation')
            cy.get('@UserCantCreateDuplicatedDriverRelation').then(dt => {
                cy.templateDelete(dt, 409, 'driver has been used. try another')
            })
        })
    })
})