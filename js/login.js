//定义注册模块 包含整个注册功能
define("register", ["jquery", "md5", "validate", "idcode"], function () {







    return {
        init: function () {
            console.log($.md5("123"))
        }
    }
    })