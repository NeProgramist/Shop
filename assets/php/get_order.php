<?php
require_once 'database.php';

$client_id = 12;

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
