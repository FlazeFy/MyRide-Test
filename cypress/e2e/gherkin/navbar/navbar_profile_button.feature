Feature: Navbar Profile Button

Scenario: User can see their username in the navbar profile button
    Given I have already signed in to the app
    Then I should see the my username in the navbar
    Then I clicked the button 
    Then I should be redirected to the profile page