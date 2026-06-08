Feature: Driver Page Export Driver Dataset

Scenario: User can export their driver dataset
    Given I have already signed in to the app 
    Then I open the "Driver" page
    And I should see the export button "Dataset"
    And I click the export button
    Then I should see "success" pop up with message "driver data downloaded"
    And I should get the driver dataset
