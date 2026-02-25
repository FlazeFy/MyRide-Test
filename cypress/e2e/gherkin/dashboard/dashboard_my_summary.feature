Feature: Dashboard Page My Summary

Scenario: User can see their account summary
    Given I already signed in into the app 
    Then I should see the section title "Summary"
    And I should see the labels "Vehicle, Service, Wash, Driver, Trip"
    And the counters should contain numeric values
