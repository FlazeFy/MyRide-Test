Feature: Navbar Sign Out

Scenario: User can sign out from the app
    Given I have already signed in to the app
    Then I clicked the sign out button in the navbar
    Then I should see pop up confirmation
    Then I clicked the "Yes, Sign Out" button
    Then I should be redirected to the "login" page