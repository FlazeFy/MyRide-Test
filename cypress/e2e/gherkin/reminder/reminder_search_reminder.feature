Feature: Reminder Page Search Reminder

Scenario: User can search reminder by valid title or body
    Given I have already signed in to the app
    When I open the "Reminder" page
    Then I should see the section title "All Reminder"
    Then I should find input with label "Search by Title or Body" and type "lorem"
    Then I should only see reminder data related to "lorem"

Scenario: User cant search reminder by invalid title and body
    Given I have already signed in to the app
    When I open the "Reminder" page
    Then I should see the section title "All Reminder"
    Then I should find input with label "Search by Title or Body" and type "xxxx"
    Then I should only see alert message with text "No reminder found"