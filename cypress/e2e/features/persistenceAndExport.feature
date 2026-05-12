Feature: Persistence and export

  Scenario Outline: Save, download, reopen, and export state on <viewport>
    Given I open the Agile maturity app on a "<viewport>" viewport
    Then the save status contains "JSON not linked"
    When I link a JSON save file
    Then the save status contains "Saved to"
    When I change the question "Technical excellence" score to "4"
    Then the linked JSON write contains the question "Technical excellence" with score "4"
    And the linked JSON write contains an audit action "question_updated"
    When I download the current JSON snapshot
    Then the save status contains "Downloaded JSON snapshot"
    And the downloaded JSON contains the question "Technical excellence" with score "4"
    Given I prepare the fixture "saved-assessment.json" for the open JSON action
    When I open the prepared JSON snapshot
    Then the app loads the fixture named "saved-assessment.json"
    And the question "Loaded Coverage" appears under discipline "Z-Fixture Discipline"
    When I export the PDF report
    Then the PDF export is saved as "agile-project-maturity-report.pdf"
    And the save status contains "PDF exported successfully"
    When I export the PPT report
    Then the PPT export is saved as "agile-project-maturity-report.pptx"
    And the save status contains "PPT exported successfully"

    Examples:
      | viewport |
      | desktop  |
      | mobile   |
