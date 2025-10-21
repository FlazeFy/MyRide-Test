const { defineConfig } = require('cypress')

module.exports = defineConfig({
    e2e: {
        // baseUrl : 'https://myride.leonardhors.site',
        baseUrl: 'http://127.0.0.1:8002/',
        specPattern : "support",
        supportFile : false,
    }
})