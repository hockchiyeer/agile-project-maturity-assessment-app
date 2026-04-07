Feature: Custom suite dashboard coverage

  Scenario Outline: Review the seeded dashboard with source-style page objects on <viewport>
    Given I open the custom BDD suite in "<viewport>" viewport
    Then I verify "app title" should contain "Agile Maturity Management" on "Agile_Maturity_App"
    And I verify "assessment count" should contain "1 / 12 dates" on "Agile_Maturity_App"
    And I verify count of "question rows" should be 58 on "Agile_Maturity_App"
    And I verify count of "discipline scorecards" should be 8 on "Agile_Maturity_App"
    And I verify "radar chart" should be visible on "Agile_Maturity_App"
    When I select "line" from "comparison chart type" on "Agile_Maturity_App"
    Then I verify "comparison chart type" should have value "line" on "Agile_Maturity_App"

    Examples:
      | viewport |
      | desktop  |
      | mobile   |

