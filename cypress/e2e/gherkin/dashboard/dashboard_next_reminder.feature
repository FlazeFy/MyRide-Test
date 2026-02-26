Feature: Dashboard Page Next Reminder

Scenario: User can see their next reminder
    Given I have already signed in to the app
    Then I should see the section title "Next Reminder"
    And I should see the label "Tomorrow" or a date in "dd MMM YYYY" format
    And I should see the reminder time in "hh:mm A" format
    And I should see my attached vehicle's plate number in the reminder
    And I should see the label "Notes:" with a value
