<?php

include '../../../shared/mysql-database/Db.php';

class HistoricData
{
    // Database connection
    private $db;
    private $table = 'dayfile';
    private $month;
    private $year;
    private $dates;

    public function __construct()
    {
        $this->db = new Db();
        $this->getParams();
    }
  /**
   * Get the JSON formated stats and graph data.
   *
   * @return JSON JSON encoded array
   */
  public function getJsonData()
  {
      if ($this->dates) {
          $data = $this->getValidDates();
      } elseif ($this->month) {
          $data = array(
            'stats' => $this->getStats()[0],
            'graphData' => $this->getGraphData(),
            'alltime' => $this->getAlltimeMonthStats()[0],
            );
      } else {
          $data = array(
            'stats' => $this->getStats()[0],
            'graphData' => $this->getGraphData(),
            'alltime' => $this->getAlltimeYearStats()[0],
            );
      }
      $this->db->close();

      return json_encode($data, JSON_PRETTY_PRINT);
  }

    private function getValidDates()
    {
        $query = "SELECT `LogDate` AS logDate FROM $this->table GROUP BY YEAR(`LogDate`)";

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
      if (filter_input(INPUT_GET, 'month')) {
          $this->month = $this->db->quote(filter_input(INPUT_GET, 'month'));
      }
  }
  /**
   * Get the alltime data statistics for the given year and month.
   *
   * @return array statistcal data
   */
  private function getAlltimeYearStats()
  {
      $stats = 'ROUND(MAX(`MaxTemp`), 1) AS `maxTemp`, '
            .'ROUND(MIN(`MinTemp`), 1) AS `minTemp`, '
            .'ROUND(MAX(`HighWindGust`), 0) AS `highWindGust`';
      $query = "SELECT $stats FROM $this->table";

      return $this->db->select($query);
  }
  /**
   * Get the alltime data statistics for the given year and month.
   *
   * @return array statistcal data
   */
  private function getAlltimeMonthStats()
  {
      $stats = 'ROUND(MAX(`MaxTemp`), 1) AS `maxTemp`, '
            .'ROUND(MIN(`MinTemp`), 1) AS `minTemp`, '
            .'ROUND(MAX(`HighWindGust`), 0) AS `highWindGust`';
      $query = "SELECT $stats FROM $this->table WHERE MONTH(`LogDate`)= $this->month";

      return $this->db->select($query);
  }
   /* Get the data statistics for the given year and month.
   *
   * @return array statistcal data
   */
  private function getStats()
  {
      $stats = 'ROUND(AVG(`AvgTemp`), 1) AS `avgTemp`, '
            .'ROUND(MAX(`MaxTemp`), 1) AS `maxTemp`, '
            .'ROUND(AVG(`MaxTemp`), 1) AS `avgMaxTemp`, '
            .'ROUND(MIN(`MinTemp`), 1) AS `minTemp`, '
            .'ROUND(AVG(`MinTemp`), 1) AS `avgMinTemp`, '
            .'ROUND(SUM(`TotRainFall`), 1) AS `totRainFall`, '
            .'ROUND(MAX(`HighWindGust`), 0) AS `highWindGust`';
      $query = "SELECT $stats FROM $this->table WHERE YEAR(`LogDate`)=";
      if ($this->year) {
          $query = $query.$this->year;
          if ($this->month) {
              $query = $query.' AND MONTH(`LogDate`)='.$this->month;
          }
          $result = $this->db->select($query);
          // Get wind bearing for max gust
          $query = "SELECT ROUND(`HWindGBear`, 0) AS hWindGBear FROM $this->table";
          $query .= " WHERE YEAR(`LogDate`)=$this->year";
          if ($this->month) {
              $query .= " AND MONTH(`LogDate`)=$this->month";
              $query .= " AND `HighWindGust`=(SELECT MAX(`HighWindGust`) FROM $this->table WHERE YEAR(LogDate)=$this->year AND MONTH(LogDate)=$this->month)";
          } else {
              $query .= " AND `HighWindGust`=(SELECT MAX(`HighWindGust`) FROM $this->table WHERE YEAR(LogDate)=$this->year)";
          }
          $result[0]['hWindGBear'] = $this->db->select($query)[0]['hWindGBear'];

          return $result;
      }

      return false;
  }
  /**
   * Get the graph data for the given year and month.
   *
   * @return array graph data
   */
  private function getGraphData()
  {
      if ($this->month) {
          $stats = '`LogDate` AS logDate, '
            .'ROUND(`MaxTemp`, 0) AS `maxTemp`, '
            .'ROUND(`MinTemp`, 0) AS `minTemp`, '
            .'ROUND(`HighWindGust`, 0) AS `highWindGust`, '
            .'ROUND(`HWindGBear`, 0) AS `hWindGBear`, '
            .'ROUND(`TotRainFall`, 1) AS `totRainFall`';
      } else {
          $stats = '`LogDate` AS logDate, '
              .'ROUND(MAX(`MaxTemp`), 1) AS `maxTemp`, '
              .'ROUND(AVG(`MaxTemp`), 1) AS `avgMaxTemp`, '
              .'ROUND(MIN(`MinTemp`), 1) AS `minTemp`, '
              .'ROUND(AVG(`MinTemp`), 1) AS `avgMinTemp`, '
              .'ROUND(SUM(`TotRainFall`), 1) AS `totRainFall`';
      }

      $query = "SELECT $stats FROM $this->table WHERE YEAR(`LogDate`)=";
      if ($this->year) {
          $query .= $this->year;
          if ($this->month) {
              $query .= ' AND MONTH(`LogDate`)='.$this->month;
          } else {
              $query .= ' GROUP BY MONTH(`LogDate`)';
          }

          return $this->db->select($query);
      }

      return false;
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
