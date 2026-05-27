Feature: History Page All History

Scenario: User can see their history
    Given I have already signed in to the app 
    Then I open the "History" page
    And I should see the section title "All History"
    And I should see the history item that contains history context, history type, created date, and delete button
    And I should be able to navigate the list content
