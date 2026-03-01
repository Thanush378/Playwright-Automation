Feature: Ecommerce validations

@Regression
Scenario: Placing the order
    Given A login to Ecommerce website "svthanush01@gmail.com" and "TEstSite@@123#$"
    When Add "ZARA COAT 3" to the cart 
    Then Verify "ZARA COAT 3" is displayed in the cart
    When Place the order with "India" as country
    Then Verify the order is present in Orders History