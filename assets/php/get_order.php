<?php
require_once 'database.php';

$client_data = trim($_POST["data"]);

$query_client = "SELECT id FROM clients.clients WHERE email = '$client_data' or phone_number = '$client_data'";
$id = mysqli_query($link, $query_client) or die("Cannot get data: " . mysqli_error($link));
$client_id = mysqli_fetch_row($id)[0];

$query ="
SELECT * FROM shop.orders o
JOIN shop.product_orders po on o.order_id = po.order_id 
JOIN shop.products p on po.product_id = p.product_id
WHERE client_id = '$client_id'
";
$result = mysqli_query($link, $query) or die("Cannot get data: " . mysqli_error($link));

if($result) {
    $rows = mysqli_num_rows($result);
    $products = array();

    for ($i = 0 ; $i < $rows ; $i++) $products[] = mysqli_fetch_assoc($result);
    if ($products == []) {
        print "can't find orders of this user";
    } else {
        print json_encode($products, JSON_UNESCAPED_UNICODE);
    }
}
