<?php


/**
 * 根据用户id查询购物车表
 * 判断post请求
 * 判断参数
 * 准备sql
 * 获取结果
 * 返回结果
 *
 */

include "./config.php";

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    if (isset($_POST["u_id"])) {
        $U_ID = $_POST["u_id"];

        $querysql = "SELECT	* FROM cart WHERE u_id=?;";
        $stmt = $conn->prepare($querysql);
        $stmt->bind_param("i",$U_ID);
        $stmt->execute();
        $result = $stmt->get_result();

        $resultArr = array();
        foreach($result as $value){
            array_push($resultArr,$value);
        };
        print_r(json_encode($resultArr));
    } else {
        print_r(json_encode(array("status" => 402, "msg" => "参数获取失败")));
    };
} else {
    print_r(json_encode(array("status" => 401, "msg" => "只支持post请求")));
};