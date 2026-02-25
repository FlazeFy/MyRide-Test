Feature: Landing Page Facts Section

Scenario: Verify Facts About Us section
    Given I open the landing page
    Then I should see the section title "Facts About Us"
    And I should see the labels "User, Vehicle, Trip, Wash History, Service History, Driver"
    And the counters should contain numeric values
