Feature: Dashboard Page Trip Monthly Total

Scenario: User can see their total trip monthly
    Given I have already signed in to the app
    Then I should see the section title "Trip Monthly"
    And I should see the line chart and the horizontal label showing the list of month names
    And I should see a chart with valid values for each series
