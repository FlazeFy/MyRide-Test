Feature: Dashboard Page Vehicle Readiness Buy Fuel

Scenario: User can buy a fuel via vehicle readiness table
    Given I have already signed in to the app 
    Then I should see the section title "Vehicle Readiness"
    And I should see the table headers with label "Action"
    And I should click the action button
    And I click the "Buy a Fuel" button
    And I should be redirected to the add fuel page
