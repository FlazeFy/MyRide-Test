const { Given, Then } = require("@badeball/cypress-cucumber-preprocessor")

const testData = {
    username: "flazen.edu",
    password: "nopass123"
}

Given("I have already signed in to the app", () => {
    cy.login(testData.username, testData.password)
})

Then("I should see the my username in the navbar", () => {
    cy.get("nav a#profile-button").should("contain.text", testData.username)
})

Then("I clicked the button", () => {
    cy.get("nav a#profile-button").click()
})

Then("I should be redirected to the profile page", () => {
    cy.url().should("include", "/profile")
})