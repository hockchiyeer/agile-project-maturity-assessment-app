Feature: Editing and customization

  Scenario Outline: Edit, filter, customize, and reset the assessment on <viewport>
    Given I open the Agile maturity app on a "<viewport>" viewport
    When I create the discipline "Z-Quality Engineering"
    Then the discipline scorecards include "Z-Quality Engineering"
    When I add a question with discipline "Z-Quality Engineering" virtue "Coverage Gates" principle "Automated quality gates protect releases" score "3" and target "5"
    Then the question "Coverage Gates" appears under discipline "Z-Quality Engineering"
    When I rename the discipline "Z-Quality Engineering" to "Z-Quality Enablement"
    Then the discipline scorecards include "Z-Quality Enablement"
    When I filter the table to the discipline "Z-Quality Enablement"
    Then only questions for discipline "Z-Quality Enablement" are visible
    When I change the question "Coverage Gates" virtue to "Quality Gates"
    And I change the question "Quality Gates" principle to "Automated quality gates protect every release"
    And I change the question "Quality Gates" score to "9"
    And I change the question "Quality Gates" target to "0"
    Then the question "Quality Gates" has score "5" and target "1"
    And the question "Quality Gates" principle is "Automated quality gates protect every release"
    When I delete the question "Quality Gates"
    Then the question "Quality Gates" is not listed
    When I clear the discipline filter
    And I reset the dashboard defaults
    Then all question scores are reset to "2"
    And all question targets are reset to "5"

    Examples:
      | viewport |
      | desktop  |
      | mobile   |
