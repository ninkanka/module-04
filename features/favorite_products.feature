Feature: Favorite products

    Rule: The user should be logged in 
        
        Scenario: Select favorite products
         Given the user is on the product details page
         When the user clicks on the "Add to favorites" button
         And the user opens the account drop-down menu
         And the user selects "My favorites" from the menu
         Then the user should see the selected product in the favorites list