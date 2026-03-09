import http from "k6/http"
import { check, sleep } from "k6"

// Performance Test : PERF-TRIP-GTDS-001
// Multiple users see trip discovered summary simultaneously

// Credentials
const BASE_URL = __ENV.BASE_URL

// Test Config Data
const MAX_P95_RESPONSE_TIME = "1000"
const MAX_FAILURE_RATE = "0.05"

export const options = {
    stages: [
        { duration: "30s", target: 2 },  // warm up
        { duration: "60s", target: 5 },  // 75% server's capacity test
        { duration: "60s", target: 5 },  // sustain load
        { duration: "30s", target: 0 },  // ramp down
    ],
    thresholds: {
        http_req_duration: [`p(95)<${MAX_P95_RESPONSE_TIME}`],
        http_req_failed: [`rate<${MAX_FAILURE_RATE}`],
    },
}

export default function () {
    // Prepare the endpoint
    const url = `${BASE_URL}/api/v1/trip/discovered`
    const params = {
        headers: {
            "Content-Type": "application/json",
        },
    }

    // Exec the endpoint
    const res = http.get(url, params)

    // Check response
    check(res, {
        "status is 200": (r) => r.status === 200,
        "get stats success": (r) => r.json("status") === "success",
    })

    // Pause before next iteration
    sleep(1)
}