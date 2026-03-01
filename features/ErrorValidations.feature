Feature: Ecommerce validations

@Validation
Scenario Outline: Scenario Outline name: Placing the order 
    Given A login to Ecommerce2 website "<username>" and "<password>"
    Then Verify an error message is displayed

    Examples:
        | username       | password       |
        | standard_use   | secret_sauce   |
        | locked_out_user| secret_sauces  |