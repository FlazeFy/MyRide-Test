Feature: Profile Page Toggle Auto Dark Mode

Scenario: User can switch the application auto color mode
    Given I have already signed in to the app
    When I click the navbar button
    Then I should see the section title "Setting"
    And I should see the label "Auto Background"
    When I click the toggle button
    Then the color mode should change based on current time