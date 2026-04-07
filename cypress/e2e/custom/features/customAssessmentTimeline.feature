Feature: Custom suite assessment timeline coverage

  Scenario Outline: Manage dated assessments with the source-style custom suite on <viewport>
    Given I open the custom BDD suite in "<viewport>" viewport
    When I remember the active assessment label as "baselineDate" in the custom suite
    And I click on the "add assessment button" on "Agile_Maturity_App"
    Then I verify "assessment count" should contain "2 / 12 dates" on "Agile_Maturity_App"
    When I remember the active assessment label as "futureDate" in the custom suite
    And I set question "Technical excellence" field "score" to "5" in the custom suite
    And I switch to the assessment chip stored as "baselineDate" in the custom suite
    Then I verify question "Technical excellence" should have score "2" and target "4" in the custom suite
    When I switch to the assessment select entry stored as "futureDate" in the custom suite
    Then I verify question "Technical excellence" should have score "5" and target "4" in the custom suite
    When I enter date "2030-01-31" in "assessment date input" on "Agile_Maturity_App"
    And I click on the "update date button" on "Agile_Maturity_App"
    Then I verify the active assessment label should be "2030-01-31" in the custom suite

    Examples:
      | viewport |
      | desktop  |
      | mobile   |
