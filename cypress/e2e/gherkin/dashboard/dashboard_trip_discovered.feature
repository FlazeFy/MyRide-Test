Feature: Dashboard Page Trip Discovered

Scenario: User can see their trip discovered
    Given I have already signed in to the app
    Then I should see the section title "Trip Discovered"
    And I should see the label "Last Updated:" with a value in "dd MMM YYYY" date format
    And I should see the label "Trip" with a numeric value
    And I should see the total trip distance with a numeric value followed by "km"