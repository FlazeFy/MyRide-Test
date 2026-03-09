import http from "k6/http"
import { check, sleep } from "k6"

// Performance Test : PERF-DICT-GDBT-001
// Multiple users see dictionary by type simultaneously

// Credentials
const BASE_URL = __ENV.BASE_URL
const type = 'vehicle_type'

// Test Config Data
const MAX_P95_RESPONSE_TIME = "600"
const MAX_FAILURE_RATE = "0.03"

export const options = {
    stages: [
        { duration: "30s", target: 3 },  // warm up
        { duration: "60s", target: 6 },  // 75% server's capacity test
        { duration: "60s", target: 6 },  // sustain load
        { duration: "30s", target: 0 },  // ramp down
    ],
    thresholds: {
        http_req_duration: [`p(95)<${MAX_P95_RESPONSE_TIME}`],
        http_req_failed: [`rate<${MAX_FAILURE_RATE}`],
    },
}

export default function () {
    // Prepare the endpoint
    const url = `${BASE_URL}/api/v1/dictionary/type/${type}`
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