//定义登录模块 包含整个登录功能

define("login", ["jquery", "md5", "idcode"], function () {

    //登录构造函数
    function Login() { }

    //原型方法
    Login.prototype.login = function () {
        tabLogin()
    }

    // 切换登录方式
    function tabLogin() {
        $("#sk_lg_form>h3>span").on("click", function () {
            $.idcode.setCode(); //加载验证码
            let index = $(this).index();
            $(this).addClass("current").siblings().removeClass("current");
            $(".tabLogin").eq(index).addClass("show").removeClass("hide").siblings(".tabLogin").addClass("hide").removeClass("show");
            if ($("#sk_lg_form>h3>span").last("span").attr("class")) {
                $("#textts").addClass("hide").removeClass("show")
            }
        })
    };

    // 表单效果
    (function impoet() {
        $("#sk_lg_form [type=text]").on("focus", function () {
            $(this).addClass("focus")
            $("#lastname").addClass("hide");
        })
        $("#sk_lg_form [type=text]").on("blur", function () {
            $(this).removeClass("focus")
        })
    })();

    // 表单验证
    function validate() {
        let reg = /^\S+$/;
        let status = true;
        if (!reg.test($("[name=uName]").val()) && !reg.test($("[name=uPwd]").val())) {
            $("#lastname").html("请输入用户名");
            $("#lastname").addClass("show");
            $("#lastname").removeClass("hide");
            status = false;
        } else if (reg.test($("[name=uName]").val()) && !reg.test($("[name=uPwd]").val())) {
            $("#lastname").html("请输入密码");
            $("#lastname").addClass("show");
            $("#lastname").removeClass("hide");
            status = false;
        } else if (!reg.test($("[name=uName]").val()) && reg.test($("[name=uPwd]").val())) {
            $("#lastname").html("请输入用户名");
            $("#lastname").addClass("show");
            $("#lastname").removeClass("hide");
            status = false;
        } else if ($.idcode.validateCode() != true) {
            $("#lastname").html("验证码错误");
            $("#lastname").addClass("show");
            $("#lastname").removeClass("hide");
            status = false;
        } else {
            $("#lastname").addClass("hide");
            $("#lastname").removeClass("show");
            status = true;
        }

        if (status == true) {
            return true
        } else {
            $("#lastname").html("信息填写错误");
            $("#lastname").addClass("show");
            $("#lastname").removeClass("hide");
            status = false;
        }
    };

    // 表单提交
    (function submit() {
        $("#sk_lg_form").on("submit", function () {
            let pwd = $.md5($(this)[0].uPwd.value);

            if (validate() == true) {
                $.ajax({
                    type: "post",
                    url: "http://127.0.0.1/1000phone/sk/project/server/login.php",
                    data: {
                        uName: $(this)[0].uName.value,
                        uPwd: pwd,
                    },
                    success: function (res) {
                        if (res.status == 200) {
                            console.log(res)
                            window.location="../index.html"
                        } else {
                            $("#lastname").html("用户名或密码错误");
                            $("#lastname").addClass("show");
                            $("#lastname").removeClass("hide");
                        }
                    }
                });
            }
            return false
        })
    })();

    //模块出口
    let login = new Login();
    return login;
})