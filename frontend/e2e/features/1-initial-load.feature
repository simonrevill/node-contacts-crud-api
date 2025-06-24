Feature: Initial load of the application
  Scenario: User sees the correct page title when the application loads
    Given I navigate to http://localhost:3000
    Then I should see the page title "Contact Manager"
  
  Scenario: User sees the correct heading when the application loads
    Given I navigate to http://localhost:3000
    Then I should see the heading "Contact Manager" in the header

  Scenario: User sees error message when the application fails to load data
    Given I navigate to http://localhost:3000
    And there is a problem fetching data from the server
    Then I should see an alert message telling me there was an issue fetching the data

  Scenario: User sees an empty contact list when the application loads successfully
    Given I navigate to http://localhost:3000
    Then I should see an empty contact list message
    And a button prompting me to create a new contact

  Scenario: User sees a populated contact list when the application loads successfully
    Given I navigate to http://localhost:3000
    And there are 10 contacts stored in the database
    Then I should see a contact list populated with 10 contacts