<?php

/*
100-->信息提示
200-->成功提示
300-->重定向
400-->客户端错误
500-->服务器端错误


*/

header("Content-Type:application/json;charset=utf-8");
header("Access-Control-Allow-Origin:*");

$dbHost="localhost";
$connName = "root";
$connPwd = "";
$dataBase = "sk";
$connPort = "3306";

$conn = new mysqli($dbHost,$connName,$connPwd,$dataBase,$connPort);
mysqli_query($conn,"set names utf8");

print_r(false);