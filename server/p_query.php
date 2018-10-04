<?php

/**
 *
 *读取数据中商品信息->返回到首页,渲染首页商品数据
 *引入config
 *准备sql语句
 *根据传入id获取对应商品信息
 *返回一个对象包含所有商品详情
 */


include "./config.php";
$P_ID=$_REQUEST["p_id"];
$querysql = "SELECT	* FROM product WHERE p_id=?";
$stmt = $conn->prepare($querysql);
$stmt->bind_param("s",$P_ID);
$stmt->execute();
$result = $stmt->get_result();

$resultArr = array();
foreach($result as $value){
    array_push($resultArr,$value);
};
print_r(json_encode($resultArr));

// [
//     {
//         "p_id": 5,
//         "p_name": "【18年秋冬】BURBERRY/博柏利  男士女士中性款多色经典格纹羊绒流苏装饰围巾/披肩#CA08",
//         "p_price": "2389",
//         "p_imgs": "../img/goods/cs_05.jpg"
//     }
// ]
