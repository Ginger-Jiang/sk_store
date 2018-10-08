//定义注册模块 包含整个注册功能
// define("register", ["jquery", "md5", "validate", "idcode",], function () {
define("register", ["jquery", "md5", "idcode", ], function () {
    var self = null; //接受this

    //登录的构造函数
    function Register() { //创建构造函数
        self = this;
        return this
    }

    //原型方法 暴露出去 -->里面调用私有方法
    Register.prototype.register = function () {
        verify() //表单校验
    }

    //私有方法-->不暴露出去
    //表单校验功能
    function verify() {
        let statusAyy = []; //判断是否全部填写
        (function () { //用户名校验
            $("[name=uName]").on("blur", function () {
                $.idcode.setCode(); //加载验证码
                let telReg = /0?(13|14|15|18)[0-9]{9}/;
                let emailReg = /\w+((-w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+/;
                let value = $(this).val();
                if (telReg.test(value)) {
                    $(this).removeClass("bordercolor")
                    $(".idcode").addClass("show");
                    $(".idcode").removeClass("hide");
                    $(".idcode a").html("获取手机验证码");
                    $("#errorTxt").addClass("hide");
                    $("#errorTxt").removeClass("show");
                    $("#errorTxt").removeClass("error");
                    name_exists()

                } else if (emailReg.test(value)) {
                    $(this).removeClass("bordercolor")
                    $(".idcode").addClass("show");
                    $(".idcode").removeClass("hide");
                    $(".idcode a").html("获取邮箱验证码");
                    $("#errorTxt").addClass("hide");
                    $("#errorTxt").removeClass("show");
                    $("#errorTxt").removeClass("error");
                    name_exists()
                } else {
                    $(this).addClass("bordercolor") //用户名已存在
                    $(".idcode").addClass("hide");
                    $(".idcode").removeClass("show");
                    $("#errorTxt").addClass("error");
                    $("#errorTxt").removeClass("firstspan");
                    statusAyy = [];
                    statusAyy.push(false);
                }

                $(".verify").on("blur", function () {
                    let reg = /^\S+$/;
                    let val = $(this).val()
                    if (reg.test(val)) {
                        $(this).removeClass("bordercolor")
                        $("#errorTxt").addClass("hide");
                        $("#errorTxt").removeClass("show");;
                        statusAyy = [];
                        statusAyy.push(true);
                    } else {
                        $(this).addClass("bordercolor")
                        $("#errorTxt").addClass("show");
                        $("#errorTxt").removeClass("hide");
                        $("#errorTxt").css("color", "red");
                        $("#errorTxt").html("请输入完整信息");
                        statusAyy = [];
                        statusAyy.push(false);
                    }
                })
            })
        })();
        (function () { //密码校验
            $("[name=uPwd]").on("blur", function () {
                let val = $(this).val();
                let reg = /^[\S]{6,25}$/;
                if (reg.test(val)) {
                    $(this).removeClass("bordercolor")
                    $(this).parents("p").find("span").addClass("hide")
                    $(this).parents("p").find("span").removeClass("error");
                    statusAyy = [];
                    statusAyy.push(true);
                } else if (val.length <= 0 || val == "") {
                    $(this).addClass("bordercolor")
                    $(this).parents("p").find("span").addClass("error")
                    $(this).parents("p").find("span").removeClass("hide")
                    $(this).parents("p").find("span").html("请输入密码!")
                    statusAyy = [];
                    statusAyy.push(false);
                } else {
                    $(this).addClass("bordercolor")
                    $(this).parents("p").find("span").addClass("error")
                    $(this).parents("p").find("span").removeClass("hide")
                    $(this).parents("p").find("span").html("密码的长度只能在6-25位之间！")
                    statusAyy = [];
                    statusAyy.push(false);
                }
            })
        })();
        (function () { //确认密码校验
            $("[name=uPwd1]").on("blur", function () {
                let val = $(this).val()
                let pwd = $("[name=uPwd]").val();

                if (val == pwd) {
                    $(this).removeClass("bordercolor")
                    $(this).parents("p").find("span").addClass("hide")
                    $(this).parents("p").find("span").removeClass("error")
                    statusAyy = [];
                    statusAyy.push(true);
                } else {
                    $(this).addClass("bordercolor")
                    $(this).parents("p").find("span").addClass("error")
                    $(this).parents("p").find("span").removeClass("hide")
                    $(this).parents("p").find("span").html("两次密码不一致!")
                    statusAyy = [];
                    statusAyy.push(false);
                }
            })
        })();
        (function () { //邀请码校验
            $("[name=uYqm]").on("click", function () {
                let
                if ($(this).prop("checked")) {
                    $("#yqm").removeClass("hide")
                    $("#yqm").addClass("show")
                } else {
                    $("#yqm").addClass("hide")
                    $("#yqm").removeClass("show")
                }
            })
        })();
        (function () { //提交表单
            $("#sk_re_form").on("submit", function () {
                if (statusAyy[0]) {
                    $("#errorTxt").addClass("firstspan");
                    $("#errorTxt").removeClass("error");
                    $("#errorTxt").html("");
                    if ($(".error").length == 0 && $.idcode.validateCode()) { //全部正确
                        submitInfo();
                    } else if (!$.idcode.validateCode()) {
                        $("#errorTxt").html("用户名或验证码错误");
                        $("#errorTxt").addClass("error");
                        $("#errorTxt").removeClass("firstspan");
                        $("#errorTxt").removeClass("hide");
                    } else {
                        $("#errorTxt").html("信息填写不正确");
                        $("#errorTxt").addClass("error");
                        $("#errorTxt").removeClass("firstspan");
                        $("#errorTxt").removeClass("hide");
                    }
                } else {
                    $("#errorTxt").html("信息填写不完整");
                    $("#errorTxt").addClass("error");
                    $("#errorTxt").removeClass("firstspan");
                }
                return false
            })
        })();
    }

    // 注册成功
    function submitInfo() {
        let pwdVal = $.md5($("[name=uPwd]").val());
        $.ajax({
            url: "../../server/register.php",
            // url: "http://127.0.0.1/1000phone/sk/project/server/register.php",
            header: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            data: {
                uName: $("[name=uName]").val(),
                uPwd: pwdVal,
            },
            type: "post",

        }).then(function (res) {
            if (res == true) {
                alert("注册成功,点击确认跳转至首页");
                window.location.href = "../index.html";
                // window.location("../index.html")
            } else {
                alert("注册失败")
            }
        })
    }

    // 验证用户名是否存在
    function name_exists() {
        $.ajax({
            url: "../../server/name_exists.php",
            // url: "http://127.0.0.1/1000phone/sk/project/server/name_exists.php",
            data: {
                uName: $("[name=uName]").val(),
            }
        }).then(function (res) {

            if (res == true) {
                statusAyy = [];
                statusAyy.push(true);
                $("#errorTxt").addClass("hide");
                $("#errorTxt").html("")
                $("#errorTxt").removeClass("show");
                $("#errorTxt").removeClass("error");
            } else {
                $("#errorTxt").addClass("error");
                $("#errorTxt").html("用户名已存在")
                $("#errorTxt").removeClass("firstspan");
                $("#errorTxt").removeClass("hide");
                $(this).addClass("bordercolor")
                statusAyy = [];
                statusAyy.push(false);
            };
        })
    }

    //唯一出口-->返回一个实例化对象-->不暴露的私有方法
    var register = new Register()
    return register

})