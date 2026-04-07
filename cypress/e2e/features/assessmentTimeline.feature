Feature: Assessment timeline management

  Scenario Outline: Manage dated assessments on <viewport>
    Given I open the Agile maturity app on a "<viewport>" viewport
    When I remember the active assessment label as "baselineDate"
    And I add a new assessment date
    Then the app shows 2 saved dates
    When I remember the active assessment label as "newDate"
    And I set the score for question "Technical excellence" to "5"
    And I switch to the remembered assessment chip "baselineDate"
    Then the question "Technical excellence" has score "2" and target "4"
    When I switch to the remembered assessment from the select "newDate"
    Then the question "Technical excellence" has score "5" and target "4"
    When I change the active assessment date to "2030-01-31"
    Then the active assessment label is "2030-01-31"
    When I change the active assessment date to the remembered label "baselineDate"
    Then the save status contains "already exists"
    When I add assessment dates until the maximum is reached
    Then the assessment controls show 12 saved dates
    And the add date button is disabled
    When I remove the active assessment date
    Then the assessment controls show 11 saved dates

    Examples:
      | viewport |
      | desktop  |
      | mobile   |
