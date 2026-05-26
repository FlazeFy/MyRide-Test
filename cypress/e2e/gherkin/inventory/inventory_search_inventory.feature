Feature: Inventory Page Search Inventory

Scenario: User can search inventory by valid name
    Given I have already signed in to the app
    When I open the "Inventory" page
    Then I should see the section title "All Inventory"
    Then I should find input with label "Search by Name" and type "tire"
    Then I should only see inventory data related to "tire"

Scenario: User cant search inventory by invalid name
    Given I have already signed in to the app
    When I open the "Inventory" page
    Then I should see the section title "All Inventory"
    Then I should find input with label "Search by Name" and type "xxxx"
    Then I should only see alert message with text "No inventory found"