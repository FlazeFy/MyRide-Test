Feature: Fuel Page All Fuel

Scenario: User can see their fuel history
    Given I have already signed in to the app 
    Then I open the "Fuel" page
    And I should see the section title "All Fuel"
    And I should see the table headers with labels "Vehicle, Fuel Info, Type / Brand, Fuel At, Action"
    And I should see plate number, vehicle type, status, fuel info, fuel at, and action button
    And I should be able to navigate the table content
