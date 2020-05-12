<?php
$host = 'localhost';
$database = '';
$user = 'root';
$password = '1574';

$link = mysqli_connect($host, $user, $password, $database) or die("Cannot connect to server: " . mysqli_error($link));

