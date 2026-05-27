import '../../../../support/template'
import basePayload from '../../../resources/data/trip.json'

describe('Integration Test - Trip - Post : Create Trip', () => {
    const method = 'post'
    const url = '/api/v1/trip'

    const testCases = [
        {
            title: 'TC-INT-TR-038 : User Cant Create Trip History Using Invalid Rules For Trip Category',
            alias: 'UserCantCreateTripHistoryUsingInvalidRulesForTripCategory',
            payload: {
                trip_category: 'Refuel'
            },
            expected_status: 400,
            expected_response: {
                trip_category: ['Trip Category is not available']
            }
        },
        {
            title: 'TC-INT-TR-039 : User Cant Create Trip History Using Invalid Trip Origin Name Character Length',
            alias: 'UserCantCreateTripHistoryUsingInvalidTripOriginNameCharacterLength',
            payload: {
                trip_origin_name: 'A'
            },
            expected_status: 400,
            expected_response: {
                trip_origin_name: ['The trip origin name field must be at least 2 characters.']
            }
        },
        {
            title: 'TC-INT-TR-040 : User Cant Create Trip History Using Invalid Trip Origin Coordinate',
            alias: 'UserCantCreateTripHistoryUsingInvalidTripOriginCoordinate',
            payload: {
                trip_origin_coordinate: '-6.170485464990194'
            },
            expected_status: 400,
            expected_response: 'trip origin coordinate must be valid coordinate'
        },
        {
            title: 'TC-INT-TR-041 : User Cant Create Trip History Using Same Origin And Destination Name',
            alias: 'UserCantCreateTripHistoryUsingSameOriginAndDestinationName',
            payload: {
                trip_destination_name: 'My Home'
            },
            expected_status: 400,
            expected_response: 'trip origin and destination name must be different'
        },
        {
            title: 'TC-INT-TR-042 : User Cant Create Trip History Using Same Origin And Destination Coordinate',
            alias: 'UserCantCreateTripHistoryUsingSameOriginAndDestinationCoordinate',
            payload: {
                trip_destination_coordinate: '-6.170485464990194, 106.824224764755'
            },
            expected_status: 400,
            expected_response: 'trip origin and destination coordinate must be different'
        },
        {
            title: 'TC-INT-TR-043 : User Cant Create Trip History Using Invalid Departure At (Datetime Format)',
            alias: 'UserCantCreateTripHistoryUsingInvalidDepartureAt(DatetimeFormat)',
            payload: {
                departure_at: '2026-01-16'
            },
            expected_status: 400,
            expected_response: {
                departure_at: ['The departure at field must match the format Y-m-d H:i:s.']
            }
        },
        {
            title: 'TC-INT-TR-044 : User Cant Create Trip History Using Invalid Vehicle Id (UUID)',
            alias: 'UserCantCreateTripHistoryUsingInvalidVehicleId(UUID)',
            payload: {
                vehicle_id: '1'
            },
            expected_status: 400,
            expected_response: {
                vehicle_id: ['The vehicle id field must be 36 characters.']
            }
        },
        {
            title: 'TC-INT-TR-045 : User Cant Create Trip History Using Invalid Vehicle Id (Not Found)',
            alias: 'UserCantCreateTripHistoryUsingInvalidVehicleId(NotFound)',
            payload: {
                vehicle_id: '7d53371a-e363-2ad3-25fe-180dae88c069'
            },
            expected_status: 404,
            expected_response: 'vehicle not found'
        },
        {
            title: 'TC-INT-TR-046 : User Cant Create Trip History Using Invalid Driver Id (Not Found)',
            alias: 'UserCantCreateTripHistoryUsingInvalidDriverId(NotFound)',
            payload: {
                driver_id: '5eaa10e9-1e2a-a789-0c96-fb3714ee9b81'
            },
            expected_status: 404,
            expected_response: 'driver not found'
        }
    ]

    const payloadAuth = {
        username: 'flazen.edu',
        password: 'nopass123'
    }

    // Looping Negative Test Case
    testCases.forEach(tc => {
        it(tc.title, () => {
            const payload = {
                ...basePayload,
                ...tc.payload
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
                }).as(tc.alias)

                cy.get(`@${tc.alias}`).then(dt => {
                    cy.templateDelete(dt, tc.expected_status, tc.expected_response)
                })
            })
        })
    })

    // Invalid Auth
    it('TC-INT-TR-047 : User Cant Create Trip History Using Invalid Auth', () => {
        const payload = {
            ...basePayload
        }

        cy.request({
            method,
            url,
            body: payload,
            failOnStatusCode: false,
        }).as('UserCantCreateTripHistoryUsingInvalidAuth')
        cy.get('@UserCantCreateTripHistoryUsingInvalidAuth').then(dt => {
            cy.templateDelete(dt, 401, 'you need to include the authorization token from login')
        })
    })

    // Positive Test Case
    it('TC-INT-TR-048 : User Can Create Trip History Using Valid Data', () => {
        const payload = {
            ...basePayload
        }

        cy.templateIntegrationLoginAPI(payloadAuth.username, payloadAuth.password).then(token => {
            cy.request({
                method,
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