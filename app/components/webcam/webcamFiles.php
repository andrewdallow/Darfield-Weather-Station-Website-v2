<?php

$files = array();

foreach (glob("../../data/webcam_img/*-thm.jpg") as $filename) {

    $fixedName = str_replace('../', '',$filename);

    $files[] = array(
        "name"=>$fixedName,
        "time"=>filemtime($filename)
    );
}

function cmp($a, $b)
{
    if ($a['time'] == $b['time']) {
        return 0;
    }
    return ($a['time'] < $b['time']) ? 1 : -1;
}

usort($files, "cmp");

header('Content-type: application/json');
echo json_encode($files);
?>
