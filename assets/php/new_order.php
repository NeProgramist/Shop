<?php
require_once 'database.php';

$email = "php_test@gmail.com";
$phone = "+380444444434";

$delivery = "Lviv";
$product_count = array(
    array(1,1),
    array(2,1),
    array(4,2)
);

$user_id ="SELECT id FROM clients.clients WHERE email = '$email' and phone_number='$phone'";
$result = mysqli_query($link, $user_id) or die("Cannot get data: " . mysqli_error($link));
$id = mysqli_fetch_row($result)[0];

if($id) {
    print "add new order $id:$delivery";
    $insert_o ="INSERT INTO shop.orders (client_id, delivery_place) VALUES('$id','$delivery')";
    mysqli_query($link, $insert_o) or die("Cannot get data: " . mysqli_error($link));
    $order_id ="SELECT order_id FROM shop.orders WHERE client_id = '$id'";
    $order = mysqli_query($link, $order_id) or die("Cannot get data: " . mysqli_error($link));
    $order_id = mysqli_fetch_row($order)[0];

    for($i = 0; $i < count($product_count); $i++) {
        $insert_po ="INSERT INTO shop.product_orders (order_id, product_id, count) VALUES('$order_id','{$product_count[$i][0]}','{$product_count[$i][1]}')";
        mysqli_query($link, $insert_po) or die("Cannot get data: " . mysqli_error($link));
    }
} else {
    print "cat find user with this info";
}

mysqli_free_result($result);
mysqli_close($link);
