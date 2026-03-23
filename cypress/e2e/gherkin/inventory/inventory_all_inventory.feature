Feature: Inventory Page All Inventory

Scenario: User can see their inventory list
    Given I have already signed in to the app 
    Then I open the "Inventory" page
    And I should see the section title "All Inventory"
    And I should see the table headers with labels "Vehicle, Inventory Name, Qty, Info, Properties, Action"
    And I should see vehicle plate number, vehicle type, inventory name, qty, inventory info, properties, and action button
    And I should be able to navigate the table content
