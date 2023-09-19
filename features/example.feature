
Feature: Navigate to Google 

Scenario: Go to login page and enter email 
    Given I go to the login page 
    Then I click on the "link" "Sign in" 
    And I enter "samanthap8675@gmail.com" in "Email or phone" 
    And I click "Next"

