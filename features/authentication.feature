Feature: User authentication

  #Sign in
  Scenario: User signs in with valid information
   Given the user is on the Sign up/Sign in page
   When the user inputs a valid email address
   And  the User inputs valid password
   And the user click on Login button
   Then the user should be logged in successfully

  #Sign up
  Scenario: User signs up
   Given the user is on the Sign up/Sign in page
   When user click on link "Register your account"
   And the user enters his own valid credentials
   Then the user click on the Register button

  #Log out
    Scenario: User signs out
    Given user is signed in
    When the user click on profile Drop down menu
    And the user select "Sign out" in Drop down menu
    Then the user should see the text "Sign In" instead of the username




    