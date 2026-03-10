import http from "k6/http"
import { check, sleep } from "k6"
import { loginHelper } from "../../helpers/auth.js"

// Performance Test : PERF-VHCL-GAVH-001
// Multiple users see their vehicle list header format simultaneously

// Env
const BASE_URL = __ENV.BASE_URL

// Test Config Data
const MAX_P95_RESPONSE_TIME = "900"
const MAX_FAILURE_RATE = "0.01"

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
    // Get token from login
    const token = loginHelper()

    // Prepare the endpoint
    const url = `${BASE_URL}/api/v1/vehicle/header`
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
        "get all vehicle header success": (r) => r.json("status") === "success",
    })

    // Pause before next iteration
    sleep(1)
}