Feature: Custom suite data management coverage

  Scenario Outline: Manage disciplines and questions with the source-style custom suite on <viewport>
    Given I open the custom BDD suite in "<viewport>" viewport
    When I click on the "open add discipline button" on "Agile_Maturity_App"
    And I enter "Z-Quality Engineering" in "discipline name input" on "Agile_Maturity_App"
    And I click on the "confirm add discipline" on "Agile_Maturity_App"
    Then I verify "discipline filter" should contain "Z-Quality Engineering" on "Agile_Maturity_App"
    When I add a custom question with discipline "Z-Quality Engineering" virtue "Coverage Gates" principle "Automated quality gates protect releases" score "3" and target "5" in the custom suite
    Then I verify question "Coverage Gates" should belong to discipline "Z-Quality Engineering" in the custom suite
    When I rename discipline "Z-Quality Engineering" to "Z-Quality Enablement" in the custom suite
    And I select "Z-Quality Enablement" from "discipline filter" on "Agile_Maturity_App"
    Then I verify only discipline "Z-Quality Enablement" questions are visible in the custom suite
    When I set question "Coverage Gates" field "virtue" to "Quality Gates" in the custom suite
    And I set question "Quality Gates" field "principle" to "Automated quality gates protect every release" in the custom suite
    And I set question "Quality Gates" field "score" to "5" in the custom suite
    And I set question "Quality Gates" field "target" to "1" in the custom suite
    Then I verify question "Quality Gates" should have score "5" and target "1" in the custom suite
    When I delete question "Quality Gates" in the custom suite
    Then I verify question "Quality Gates" should not exist in the custom suite
    When I select "All" from "discipline filter" on "Agile_Maturity_App"
    And I click on the "reset button" on "Agile_Maturity_App"
    Then I verify "save status" should contain "Changes are in memory" on "Agile_Maturity_App"

    Examples:
      | viewport |
      | desktop  |
      | mobile   |
