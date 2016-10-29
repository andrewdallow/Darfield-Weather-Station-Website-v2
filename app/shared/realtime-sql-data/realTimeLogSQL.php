<?php

include ('../../forbidden/b_rw_details.php');

date_default_timezone_set('Pacific/Auckland');


if (filter_input(INPUT_GET, "hours")) {
    $interval = filter_input(INPUT_GET, "hours");
} else {
    die("No 'hours' parameter supplied");
}

if ($interval == "") {
    die("Invalid number of months specified");
}

//Connect to Weather data database
$mysqli = new mysqli($dbhost, $dbuser, $dbpassword, $database);

if ($mysqli->connect_errno) {
    echo "Failed to connect to MySQL: (" . $mysqli->connect_errno . ") " . $mysqli->connect_error;
}


//Associative array for realtime date used for JSON 
$data = [
    "xData" => [],
    "datasets" => [
		"temperature" => [],
		"dewpoint" => [],
		"windChill" => [],
		"windSpeed" => [],
		"windGust" => [],
		"windDirection" => [],
		"humidity" => [],
		"pressure" => [],
		"rainFall" => [],
    ]
];

$sql = "SELECT * FROM realtime1 WHERE datetime >= DATE_FORMAT(NOW() - INTERVAL " . $interval . " HOUR, '%Y-%m-%d %H:%i:%s');";

//Quary Realtime table
$result = $mysqli->query($sql);
$timezone = 60 * 60 * 12 * 1000;

//Loop over quary result on insert into associative array
if ($result) {
    while ($row = mysqli_fetch_assoc($result)) {
        $time = new DateTime($row['dateTime']);
        $data['xData'][] = $time->getTimestamp() * 1000;

        $data['datasets']['temperature'][] = (float) $row['temp'];
        $data['datasets']['dewpoint'][] = (float) $row['dew'];
        $data['datasets']['windChill'][] = (float) $row['windChill'];

        $data['datasets']['windSpeed'][] = (float) $row['wind'];
        $data['datasets']['windGust'][] = (float) $row['gust'];

        $data['datasets']['windDirection'][] = (float) $row['windDir'];
        
        $data['datasets']['humidity'][] = (float) $row['hum'];
        $data['datasets']['pressure'][] = (float) $row['baro'];        

        $data['datasets']['rainFall'][] = (float) $row['rFall'];
    }
    /* free result set */
    $result->close();
} else {
    echo "Error: " . $sql . "<br>" . $mysqli->error;
}
$mysqli->close();

//Return the data in JSON format
header('Cache-Control: private');
header('Cache-Control: no-cache, must-revalidate');
header('Content-type: text/json  charset=UTF-8');

echo json_encode($data, JSON_PRETTY_PRINT);
