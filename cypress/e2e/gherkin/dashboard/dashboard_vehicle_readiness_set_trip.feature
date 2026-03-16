Feature: Dashboard Page Vehicle Readiness Set Trip

Scenario: User can set trip via vehicle readiness table
    Given I have already signed in to the app 
    Then I should see the section title "Vehicle Readiness"
    And I should see the table headers with label "Action"
    And I should click the action button
    And I click the "Set a Trip" button
    And I should be redirected to the add trip page
