<?php
require_once './Detect.php';

$search = $_GET['search'];
$find = ['ebay'];
if(isset($search)) {
    $find = explode(',', $search);
}

$detect = new Detect();
$d = $detect->search($find, ['url', 'pageTitle'], 'OR', BOTH);
header("Access-Control-Allow-Origin: *");
header('Content-Type: application/json');
echo json_encode($d, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT);
