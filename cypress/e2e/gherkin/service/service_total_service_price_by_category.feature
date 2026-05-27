Feature: Service Page Stats Total Service Price By Category

Scenario: User can see total service price by category visualize in pie chart
    Given I have already signed in to the app 
    Then I open the "Service" page
    And I should see the section title "Total Service Price By Category"
    And I should see the pie chart
    And I should see chart labels for each series
