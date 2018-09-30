<?php
/*
 *判断用户名是否存在功能
 *
 *使用get请求
 *获取用户输入值
 *使用sql语句查询数据库
 *判断数据库中是否存在
 *返回trur或false

 */

//引入文件
include './config.php';

//判断用户名是否存在
if (isset($_REQUEST["uName"])) {
    //接受用户输入
    $UNAME = $_REQUEST["uName"];

    //准备sql语句
    $querysql = 'SELECT * FROM userinfo WHERE u_name=?;';

    //预查询
    $stmt=$conn->prepare($querysql);

    //绑定参数
    $stmt->bind_param("s", $UNAME);

    //执行
    $stmt->execute();

    $result = $stmt->get_result();

    //判断结果
    if ($result->num_rows >= 1) {
        print_r("false");
    } else {
        print_r("true");
    }

} else {
    print_r(json_encode(array("status"=>402,"msg"=>"未获取到用户名")));
};








