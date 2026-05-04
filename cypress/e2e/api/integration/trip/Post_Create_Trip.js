import '../../../../support/template'

describe('MyRide Integration Test - Trip - Post : Create Trip', () => {
    const method = 'post'
    const url = '/api/v1/trip'

    it('TC-INT-TR-038 : User Cant Create Trip History Using Invalid Rules For Trip Category', () => {
        const payloadAuth = {
            username : "flazefy",
            password: 'nopass123'
        }
        const payload = {
            vehicle_id: '7d53371a-e363-2ad3-25fe-180dae88c062',
            driver_id: '5eaa10e9-1e2a-a789-0c96-fb3714ee9b85', 
            trip_desc: 'lorem ipsum', 
            trip_category: 'Refuel',
            trip_person: 'Jhon Doe', 
            trip_origin_name: 'My Home', 
            trip_origin_coordinate: '-6.170485464990194, 106.824224764755',  
            trip_destination_name: 'Blok M Square',
            trip_destination_coordinate: '-6.244646319628283, 106.80059535234474', 
            departure_at: '2026-01-16 00:00:08',
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
            }).as('UserCantCreateTripHistoryUsingInvalidRulesForTripCategory')
            cy.get('@UserCantCreateTripHistoryUsingInvalidRulesForTripCategory').then(dt => {
                cy.templateDelete(dt, 400, {
                    "trip_category": ["Trip Category is not available"]
                })
            })
        })
    })

    it('TC-INT-TR-039 : User Cant Create Trip History Using Invalid Trip Origin Name Character Length', () => {
        const payloadAuth = {
            username : "flazefy",
            password: 'nopass123'
        }
        const payload = {
            vehicle_id: '7d53371a-e363-2ad3-25fe-180dae88c062',
            driver_id: '5eaa10e9-1e2a-a789-0c96-fb3714ee9b85', 
            trip_desc: 'lorem ipsum', 
            trip_category: 'Personal',
            trip_person: 'Jhon Doe', 
            trip_origin_name: 'A', 
            trip_origin_coordinate: '-6.170485464990194, 106.824224764755',  
            trip_destination_name: 'Blok M Square',
            trip_destination_coordinate: '-6.244646319628283, 106.80059535234474', 
            departure_at: '2026-01-16 00:00:08',
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
            }).as('UserCantCreateTripHistoryUsingInvalidTripOriginNameCharacterLength')
            cy.get('@UserCantCreateTripHistoryUsingInvalidTripOriginNameCharacterLength').then(dt => {
                cy.templateDelete(dt, 400, {
                    "trip_origin_name": ["The trip origin name field must be at least 2 characters."]
                })
            })
        })
    })

    it('TC-INT-TR-040 : User Cant Create Trip History Using Invalid Trip Origin Coordinate', () => {
        const payloadAuth = {
            username : "flazefy",
            password: 'nopass123'
        }
        const payload = {
            vehicle_id: '7d53371a-e363-2ad3-25fe-180dae88c062',
            driver_id: '5eaa10e9-1e2a-a789-0c96-fb3714ee9b85', 
            trip_desc: 'lorem ipsum', 
            trip_category: 'Personal',
            trip_person: 'Jhon Doe', 
            trip_origin_name: 'My Home', 
            trip_origin_coordinate: '-6.170485464990194',  
            trip_destination_name: 'Blok M Square',
            trip_destination_coordinate: '-6.244646319628283, 106.80059535234474', 
            departure_at: '2026-01-16 00:00:08',
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
            }).as('UserCantCreateTripHistoryUsingInvalidTripOriginCoordinate')
            cy.get('@UserCantCreateTripHistoryUsingInvalidTripOriginCoordinate').then(dt => {
                cy.templateDelete(dt, 400, 'trip origin coordinate must be valid coordinate')
            })
        })
    })

    it('TC-INT-TR-041 : User Cant Create Trip History Using Same Origin And Destination Name', () => {
        const payloadAuth = {
            username : "flazefy",
            password: 'nopass123'
        }
        const payload = {
            vehicle_id: '7d53371a-e363-2ad3-25fe-180dae88c062',
            driver_id: '5eaa10e9-1e2a-a789-0c96-fb3714ee9b85', 
            trip_desc: 'lorem ipsum', 
            trip_category: 'Personal',
            trip_person: 'Jhon Doe', 
            trip_origin_name: 'My Home', 
            trip_origin_coordinate: '-6.170485464990194, 106.824224764755',  
            trip_destination_name: 'My Home',
            trip_destination_coordinate: '-6.244646319628283, 106.80059535234474', 
            departure_at: '2026-01-16 00:00:08',
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
            }).as('UserCantCreateTripHistoryUsingSameOriginAndDestinationName')
            cy.get('@UserCantCreateTripHistoryUsingSameOriginAndDestinationName').then(dt => {
                cy.templateDelete(dt, 400, 'trip origin and destination name must be different')
            })
        })
    })

    it('TC-INT-TR-042 : User Cant Create Trip History Using Same Origin And Destination Coordinate', () => {
        const payloadAuth = {
            username : "flazefy",
            password: 'nopass123'
        }
        const payload = {
            vehicle_id: '7d53371a-e363-2ad3-25fe-180dae88c062',
            driver_id: '5eaa10e9-1e2a-a789-0c96-fb3714ee9b85', 
            trip_desc: 'lorem ipsum', 
            trip_category: 'Personal',
            trip_person: 'Jhon Doe', 
            trip_origin_name: 'My Home', 
            trip_origin_coordinate: '-6.170485464990194, 106.824224764755',  
            trip_destination_name: 'Blok M Square',
            trip_destination_coordinate: '-6.170485464990194, 106.824224764755', 
            departure_at: '2026-01-16 00:00:08',
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
            }).as('UserCantCreateTripHistoryUsingSameOriginAndDestinationCoordinate')
            cy.get('@UserCantCreateTripHistoryUsingSameOriginAndDestinationCoordinate').then(dt => {
                cy.templateDelete(dt, 400, 'trip origin and destination coordinate must be different')
            })
        })
    })

    it('TC-INT-TR-043 : User Cant Create Trip History Using Invalid Departure At (Datetime Format)', () => {
        const payloadAuth = {
            username : "flazefy",
            password: 'nopass123',
        }
        const payload = {
            vehicle_id: '7d53371a-e363-2ad3-25fe-180dae88c062',
            driver_id: '5eaa10e9-1e2a-a789-0c96-fb3714ee9b85', 
            trip_desc: 'lorem ipsum', 
            trip_category: 'Personal',
            trip_person: 'Jhon Doe', 
            trip_origin_name: 'My Home', 
            trip_origin_coordinate: '-6.170485464990194, 106.824224764755',  
            trip_destination_name: 'Blok M Square',
            trip_destination_coordinate: '-6.244646319628283, 106.80059535234474', 
            departure_at: '2026-01-16',
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
            }).as('UserCantCreateTripHistoryUsingInvalidDepartureAt(DatetimeFormat)')
            cy.get('@UserCantCreateTripHistoryUsingInvalidDepartureAt(DatetimeFormat)').then(dt => {
                cy.templateDelete(dt, 400, {
                    "departure_at": ["The departure at field must match the format Y-m-d H:i:s."]
                })
            })
        })
    })

    it('TC-INT-TR-044 : User Cant Create Trip History Using Invalid Vehicle Id (UUID)', () => {
        const payloadAuth = {
            username : "flazefy",
            password: 'nopass123'
        }
        const payload = {
            vehicle_id: '1',
            driver_id: '5eaa10e9-1e2a-a789-0c96-fb3714ee9b85', 
            trip_desc: 'lorem ipsum', 
            trip_category: 'Personal',
            trip_person: 'Jhon Doe', 
            trip_origin_name: 'My Home', 
            trip_origin_coordinate: '-6.170485464990194, 106.824224764755',  
            trip_destination_name: 'Blok M Square',
            trip_destination_coordinate: '-6.244646319628283, 106.80059535234474', 
            departure_at: '2026-01-16 00:00:08',
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
            }).as('UserCantCreateTripHistoryUsingInvalidVehicleId(UUID)')
            cy.get('@UserCantCreateTripHistoryUsingInvalidVehicleId(UUID)').then(dt => {
                cy.templateDelete(dt, 400, {
                    "vehicle_id": ["The vehicle id field must be 36 characters."]
                })
            })
        })
    })

    it('TC-INT-TR-045 : User Cant Create Trip History Using Invalid Vehicle Id (Not Found)', () => {
        const payloadAuth = {
            username : "flazefy",
            password: 'nopass123'
        }
        const payload = {
            vehicle_id: '7d53371a-e363-2ad3-25fe-180dae88c069',
            driver_id: '5eaa10e9-1e2a-a789-0c96-fb3714ee9b85', 
            trip_desc: 'lorem ipsum', 
            trip_category: 'Personal',
            trip_person: 'Jhon Doe', 
            trip_origin_name: 'My Home', 
            trip_origin_coordinate: '-6.170485464990194, 106.824224764755',  
            trip_destination_name: 'Blok M Square',
            trip_destination_coordinate: '-6.244646319628283, 106.80059535234474', 
            departure_at: '2026-01-16 00:00:08',
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
            }).as('UserCantCreateTripHistoryUsingInvalidVehicleId(NotFound)')
            cy.get('@UserCantCreateTripHistoryUsingInvalidVehicleId(NotFound)').then(dt => {
                cy.templateDelete(dt, 404, 'vehicle not found')
            })
        })
    })

    it('TC-INT-TR-046 : User Cant Create Trip History Using Invalid Driver Id (Not Found)', () => {
        const payloadAuth = {
            username : "flazefy",
            password: 'nopass123'
        }
        const payload = {
            vehicle_id: '7d53371a-e363-2ad3-25fe-180dae88c062',
            driver_id: '5eaa10e9-1e2a-a789-0c96-fb3714ee9b81', 
            trip_desc: 'lorem ipsum', 
            trip_category: 'Personal',
            trip_person: 'Jhon Doe', 
            trip_origin_name: 'My Home', 
            trip_origin_coordinate: '-6.170485464990194, 106.824224764755',  
            trip_destination_name: 'Blok M Square',
            trip_destination_coordinate: '-6.244646319628283, 106.80059535234474', 
            departure_at: '2026-01-16 00:00:08',
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
            }).as('UserCantCreateTripHistoryUsingInvalidDriverId(NotFound)')
            cy.get('@UserCantCreateTripHistoryUsingInvalidDriverId(NotFound)').then(dt => {
                cy.templateDelete(dt, 404, 'driver not found')
            })
        })
    })

    it('TC-INT-TR-047 : User Cant Create Trip History Using Invalid Auth', () => {
        const payload = {
            vehicle_id: '7d53371a-e363-2ad3-25fe-180dae88c062',
            driver_id: '5eaa10e9-1e2a-a789-0c96-fb3714ee9b85', 
            trip_desc: 'lorem ipsum', 
            trip_category: 'Personal',
            trip_person: 'Jhon Doe', 
            trip_origin_name: 'My Home', 
            trip_origin_coordinate: '-6.170485464990194, 106.824224764755',  
            trip_destination_name: 'Blok M Square',
            trip_destination_coordinate: '-6.244646319628283, 106.80059535234474', 
            departure_at: '2026-01-16 00:00:08',
        }

        cy.request({
            method: method,
            url,
            body: payload,
            failOnStatusCode: false,
        }).as('UserCantCreateTripHistoryUsingInvalidAuth')
        cy.get('@UserCantCreateTripHistoryUsingInvalidAuth').then(dt => {
            cy.templateDelete(dt, 401, 'you need to include the authorization token from login')
        })
    })

    it('TC-INT-TR-048 : User Can Create Trip History Using Valid Data', () => {
        const payloadAuth = {
            username : "flazefy",
            password: 'nopass123',
        }
        const payload = {
            vehicle_id: '7d53371a-e363-2ad3-25fe-180dae88c062',
            driver_id: '5eaa10e9-1e2a-a789-0c96-fb3714ee9b85', 
            trip_desc: 'lorem ipsum', 
            trip_category: 'Personal',
            trip_person: 'Jhon Doe', 
            trip_origin_name: 'My Home', 
            trip_origin_coordinate: '-6.170485464990194, 106.824224764755',  
            trip_destination_name: 'Blok M Square',
            trip_destination_coordinate: '-6.244646319628283, 106.80059535234474', 
            departure_at: '2026-01-16 00:00:08',
        }

        cy.templateIntegrationLoginAPI(payloadAuth.username, payloadAuth.password).then(token => {
            cy.request({
                method: method,
                url,
                headers: {
                    Authorization: `Bearer ${token}`
                },
                body: payload,
            }).as('UserCanCreateTripHistoryUsingValidData')
            cy.get('@UserCanCreateTripHistoryUsingValidData').then(dt => {
                cy.templateDelete(dt, 201, 'trip created')
            })
        })
    })
})