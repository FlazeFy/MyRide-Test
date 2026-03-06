Feature: Sidebar Vehicle List Button

Scenario: User with a vehicle can see their list vehicle in the sidebar
    Given I have already signed in to the app
    And I have added a vehicle
    Then I click the sidebar button located in the left navbar
    Then I should see my vehicle list in section "My Vehicle"