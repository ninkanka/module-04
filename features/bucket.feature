Feature: Shopping cart actions

    Scenario: Add product to the shopping cart
     Given the user is on the product page
     When the user clicks on the "Add to cart" button
     Then the user should see the product on the shopping cart page


    Scenario: Delete a product from the shopping cart
     Given the user is on the shopping cart page
     And the user has at least one product in the shopping cart
     When the user clicks on the delete button
     Then the user should see the empty shopping cart