import '../../../../support/template'

describe('MyRide Integration Test - Dictionary - Post : Create Dictionary', () => {
    const method = 'post'
    const url = '/api/v1/dictionary'

    it('TC-INT-DC-006 : Admin Cant Create Dictionary Using Invalid Rules For Dictionary Type', () => {
        const payloadAuth = {
            username : "testeradmin",
            password: 'nopass123'
        }
        const payload = {
            dictionary_name: 'test_dictionary_name',
            dictionary_type: 'test_trip_category',
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
            }).as('AdminCantCreateDictionaryUsingInvalidRulesForDictionaryType')
            cy.get('@AdminCantCreateDictionaryUsingInvalidRulesForDictionaryType').then(dt => {
                cy.templateDelete(dt, 400, {
                    "dictionary_type": ["Dictionary Type is not available"]
                })
            })
        })
    })

    it('TC-INT-DC-007 : Admin Cant Create Dictionary Using Invalid Char Length Dictionary Name', () => {
        const payloadAuth = {
            username : "testeradmin",
            password: 'nopass123'
        }
        const payload = {
            dictionary_name: 'Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien.',
            dictionary_type: 'trip_category',
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
            }).as('AdminCantCreateDictionaryUsingInvalidCharLengthDictionaryName')
            cy.get('@AdminCantCreateDictionaryUsingInvalidCharLengthDictionaryName').then(dt => {
                cy.templateDelete(dt, 400, {
                    "dictionary_name": ["The dictionary name field must not be greater than 75 characters."]
                })
            })
        })
    })

    it('TC-INT-DC-008 : Admin Cant Create Dictionary Using Empty Dictionary Name', () => {
        const payloadAuth = {
            username : "testeradmin",
            password: 'nopass123',
        }
        const payload = {
            dictionary_type: 'trip_category',
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
            }).as('AdminCantCreateDictionaryUsingEmptyDictionaryName')
            cy.get('@AdminCantCreateDictionaryUsingEmptyDictionaryName').then(dt => {
                cy.templateDelete(dt, 400, {
                    "dictionary_name": ["The dictionary name field is required."]
                })
            })
        })
    })

    it('TC-INT-DC-009 : Admin Can Create Dictionary Using Valid Data', () => {
        const payloadAuth = {
            username : "testeradmin",
            password: 'nopass123',
        }
        const payload = {
            dictionary_name: 'test_dictionary',
            dictionary_type: 'trip_category',
        }

        cy.templateIntegrationLoginAPI(payloadAuth.username, payloadAuth.password).then(token => {
            cy.request({
                method: method,
                url,
                headers: {
                    Authorization: `Bearer ${token}`
                },
                body: payload,
            }).as('AdminCanCreateDictionaryUsingValidData')
            cy.get('@AdminCanCreateDictionaryUsingValidData').then(dt => {
                cy.templateDelete(dt, 201, 'dictionary created')
            })
        })
    })

    it('TC-INT-DC-010 : Admin Cant Create Dictionary Using Duplicated Dictionary Name', () => {
        const payloadAuth = {
            username : "testeradmin",
            password: 'nopass123',
        }
        const payload = {
            dictionary_name: 'test_dictionary',
            dictionary_type: 'trip_category',
        }

        cy.templateIntegrationLoginAPI(payloadAuth.username, payloadAuth.password).then(token => {
            cy.request({
                method: method,
                url,
                headers: {
                    Authorization: `Bearer ${token}`
                },
                failOnStatusCode: false,
                body: payload,
            }).as('AdminCantCreateDictionaryUsingDuplicatedDictionaryName')
            cy.get('@AdminCantCreateDictionaryUsingDuplicatedDictionaryName').then(dt => {
                cy.templateDelete(dt, 409, "dictionary name has been used. try another")
            })
        })
    })
})