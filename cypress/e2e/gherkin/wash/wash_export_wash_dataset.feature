Feature: Wash Page Export Wash Dataset

Scenario: User can export their wash dataset
    Given I have already signed in to the app 
    Then I open the "Wash" page
    And I should see the export button "Dataset"
    And I click the export button
    Then I should see "success" pop up with message "wash data downloaded"
    And I should get the wash dataset
