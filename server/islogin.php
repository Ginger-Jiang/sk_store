<?php
/*
 *判断用户是否登录模块
 *
 *只能使用post请求
 *开启session
 *
 *
 *
 */
include './config.php';
session_start();
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $result = array("status" => 101, "msg" => "您还未登录,请先登录");

    if (isset($_SESSION["userinfo"] )) {
        $result["status"] = 200;
        $result["msg"] = "欢迎您";
        $result["data"] = $_SESSION["userinfo"];
        print_r(json_encode($result));
    } else {
        // print_r(($_SESSION["userinfo"]));
        print_r(json_encode($result));
    };
} else {
    print_r(json_encode(array("status" => 401, ("msg") => "只支持post请求")));
}

