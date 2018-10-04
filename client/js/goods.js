//商品详情页
//判断是否登录-->显示用户名或不显示
//未登录点击购物车就保存至cookie中
//已登录就保存到数据库中
//
//调用p_.list获取数据库中商品信息  对比用户点击链接的id  动态生成详情页的商品内容

define("goods", ["jquery"], function () {
    //全局this
    var self = null

    //自定义构造函数
    function Goods() {
        self = this;
        this.status = false;
        return this
    };

    //给构造函数添加原型方法
    Goods.prototype.goods = function () {
        status1()
    };

    //判断是否登录
    (function () {
        $.ajax({
            type: "post",
            url: "http://127.0.0.1/1000phone/sk/project/server/islogin.php",
        }).then(function (res) {
            //登录了-->更改上面显示信息
            if (res.status == 200) {
                //更改状态 并改变最上方显示用户名
                $("#gs_hd > div.login > div.top > ul > li:nth-child(1) > a:nth-child(1)").html(res.data.u_name);
                $("#gs_hd > div.login > div.top > ul > li:nth-child(1) > a:nth-child(2)").remove();
                loniged() //保存至数据库
            } else {
                notloniged()  //保存至cookie
            }
        })
    })();


    // 动态加载页面数据
    (function () {
        let reg = /[\d]$/ //获取页面信息 -->id=1
        let p_id = reg.exec(location.href) == null ? "goods.html" : reg.exec(location.href)[0];
        $.ajax({
            url: "http://127.0.0.1/1000phone/sk/project/server/p_query.php",
            data: {
                p_id: p_id,
            }
        }).then(function (res) {
            // p_id: 2
            // p_imgs: "../img/goods/cs_02.jpg"
            // p_name: "DK UGG/DK UGG平跟鞋 Rosalind 丝光牛反皮 尖头珍珠跟单鞋"
            // p_price: "469"
            $("#gs_content > div.contents > div.info_l > img").attr("src", res[0].p_imgs);
            $("#gs_content > div.contents > div.infog_r > div.name > h2").html(res[0].p_name);
            $("#gs_content > div.contents > div.infog_r > div.price > h2").html(`一口价:${res[0].p_price}`);
        })
    })();



    //根据用户登录状态判断是加入购物车还是保存至cookie
    function loniged() {
        console.log(self.status)
        //登录了
        if (status) {
            console.log("已登录")
        } else {
            console.log("没有登录")
        }
    };

    //未登录-->保存至cookie
    function notloniged() {
        console.log(self.status)
        //登录了
        if (status) {
            console.log("已登录")
        } else {
            console.log("没有登录")
        }
    };


    //模块出口
    let goods = new Goods();
    return goods;


});