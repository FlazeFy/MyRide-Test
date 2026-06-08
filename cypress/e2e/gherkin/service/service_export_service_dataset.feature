Feature: Service Page Export Service Dataset

Scenario: User can export their service dataset
    Given I have already signed in to the app 
    Then I open the "Service" page
    And I should see the export button "Dataset"
    And I click the export button
    Then I should see "success" pop up with message "service data downloaded"
    And I should get the service dataset
