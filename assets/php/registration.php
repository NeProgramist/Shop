<?php
require_once 'database.php';
$email = trim($_POST["email"]);
$phone = trim($_POST["phone"]);

$query ="SELECT * FROM clients.clients WHERE email = '$email' or phone_number='$phone' ";
$result = mysqli_query($link, $query) or die("Cannot get data: " . mysqli_error($link));

if(mysqli_fetch_assoc($result) == [] && $email != "" && $phone != "") {
    $insert = "INSERT INTO clients.clients (email, phone_number) VALUES('$email','$phone')";
    $insert_result = mysqli_query($link, $insert) or die("Ошибка " . mysqli_error($link));
}

$query ="SELECT id FROM clients.clients WHERE email = '$email' or phone_number='$phone'";
$ids = mysqli_query($link, $query) or die("Cannot get data: " . mysqli_error($link));

if($ids) print json_encode(mysqli_fetch_assoc($ids), JSON_UNESCAPED_UNICODE);

mysqli_free_result($result);
mysqli_free_result($ids);
mysqli_close($link);
