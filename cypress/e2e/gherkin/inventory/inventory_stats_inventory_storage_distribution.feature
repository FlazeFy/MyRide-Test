Feature: Inventory Page Stats Inventory Storage Distribution

Scenario: User can see inventory storage distribution visualize in pie chart
    Given I have already signed in to the app 
    Then I open the "Inventory" page
    And I should see the section title "Inventory Storage Distribution"
    And I should see the pie chart
    And I should see chart labels for each series
