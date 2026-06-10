Feature: Profile Page Toggle Light/Dark Mode

Scenario: User can switch the application color mode
    Given I have already signed in to the app
    When I click the navbar button
    Then I should see the section title "Setting"
    And I should see the label "Background Color"
    When I click the toggle button
    Then the color mode should change