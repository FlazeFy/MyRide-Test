Feature: Dashboard Page Next Service

Scenario: User can see their next service
    Given I have already signed in to the app
    Then I should see the section title "Next Service"
    And I should see the label "Tomorrow" or a date in "dd MMM YYYY" format
    And I should see the service time in "hh:mm A" format
    And I should see the vehicle's plate number and service category
    And I should see the label "Notes:" and "Location:" with a value
