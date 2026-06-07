Feature: Fuel Page Export Fuel Dataset

Scenario: User can export their fuel dataset
    Given I have already signed in to the app 
    Then I open the "Fuel" page
    And I should see the export button "Dataset"
    And I click the export button
    Then I should see "success" pop up with message "fuel data downloaded"
    And I should get the fuel dataset
