Feature: Dashboard rendering

  Scenario Outline: Render the seeded dashboard on <viewport>
    Given I open the Agile maturity app on a "<viewport>" viewport
    Then the seeded dashboard summary is rendered
    And the question table contains 58 seeded rows
    And the app renders charts for the dashboard
    And the layout matches the "<viewport>" viewport
    When I change the comparison chart type to "line"
    Then the comparison chart mode is "line"

    Examples:
      | viewport |
      | desktop  |
      | mobile   |

