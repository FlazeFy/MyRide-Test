Feature: Login Page Basic Auth

Scenario: User can login with valid data
    Given I open the login page
    Then I should see the section title "You are at MyRide Apps"
    And I should see the label "Email / Username"
    And I should see the label "Password"
    And I should see the submit button "Enter the Garage"
    When I fill in the email with "flazen.edu"
    And I fill in the password with "nopass123"
    And I click the submit button
    Then I should be redirected to the dashboard page

Scenario: User cant login with wrong password
    Given I open the login page
    Then I should see the section title "You are at MyRide Apps"
    And I should see the label "Email / Username"
    And I should see the label "Password"
    And I should see the submit button "Enter the Garage"
    When I fill in the email with "flazen.edu"
    And I fill in the password with "nopass1234"
    And I click the submit button
    Then I should see alert message "wrong password or username"

Scenario: User cant login with invalid char length username
    Given I open the login page
    Then I should see the section title "You are at MyRide Apps"
    And I should see the label "Email / Username"
    And I should see the label "Password"
    And I should see the submit button "Enter the Garage"
    When I fill in the email with "fla"
    And I fill in the password with "nopass1234"
    And I click the submit button
    Then I should see alert message "The username field must be at least 6 characters."

Scenario: User cant login with empty username
    Given I open the login page
    Then I should see the section title "You are at MyRide Apps"
    And I should see the label "Email / Username"
    And I should see the label "Password"
    And I should see the submit button "Enter the Garage"
    When I fill in the email with " "
    And I fill in the password with "nopass123"
    And I click the submit button
    Then I should see alert message "The username field is required."