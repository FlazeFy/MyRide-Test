Feature: Dashboard Page Last Trip

Scenario: User can see their last trip
    Given I have already signed in to the app
    Then I should see the section title "Last Trip"
    And I should see the label "Locate on" with the trip location coordinate and name
    And I should see the trip date with format "dd MMM yyyy"
    And I should see the plate number and driver name
    And I should see "Set Route" button