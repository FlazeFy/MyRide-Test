Feature: Login Page Basic Auth

Scenario: User can log in successfully
    Given I open the login page
    Then I should see the section title "You are at MyRide Apps"
    And I should see the label "Email / Username"
    And I should see the label "Password"
    And I should see the submit button "Enter the Garage"
    When I fill in the email with "flazen.edu"
    And I fill in the password with "nopass123"
    And I click the submit button
    Then I should be redirected to the dashboard page