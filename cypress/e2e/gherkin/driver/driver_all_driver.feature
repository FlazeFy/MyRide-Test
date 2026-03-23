Feature: Driver Page All Driver

Scenario: User can see their driver list
    Given I have already signed in to the app 
    Then I open the "Driver" page
    And I should see the section title "All Driver"
    And I should see the table headers with labels "Username & FullName, Contact, Notes, Total Trip, Properties, Action"
    And I should see driver info, notes, total trip, properties, and action button
    And I should be able to navigate the table content
