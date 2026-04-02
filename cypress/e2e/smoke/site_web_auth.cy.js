describe('Smoke Test - All Web Routes', () => {
    const routes = [
        // Public
        { uri: '/', auth: false, type: 'public' },
        { uri: '/register', auth: false, type: 'public' },
        { uri: '/login', auth: false, type: 'public' },
        { uri: '/help', auth: false, type: 'public' },
        { uri: '/about', auth: false, type: 'public' },
        { uri: '/embed/app_summary', auth: false, type: 'public' },
        { uri: '/embed/trip_discovered', auth: false, type: 'public' },
    
        // Private - Guest
        { uri: '/dashboard', auth: false, type: 'private' },
        { uri: '/garage', auth: false, type: 'private' },
        { uri: '/garage/add', auth: false, type: 'private' },
        { uri: '/garage/edit/1', auth: false, type: 'private' },
        { uri: '/garage/detail/1', auth: false, type: 'private' },
        { uri: '/wash', auth: false, type: 'private' },
        { uri: '/wash/add', auth: false, type: 'private' },
        { uri: '/trip', auth: false, type: 'private' },
        { uri: '/trip/calendar', auth: false, type: 'private' },
        { uri: '/trip/add', auth: false, type: 'private' },
        { uri: '/reminder', auth: false, type: 'private' },
        { uri: '/reminder/add', auth: false, type: 'private' },
        { uri: '/inventory', auth: false, type: 'private' },
        { uri: '/inventory/add', auth: false, type: 'private' },
        { uri: '/history', auth: false, type: 'private' },
        { uri: '/driver', auth: false, type: 'private' },
        { uri: '/driver/add', auth: false, type: 'private' },
        { uri: '/service', auth: false, type: 'private' },
        { uri: '/service/add', auth: false, type: 'private' },
        { uri: '/journey', auth: false, type: 'private' },
        { uri: '/partner', auth: false, type: 'private' },
        { uri: '/place', auth: false, type: 'private' },
        { uri: '/fuel', auth: false, type: 'private' },
        { uri: '/fuel/add', auth: false, type: 'private' },
        { uri: '/stats', auth: false, type: 'private' },
        { uri: '/profile', auth: false, type: 'private' },
    
        // Private - Authenticated
        { uri: '/dashboard', auth: true, type: 'private' },
        { uri: '/garage', auth: true, type: 'private' },
        { uri: '/garage/add', auth: true, type: 'private' },
        { uri: '/garage/edit/1', auth: true, type: 'private' },
        { uri: '/garage/detail/1', auth: true, type: 'private' },
        { uri: '/wash', auth: true, type: 'private' },
        { uri: '/wash/add', auth: true, type: 'private' },
        { uri: '/trip', auth: true, type: 'private' },
        { uri: '/trip/calendar', auth: true, type: 'private' },
        { uri: '/trip/add', auth: true, type: 'private' },
        { uri: '/reminder', auth: true, type: 'private' },
        { uri: '/reminder/add', auth: true, type: 'private' },
        { uri: '/inventory', auth: true, type: 'private' },
        { uri: '/inventory/add', auth: true, type: 'private' },
        { uri: '/history', auth: true, type: 'private' },
        { uri: '/driver', auth: true, type: 'private' },
        { uri: '/driver/add', auth: true, type: 'private' },
        { uri: '/service', auth: true, type: 'private' },
        { uri: '/service/add', auth: true, type: 'private' },
        { uri: '/journey', auth: true, type: 'private' },
        { uri: '/partner', auth: true, type: 'private' },
        { uri: '/place', auth: true, type: 'private' },
        { uri: '/fuel', auth: true, type: 'private' },
        { uri: '/fuel/add', auth: true, type: 'private' },
        { uri: '/stats', auth: true, type: 'private' },
        { uri: '/profile', auth: true, type: 'private' },
    ]
  
    routes.forEach((route) => {
        it(`[${route.auth ? 'auth' : 'guest'}] ${route.uri}`, () => {
            if (route.auth) {
                const testData = {
                    email: "flazen.edu",
                    password: "nopass123"
                }
                cy.login(testData.email, testData.password)
            }
    
            const start = Date.now()
    
            cy.request({
                url: route.uri,
                failOnStatusCode: false,
                }).then((res) => {
        
                (route.type === 'private' && !route.auth) ? expect(res.status).to.be.oneOf([301, 302]) : expect(res.status).to.eq(200)
            })
    
            // UI Check
            cy.visit(route.uri, { failOnStatusCode: false })
    
            (route.type === 'private' && !route.auth) ? cy.url().should('include', '/login') : cy.get('body').should('exist')
    
            // Performance
            cy.then(() => {
                const duration = Date.now() - start
                expect(duration).to.be.lessThan(1500)
            })
        })
    })
})