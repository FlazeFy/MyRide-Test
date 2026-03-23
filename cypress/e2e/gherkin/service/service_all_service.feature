Feature: Service Page All Service

Scenario: User can see their service history
    Given I have already signed in to the app 
    Then I open the "Service" page
    And I should see the section title "All Service"
    And I should see the table headers with labels "Vehicle, Category, Info, Notes, Properties, Action"
    And I should see plate number, vehicle type, service category, service info, notes, properties, and action button
    And I should be able to navigate the table content
