<?php
require_once 'database.php';

$id = trim($_POST["id"]);
$delivery = trim($_POST["delivery"]);
$product_count = json_decode(trim($_POST["count"]));

if($id != null && $delivery != null) {
    $insert_o ="INSERT INTO shop.orders (client_id, delivery_place) VALUES('$id','$delivery')";
    mysqli_query($link, $insert_o) or die("Cannot get data: " . mysqli_error($link));
    $order_id ="SELECT order_id FROM shop.orders WHERE client_id = '$id' ORDER BY order_id DESC";
    $order = mysqli_query($link, $order_id) or die("Cannot get data: " . mysqli_error($link));
    if ($order) {
        $order_id = mysqli_fetch_row($order)[0];
        for ($i = 0; $i < count($product_count); $i++) {
            $insert_po = "INSERT INTO shop.product_orders (order_id, product_id, count) VALUES('$order_id','{$product_count[$i][0]}','{$product_count[$i][1]}')";
            mysqli_query($link, $insert_po) or die("Cannot get data: " . mysqli_error($link));
        }
    }
}

mysqli_close($link);
