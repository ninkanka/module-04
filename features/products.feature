Feature: Actions with products

    #Searching for an product
    Scenario Outline: user search for an exact product
     Given the user is on the home page
     When the user enters "<product>" into the search field
     And the user clicks on the "Search" button
     Then the user should see the "<product>" instead of full catalog

     Examples:
        | product            |
        | ear protection     |
        | combination pliers |
        | long nose pliers   |
        | hammer             |
        | m4 nuts            |

    #Checking product details page
    Scenario: User reads product details page
     Given the user is on the home page
     When the user clicks on a product card
     Then the product main details, including title, price, image, specifications, and description, should be displayed
     And the action buttons "Add to cart", "Add to favourites", and "Compare" should be available


    #Filter and sort products on the home page
    Scenario: User filters and sorts products
     Given the user is on the home page
     When the user selects filter "Power Tools" from filter sidebar
     And the user sorts "Price (Low - High)" products using the drop-down menu
     Then products should be displayed according to the selected filter and sorting option
