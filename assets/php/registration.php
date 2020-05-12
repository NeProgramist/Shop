<?php
require_once 'database.php';
$email = "php_test2@gmail.com";
$phone = "+380444444443";

$query ="SELECT * FROM clients.clients WHERE email = '$email' or phone_number='$phone' ";
$result = mysqli_query($link, $query) or die("Cannot get data: " . mysqli_error($link));

if(mysqli_fetch_assoc($result) != [] && $result) {
    print "user already exists";
} else {
    print "add new user $email:$phone";
    $insert ="INSERT INTO clients.clients (email, phone_number) VALUES('$email','$phone')";
    $insert_result = mysqli_query($link, $insert) or die("Ошибка " . mysqli_error($link));
}

mysqli_free_result($result);
mysqli_close($link);
