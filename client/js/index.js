//首页模块 包含整个首页交互功能

define("index", ["jquery", "islogin"], function ($, log) {
    //构造函数
    function Index() {}

    //原型方法
    Index.prototype.index = function () {
        //判断是否登录
        log.islogin(function (res) {
            if (res.status == 200) {
                $("#sk_hd > div.login > div.top > ul > li:nth-child(1) > a:nth-child(1)").html(res.data.u_name);
                $("#sk_hd > div.login > div.top > ul > li:nth-child(1) > a:nth-child(2)").remove();
                sessionStorage.setItem("userinfo", JSON.stringify(res));
            }
        });
    };

    //顶部轮播图
    (function t_banner() {
        // 鼠标进入停止
        $("#sk_banner").hover(function () {
            clearInterval(t_timer)
            $("#sk_banner > div").animate({
                opacity: 1
            })
        }, function () {
            t_timer = setInterval(auto_t_banner, 2500)
            $("#sk_banner > div").animate({
                opacity: 0
            })
        })

        // 左右点击轮播
        $("#sk_banner > div.right").on("click", function () {
            (img_num++);
            if (img_num == 7) {
                img_num = 0
            }
            $("#sk_banner > ul > li").eq(img_num).animate({
                opacity: 1
            }).siblings("li").animate({
                opacity: 0
            })
            $("#sk_banner > ol > li").eq(img_num).css("background", "#f19108").siblings("li").css("background", "#ccc")
        });
        $("#sk_banner > div.left").on("click", function () {
            if (img_num == 0) {
                img_num = 7
            }
            (img_num--);
            $("#sk_banner > ul > li").eq(img_num).animate({
                opacity: 1
            }).siblings("li").animate({
                opacity: 0
            })
            $("#sk_banner > ol > li").eq(img_num).css("background", "#f19108").siblings("li").css("background", "#ccc")
        });

        //轮播定时器
        let t_timer = setInterval(auto_t_banner, 2500)
        let img_num = 0;

        // 自动轮播函数
        function auto_t_banner() {
            img_num++
            if (img_num == 7) {
                img_num = 0
            }
            $("#sk_banner > ul > li").eq(img_num).animate({
                opacity: 1
            }).siblings("li").animate({
                opacity: 0
            })
            $("#sk_banner > ol > li").eq(img_num).css("background", "#f19108").siblings("li").css("background", "#ccc")
        }

        // 点击小点切换轮播
        $("#sk_banner > ol > li").on("click", function () {
            img_num = $(this).index()
            $("#sk_banner > ul > li").eq(img_num).animate({
                opacity: 1
            }).siblings("li").animate({
                opacity: 0
            })
            $("#sk_banner > ol > li").eq(img_num).css("background", "#f19108").siblings("li").css("background", "#ccc")
        })

    })();

    //底部轮播图
    (function b_banner() {
        $("#sk_bot_banner > div.like > div.list > ul").hover(function () {
            clearInterval(b_timer);
            $("#sk_bot_banner > div.like > div.left").animate({
                opacity: 1
            });
            $("#sk_bot_banner > div.like > div.right").animate({
                opacity: 1
            });
        }, function () {
            b_timer = setInterval(auto_t_banner, 2000)
            $("#sk_bot_banner > div.like > div.left").animate({
                opacity: 0
            });
            $("#sk_bot_banner > div.like > div.right").animate({
                opacity: 0
            });
        })

        // 左右点击轮播
        // $("#sk_bot_banner > div.like > div.right").on("click", function () {
        //     (img_num++);
        //     if (img_num == 5) {
        //         img_num = 0
        //     }
        //     $("#sk_bot_banner > div.like > div.list > ul").animate({
        //         left: -img_num * 1200,
        //     })
        //     $("#sk_bot_banner > div.like > div.pointer > ol > li").eq(img_num).css("background", "#f19108").siblings("li").css("background", "#ccc")
        // });
        // $("#sk_banner > div.left").on("click", function () {
        //     (img_num--);
        //     if (img_num == 5) {
        //         img_num = 0
        //     }
        //     $("#sk_bot_banner > div.like > div.list > ul").animate({
        //         left: -img_num * 1200,
        //     })
        //     $("#sk_bot_banner > div.like > div.pointer > ol > li").eq(img_num).css("background", "#f19108").siblings("li").css("background", "#ccc")
        // });

        // 指示器轮播
        $("#sk_bot_banner > div.like > div.pointer > ol > li").on("click", function () {
            img_num = $(this).index;
            $("#sk_bot_banner > div.like > div.list > ul").animate({
                left: -img_num * 1200,
            })
        })


        //轮播定时器
        let b_timer = setInterval(auto_t_banner, 2000)
        let img_num = 0;
        let dot_num = 0;

        // 自动轮播函数
        function auto_t_banner() {
            img_num++
            if (img_num == 6) {
                img_num = 1
                $("#sk_bot_banner > div.like > div.list > ul").css({
                    left: 0,
                })
            }
            $("#sk_bot_banner > div.like > div.list > ul").animate({
                left: -img_num * 1200,
            })

            dot_num++
            if (dot_num == 5) {
                dot_num = 0
            }
            $("#sk_bot_banner > div.like > div.pointer > ol > li").eq(dot_num).css("background", "#f19108").siblings("li").css("background", "#ccc");

        }
    })();

    // 导航
    (function () {
        $("#sk_nav > div.nav_list > ul > li").hover(function () {
            $(this).find(".container>.nav-unfold").addClass("show").siblings("li>.container>.nav-unfold").addClass("hide")
        }, function () {
            $("#sk_nav > div.nav_list > ul > li").find(".container>.nav-unfold").removeClass("show")
        })
    })();

    // 动态商品数据
    // (function () {
    //     $.ajax({
    //         url: "http://127.0.0.1/1000phone/sk/project/server/p_list.php",
    //         type: "post",
    //         success: function (res) {
    //             // console.log(res);
    //             res.forEach((ele, index) => {
    //                 var str =
    //                     `<li data-info=${ele.p_id}>
    //                         <a href="#" >
    //                             <img src="${ele.p_imgs}" alt="">
    //                             <h3>${ele.p_name}</h3>
    //                         </a>
    //                     </li>`

    //                 $("ul").append(str);
    //             });

    //             $("li").on("click", function () {

    //                 console.log($(this).data().info)
    //             })
    //         }
    //     })
    // })();

    //出口
    let index = new Index();
    return index

});