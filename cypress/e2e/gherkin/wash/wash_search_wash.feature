Feature: Wash Page Search Wash

Scenario: User can search wash by valid location or notes
    Given I have already signed in to the app
    When I open the "Wash" page
    Then I should see the section title "All Wash"
    Then I should find input with label "Search by Location / Notes" and type "lorem"
    Then I should only see wash data related to "lorem"

Scenario: User cant search wash by invalid location and notes
    Given I have already signed in to the app
    When I open the "Wash" page
    Then I should see the section title "All Wash"
    Then I should find input with label "Search by Location / Notes" and type "xxxx"
    Then I should only see alert message with text "No wash found"