<?php

include "./config.php";

/**
 * 根据传入的用户ID和产品ID删除数据库中购物车表中对应的数据.
 *
 */


if ($_SERVER["REQUEST_METHOD"] == "POST") {
    if (isset($_POST["u_id"]) && isset($_POST["p_id"])) {
        $UID=$_POST["u_id"];
        $PID=$_POST["p_id"];

        $rmsql = "DELETE FROM cart WHERE p_id=? AND u_id=?;";
        $stmt = $conn->prepare("$rmsql");
        $stmt->bind_param("ii",$PID,$UID);
        $stmt->execute();

        if( $stmt->affected_rows>=1){
            print_r(json_encode(array("status" => 200, "msg" => "数据删除成功")));
        }else{
            print_r(json_encode(array("status" => 501, "msg" => "数据删除失败")));
        }

    } else {
        print_r(json_encode(array("status" => 402, "msg" => "参数获取失败")));
    };
} else {
    print_r(json_encode(array("status" => 401, "msg" => "只支持post请求")));
};