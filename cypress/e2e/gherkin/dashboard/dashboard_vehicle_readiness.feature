Feature: Dashboard Page Vehicle Readiness

Scenario: User can see their vehicle readiness status
    Given I have already signed in to the app 
    Then I should see the section title "Vehicle Readiness"
    And I should see the table headers with labels "Plate Number, Vehicle Name & Type, Status, Fuel, Capacity, Action"
    And I should see plate number, vehicle type & name, status, fuel, capacity, and action button
    And I should be able to navigate the table content
