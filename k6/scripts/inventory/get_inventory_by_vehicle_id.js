import http from "k6/http"
import { check, sleep } from "k6"
import { loginHelper } from "../../helpers/auth.js"

// Performance Test : PERF-INVT-GAIN-001
// Multiple users see their inventory by vehicle id simultaneously

// Env
const BASE_URL = __ENV.BASE_URL
const vehicle_id = '7d53371a-e363-2ad3-25fe-180dae88c062'

// Test Config Data
const MAX_P95_RESPONSE_TIME = "800"
const MAX_FAILURE_RATE = "0.01"

export const options = {
    stages: [
        { duration: "30s", target: 2 },  // warm up
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
    // Get token from login
    const token = loginHelper()

    // Prepare the endpoint
    const url = `${BASE_URL}/api/v1/inventory/vehicle/${vehicle_id}`
    const params = {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
        },
    }

    // Exec the endpoint
    const res = http.get(url, params)

    // Check response
    check(res, {
        "status is 200": (r) => r.status === 200,
        "get inventory success": (r) => r.json("status") === "success",
    })

    // Pause before next iteration
    sleep(1)
}