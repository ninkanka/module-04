Feature: Language change

    Scenario Outline: User changes language on the web page
        Given the user is on the home page
        When the user click on the Drop-down menu
        And the user select "<language>"
        Then all text on the web page should be displayed in "<language>"


     Examples:
        | language |
        | DE       |
        | FR       |
        | NL       |
        | TR       |