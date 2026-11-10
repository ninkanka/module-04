Feature: Contact

    Scenario: Enter and send contact form
        Given the user is on the home page
        When the user selects "Contact" from main menu
        And the user inputs all required fields
        And the user clicks "Send" button
        Then a confirmation message should be displayed 