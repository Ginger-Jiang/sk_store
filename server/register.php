<?php
/*
 *判断用户名是否存在功能
 *
 *只能使用post请求
 *判断用户输入是否存在
 *接受用户输入
 *准备sql语句
 *预查询
 *绑定参数
 *执行
 *获取结果
 *关闭链接
 *返回结果-->200 保存成功
 */


include "./config.php";

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    /**
     *前端用户名-->uName
     *密码-->uPwd
     */
    if (isset($_POST["uName"]) && isset($_POST["uPwd"])) {
        $insetSql = "INSERT INTO userinfo (`u_name`,`u_pwd`)
        VALUE(?,?);";

        $UNAME = $_POST["uName"];

        $UPWD = $_POST["uPwd"];
        $stmt = $conn->prepare($insetSql);
        $stmt->bind_param("ss", $UNAME, $UPWD);
        $stmt->execute();
        // $stmt->get_result();
        if ($stmt->affected_rows >= 1) {
            print_r("true");
        } else {
            print_r(json_encode(array("status" => 501, "msg" => "数据保存失败")));
        }
    } else {
        print_r(json_encode(array("status" => 402, "msg" => "参数获取失败")));
    };
} else {
    print_r(json_encode(array("status" => 401, "msg" => "只支持post请求")));
};


