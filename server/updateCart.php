<?php

/**
 * 更新购物车模块-->将数据更新到数据库中
 *
 *  接受用户输入产品ID与用户ID
 *  在数据库中查询
 *  如果有->改变num数量
 *  如果没有->创建一个
 *
 * 用户登录状态下
 * 使用post请求
 * 接受用户传入参数
 * 插入数据库中
 * 返回插入结果
 *
 *
 */
include "./config.php";

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    if (isset($_POST["p_id"]) && isset($_POST["u_id"]) && isset($_POST["p_num"])) {
        //接受用户输入
        $P_ID = $_POST["p_id"];
        $U_ID = $_POST["u_id"];
        $P_NUM = $_POST["p_num"];

        //判断数据库中是否已经存在
        $querysql = "SELECT	* FROM cart WHERE p_id=? AND u_id=?;";
        $stmt = $conn->prepare($querysql);
        $stmt->bind_param("ii", $P_ID, $U_ID);
        $stmt->execute();
        $result = $stmt->get_result();
        if ($result->num_rows >= 1) {
            //数据库中有-->修改num
            $updatesql = "UPDATE cart SET p_num=p_num+? WHERE  p_id=? AND u_id=?";
            $stmt = $conn->prepare($updatesql);
            $stmt->bind_param("iii",$P_NUM, $P_ID, $U_ID);
            $stmt->execute();
            if( $stmt->affected_rows>=1){
                print_r(json_encode(array("status" => 200, "msg" => "加入购物车成功")));
            }else{
                print_r(json_encode(array("status" => 501, "msg" => "加入购物车失败")));
            }

        } else {
            //数据库中没有

            //准备sql
            $sql = "INSERT INTO cart()
            VALUE (?,?,?);";

            //预执行
            $stmt = $conn->prepare($sql);
            //绑定参数
            $stmt->bind_param("iii", $P_ID, $U_ID, $P_NUM);
            //执行
            $stmt->execute();

            if ($stmt->affected_rows >= 1) {
                print_r(json_encode(array("status" => 200, "msg" => "加入购物车成功")));
            } else {
                print_r(json_encode(array("status" => 501, "msg" => "加入购物车失败")));
            };
        };
    } else {
        print_r(json_encode(array("status" => 402, "msg" => "参数获取失败")));
    }
} else {
    print_r(json_encode(array("status" => 401, "msg" => "只支持post请求")));
};