//定义商品加载模块 根据id 返回数据库中商品信息
// 需要传入商品ID  然后传入回调函数 通过回调函数获取产品详细信息
define("query_product", ["jquery",], function () {
    return {
        "query_p": function (p_id,fn) {
            $.ajax({  //请求数据库数据对页面进行渲染
                url: "http://127.0.0.1/1000phone/sk/project/server/p_query.php",
                data: {
                    p_id: p_id,
                }
            }).then(function (res) {
                fn(res)   //使用回调函数返回查询结果
            })
        }

    }
})