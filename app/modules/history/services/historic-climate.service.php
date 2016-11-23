<?php

include '../../../shared/mysql-database/Db.php';

class HistoricData
{
    // Database connection
    private $db;
    private $table = 'dayfile';
    private $dates;

    public function __construct()
    {
        $this->db = new Db();
    }
  /**
   * Get the JSON formated stats and graph data.
   *
   * @return JSON JSON encoded array
   */
  public function getJsonData()
  {
      $data = $this->getGraphData();

      $this->db->close();

      return json_encode($data, JSON_PRETTY_PRINT);
  }

    private function getValidDates()
    {
        $query = "SELECT YEAR(`LogDate`) AS logDate FROM $this->table GROUP BY YEAR(`LogDate`)";

        return $this->db->select($query);
    }

  /**
   * Fetch the global Parameters of year and month.
   */
  private function getParams()
  {
      if (filter_input(INPUT_GET, 'dates')) {
          $this->dates = filter_input(INPUT_GET, 'dates');
      } elseif (filter_input(INPUT_GET, 'year')) {
          $this->year = $this->db->quote(filter_input(INPUT_GET, 'year'));
      } else {
          die("No 'year' parameter supplied");
      }
  }

  /**
   * Get the graph data for the given year and month.
   *
   * @return array graph data
   */
  private function getGraphData()
  {
      $result = array();
      $stats = 'COALESCE(`LogDate`) AS logDate, '
              .'ROUND(AVG(`AvgTemp`), 1) AS `averageTemperature`, '
              .'ROUND(MAX(`AvgTemp`), 1) AS `warmestDay`, '
              .'ROUND(MIN(`AvgTemp`), 1) AS `coldestDay`, '
              .'ROUND(AVG(`MaxTemp`), 1) AS `averageDailyHigh`, '
              .'ROUND(MAX(`MaxTemp`), 1) AS `highestTemperature`, '
              .'ROUND(Min(`MaxTemp`), 1) AS `lowestDailyHigh`, '
              .'ROUND(MIN(`MinTemp`), 1) AS `lowestTemperature`, '
              .'ROUND(MAX(`MinTemp`), 1) AS `highestDailyLow`, '
              .'ROUND(AVG(`MinTemp`), 1) AS `averageDailyLow`, '
              .'ROUND(SUM(`TotRainFall`), 1) AS `totalRainfall`, '
              .'ROUND(MAX(`MaxRainRate`), 1) AS `highestRainRate`, '
              .'ROUND(MAX(`TotRainFall`), 1) AS `wettestDay`, '
              .'ROUND(MAX(`HighWindGust`), 1) AS `highestWindGust`, '
              .'ROUND(MAX(`TotWindRun`), 1) AS `highestWindRun`, '
              .'ROUND(MIN(`TotWindRun`), 1) AS `lowestWindRun`, '
              .'ROUND(MAX(`MaxPress`), 1) AS `highestPressure`, '
              .'ROUND(MIN(`MinPress`), 1) AS `lowestPressure`, '
              .'ROUND(MAX(`HighDewPoint`), 1) AS `highestDewpoint`, '
              .'ROUND(MIN(`LowDewPoint`), 1) AS `lowestDewpoint`, '
              .'ROUND(MIN(`LowHum`), 1) AS `lowestHumidity`';

      $years = $this->getValidDates();
      foreach ($years as $year) {
          $query = "SELECT $stats FROM $this->table WHERE YEAR(`LogDate`)=";
          $query .= $year['logDate'].' GROUP BY MONTH(`LogDate`)';
          $data = $this->db->select($query);
          // Get Rain days count_chars
          $query = "SELECT COUNT(TotRainFall) AS rainDays FROM $this->table
                    WHERE YEAR(`LogDate`)={$year['logDate']}
                    AND TotRainFall > 1 GROUP BY MONTH(`LogDate`)";
          $rain = $this->db->select($query);
          foreach ($data as $key => $value) {
              $data[$key]['rainDays'] = $rain[$key]['rainDays'];
          }
          array_push($result,
          [
              'year' => $year['logDate'],
              'data' => $this->monthlyData($data),
          ]);
      }

      return $result;
  }

    private function monthlyData($data)
    {
        $monthsTemp = array_fill(0, 12, 0);
        foreach ($data as $month) {
            $date = explode('-', $month['logDate']);
            $monthsTemp[(int) $date[1] - 1] = $month;
        }

        return $monthsTemp;
    }
}

function main()
{
    $historicData = new HistoricData();
    header('Content-type: text/json');
    header('Cache-Control: private');
    header('Cache-Control: access plus 4 hour');
    echo $historicData->getJsonData();
}

main();
