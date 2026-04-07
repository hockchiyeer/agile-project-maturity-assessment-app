Feature: Custom suite persistence and export coverage

  Scenario Outline: Persist and export state with the source-style custom suite on <viewport>
    Given I open the custom BDD suite in "<viewport>" viewport
    When I click on the "link json button" on "Agile_Maturity_App"
    And I set question "Technical excellence" field "score" to "4" in the custom suite
    Then I verify linked JSON latest write contains question "Technical excellence" with score "4" in the custom suite
    When I click on the "download json button" on "Agile_Maturity_App"
    Then I verify downloaded JSON contains question "Technical excellence" with score "4" in the custom suite
    Given I prepare the custom suite JSON fixture "saved-assessment.json"
    When I click on the "open json button" on "Agile_Maturity_App"
    Then I verify "assessment count" should contain "2 / 12 dates" on "Agile_Maturity_App"
    And I verify question "Loaded Coverage" should belong to discipline "Z-Fixture Discipline" in the custom suite
    When I click on the "export pdf button" on "Agile_Maturity_App"
    Then I verify PDF export file name "agile-project-maturity-report.pdf" in the custom suite
    When I click on the "export ppt button" on "Agile_Maturity_App"
    Then I verify PPT export file name "agile-project-maturity-report.pptx" in the custom suite

    Examples:
      | viewport |
      | desktop  |
      | mobile   |
