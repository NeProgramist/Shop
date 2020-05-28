<?php
error_reporting(0);
require_once 'database.php';

$type = $_GET["type"];
$search = $_GET["search"];
$ids = $_GET["ids"];
$query = "SELECT * FROM shop.products";

if ($ids != "") {
    $query .= " WHERE product_id in ($ids)";
} else if($search != "") {
    $query .= " WHERE name = '$search'";
} else if($type == 0) {
    $query .= "";
} else {
    $query .= " WHERE type = '$type'";
}



$result = mysqli_query($link, $query) or die("Cannot get data: " . mysqli_error($link));

if($result) {
    $rows = mysqli_num_rows($result);
    $products = array();

    for ($i = 0 ; $i < $rows ; $i++) $products[] = mysqli_fetch_assoc($result);
    print json_encode($products, JSON_UNESCAPED_UNICODE);
}


mysqli_free_result($result);
mysqli_close($link);
