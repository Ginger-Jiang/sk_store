<?php
/*
 *用户登录模块
 *
 *只能使用post请求
 *判断用户输入是否存在
 *接受用户输入
 *准备sql语句
 *预查询
 *绑定参数
 *执行
 *获取结果
 *
 *返回结果-->200 保存成功
 */

include "./config.php";


if ($_SERVER["REQUEST_METHOD"] == "POST") {
     // session操作
    session_start();  //开启session

    if (isset($_POST["uName"]) && isset($_POST["uPwd"])) {
        $UNAME = $_POST["uName"];
        $UPWD = $_POST["uPwd"];

        $sqllogin = "SELECT * FROM userinfo WHERE u_name='" . $UNAME . "' AND u_pwd='" . $UPWD . "';";
        //4. 执行sql语句
        $result = $conn->query($sqllogin);
        // $querySql = "SELECT * FROM userinfo WHERE u_name = ? AND u_pwd = ?;";
        // $stmt = $conn->prepare($querySql);
        // $stmt->bind_param("ss", $UNAME, $UPWD);
        // $stmt->execute();
        // $result = $stmt->get_result();
        // foreach ($result as $valve) {
        //     print_r($valve);
        //     // array(
        //     //     [u_id] => 57
        //     //         [u_name] => 346600397 @qq . com
        //     //         [u_pwd] => 4297 f44b13955235245b2497399d7a93
        //     //         [u_tel] =>
        //     //         [u_email] =>
        //     //         [u_headpic] =>
        //     // )
        // };
        if ($result->num_rows >= 1) {
            $_SESSION["userinfo"] = $result->fetch_assoc();
            print_r(json_encode(array("status" => 200, ("msg") => "登录成功")));
            // print_r($_SESSION["userinfo"]);
        } else {
            print_r(json_encode(array("status" => 502, ("msg") => "登录失败")));
        };
    } else {
        print_r(json_encode(array("status" => 402, ("msg") => "参数获取失败")));
    };
} else {
    print_r(json_encode(array("status" => 401, ("msg") => "只支持post请求")));
};



