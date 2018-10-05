//商品详情页
//判断是否登录-->显示用户名或不显示
//未登录点击购物车就保存至cookie中
//已登录就保存到数据库中
//
//调用p_.list获取数据库中商品信息  对比用户点击链接的id  动态生成详情页的商品内容

define("goods", ["jquery", "query_product", "cookie"], function ($, qp) {
    //全局this
    let self = null;
    let status = sessionStorage.getItem("userinfo"); //获取sessionStorage信息 -->用户信息
    let reg = /[\d]$/ //获取点击商品的商品id信息 -->id=1
    let u_p_id = reg.exec(location.href) == null ? "goods.html" : reg.exec(location.href)[0]; //获取产品id

    //自定义构造函数
    function Goods() {
        self = this;
        this.status = false;
        return this
    };

    //给构造函数添加原型方法
    Goods.prototype.goods = function () {
        loading();
    };

    //判断是否登录
    (function () {
        // $.ajax({
        //     type: "post",
        //     url: "http://127.0.0.1/1000phone/sk/project/server/islogin.php",
        // }).then(function (res) {
        //     //登录了-->更改上面显示信息
        if (status != null) {
            //更改状态 并改变最上方显示用户名
            $("#gs_hd > div.login > div.top > ul > li:nth-child(1) > a:nth-child(1)").html((JSON.parse(status)).data.u_name);
            $("#gs_hd > div.login > div.top > ul > li:nth-child(1) > a:nth-child(2)").remove();
        }
        // })
    })();


    // 动态加载页面数据
    function loading() {
        // $.ajax({  //请求数据库数据对页面进行渲染
        //     url: "http://127.0.0.1/1000phone/sk/project/server/p_query.php",
        //     data: {
        //         u_p_id: u_p_id,
        //     }
        // }).then(function (res) {
        qp.query_p(u_p_id, function (res) {
            $("#gs_content > div.contents > div.info_l > img").attr("src", res[0].p_imgs);
            $("#gs_content > div.contents > div.infog_r > div.name > h2").html(res[0].p_name);
            $("#gs_content > div.contents > div.infog_r > div.price > h2").html(`一口价:${res[0].p_price}`);
        })
        // u_p_id: 2
        // p_imgs: "../img/goods/cs_02.jpg"
        // p_name: "DK UGG/DK UGG平跟鞋 Rosalind 丝光牛反皮 尖头珍珠跟单鞋"
        // p_price: "469"
        // $("#gs_content > div.contents > div.info_l > img").attr("src", res[0].p_imgs);
        // $("#gs_content > div.contents > div.infog_r > div.name > h2").html(res[0].p_name);
        // $("#gs_content > div.contents > div.infog_r > div.price > h2").html(`一口价:${res[0].p_price}`);
        // })
    };



    //根据用户登录状态判断是加入购物车还是保存至cookie
    (function () {
        let count = 0;
        if (status == null) { //status {"status":200,"msg":"欢迎您","data":{"u_id":"57","u_name":"346600397@qq.com","u_pwd":"4297f44b13955235245b2497399d7a93","u_tel":null,"u_email":null,"u_headpic":null}}

            //未登录  保存至cookie
            $("#joinCart").on("click", function () {
                // 读取cookie 查找商品是否加入过
                let cokCart = JSON.parse($.cookie("cart") || "[]");

                let exists = false; //默认cookie中没有
                // 遍历cookie 判断是否存在
                cokCart.forEach((ele, index) => {
                    if (ele.p_id == u_p_id) { //如果已存在
                        exists = true;
                        ele.num += 1;
                    }
                });
                //如果cookie中没有加入过此商品
                if (exists == false) {
                    cokCart.push({
                        num: 1,
                        p_id: u_p_id
                    })
                }
                $.cookie("cart", JSON.stringify(cokCart), {
                    expires: 7
                });
            })
        } else {
            //登录了  保存至数据库
            $("#joinCart").on("click", function () {
                // console.log(sessionStorage.getItem("userinfo"))
                // {"status":200,"msg":"欢迎您","data":{"u_id":"57","u_name":"346600397@qq.com","u_pwd":"4297f44b13955235245b2497399d7a93","u_tel":null,"u_email":null,"u_headpic":null}}
                let info = {
                    p_id: u_p_id,
                    u_id: JSON.parse(status).data.u_id,
                    p_num: 1,
                };
                $.ajax({
                    type: "post",
                    url: "http://127.0.0.1/1000phone/sk/project/server/addCart.php",
                    data: info,
                    dataType: "JSON",
                    success: function (res) {
                        if (res.status == 200) {
                            console.log(res)
                        }
                    }
                });
            })
        }
    })();

    //模块出口
    let goods = new Goods();
    return goods;


});