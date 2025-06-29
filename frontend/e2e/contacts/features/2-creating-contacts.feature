Feature: Creating a new contact with valid and invalid data

  Scenario: Creating a new contact
    Given I am on the "Create contact" form
    When I click on the "Add contact" button
    Then I should see a create a new contact form with the relevant fields
    And a submit button
    And a button to navigate back to the contact list
  
  Scenario: Form shows validation errors and submit is disabled with invalid data
    Given I am on the "Create contact" form
    When I fill in the form with invalid data
    Then I should see the relevant validation error message
    And The submit button should be disabled 

  Scenario: Form shows no validation errors and submit is enabled with valid data
    Given I am on the "Create contact" form
    When I fill in the form with valid data
    Then I should see no validation error messages
    And the submit button should be enabled

  Scenario: Form shows a loading spinner and a message when submitting valid data
    Given I am on the "Create contact" form
    When I fill in the form with valid data and I click on submit
    Then I should see a loading spinner
    And A message indicating the contact is being created

  Scenario: Form shows a success message and a button to return to the contact list after successful creation
    Given I am on the "Create contact" form
    When I submit the form with valid data
    And The contact is successfully created in the database
    Then I should see an alert indicating the new contact was created successfully
    And A button that will take me back to the contact list