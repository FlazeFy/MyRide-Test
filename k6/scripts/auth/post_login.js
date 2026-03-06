import http from "k6/http"
import { check, sleep } from "k6"

// Performance Test : PERF-AUTH-PLGN-001
// Multiple users login simultaneously

// Credentials
const BASE_URL = __ENV.BASE_URL
const USERNAME = __ENV.K6_LOGIN_USERNAME
const PASSWORD = __ENV.K6_LOGIN_PASSWORD

// Test Config Data
const MAX_P95_RESPONSE_TIME = "800"
const MAX_FAILURE_RATE = "0.01"

export const options = {
    stages: [
        { duration: "30s", target: 3 },  // warm up
        { duration: "60s", target: 8 },  // 75% server's capacity test
        { duration: "60s", target: 8 },  // sustain load
        { duration: "30s", target: 0 },  // ramp down
    ],
    thresholds: {
        http_req_duration: [`p(95)<${MAX_P95_RESPONSE_TIME}`],
        http_req_failed: [`rate<${MAX_FAILURE_RATE}`],
    },
}

export default function () {
    // Prepare the endpoint
    const url = `${BASE_URL}/api/v1/login`
    const payload = JSON.stringify({
        username: USERNAME,
        password: PASSWORD,
    })
    const params = {
        headers: {
            "Content-Type": "application/json",
        },
    }

    // Exec the endpoint
    const res = http.post(url, payload, params)

    // Check response
    check(res, {
        "status is 200": (r) => r.status === 200,
        "login success": (r) => r.json("status") === "success",
    })

    // Pause before next iteration
    sleep(1)
}