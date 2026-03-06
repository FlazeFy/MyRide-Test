Feature: Sidebar User With Vehicle Menu List

Scenario: User with a vehicle can see full menu in the sidebar
    Given I have already signed in to the app
    And I have added a vehicle
    Then I click the sidebar button located in the left navbar
    Then I should see full menu list such as "Dashboard, My Garage, Journey, Trip, Fuel, Wash, Service, Reminder, Statistic, Driver, Inventory" in section "Menu"
