<?php

include ('../../../forbidden/b_rw_details.php');

class Db {
  // The databace Connection
  protected static $connection;
/**
 * Connect to the database
 * @return bool false on failure / mysqli MySQLi object instance on success
 */
  public function connect() {
    global $dbhost, $dbuser, $dbpassword, $database;
    // Try and connect to the database
    if(!isset($this->connection)) {
      $this->connection =  new mysqli($dbhost, $dbuser, $dbpassword, $database);
    }
    // If connection was not successful, handle the error
    if($this->connection === false) {
      return false;
    }
    return $this->connection;
  }
  /**
   * Close the db connection
   * @return bool false on failure
   */
  public function close() {
    return $this->connection->close();
  }
  /**
    * Query the database
    *
    * @param $query The query string
    * @return mixed The result of the mysqli::query() function
    */
  public function query($query) {
    //Connect to database
    $connection = $this->connect();

    // Query the database
    $result = $connection->query($query);
    return $result;
  }
  /**
     * Fetch rows from the database (SELECT query)
     *
     * @param $query The query string
     * @return bool False on failure / array Database rows on success
     */
  public function select($query) {
    $rows = array();
    $result = $this->query($query);
    if($result === false) {
      return $this->error();
    }
    while($row = $result->fetch_assoc()){
      $rows[] = $row;
    }
    return $rows;
  }

  /**
     * Fetch the last error from the database
     *
     * @return string Database error message
     */
    public function error() {
        $connection = $this -> connect();
        return $connection -> error;
    }

    /**
     * Quote and escape value for use in a database query
     *
     * @param string $value The value to be quoted and escaped
     * @return string The quoted and escaped string
     */
    public function quote($value) {
        $connection = $this -> connect();
        return "'" . $connection -> real_escape_string($value) . "'";
    }
}
