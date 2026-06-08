Feature: Inventory Page Export Inventory Dataset

Scenario: User can export their inventory dataset
    Given I have already signed in to the app 
    Then I open the "Inventory" page
    And I should see the export button "Dataset"
    And I click the export button
    Then I should see "success" pop up with message "inventory data downloaded"
    And I should get the inventory dataset
