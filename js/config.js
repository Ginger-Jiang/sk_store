//模块配置文件
define("config", [], function () {
    require.config({
        urlArgs: "V1.0.1",
        baseUrl: "./js/",
        waitSeconds: 0,
        paths: {
            //插件
            "jquery": ["lib/jquery/jquery-1.11.1.min", "http://ajax.googleapis.com/ajax/libs/jquery/1.2.6/jquery.min"],
            "md5": ["lib/md5/jquery.md5"], //非模块
            "validate": ["lib/jquery-validation/jquery.validate"],
            "cookie": ["lib/jquery-cookie/jquery.cookie"], //非模块
            "idcode": ["lib/idcode/jquery.idcode"], //非模块
            'bootstrap': ["lib/bootstrap/js/bootstrap"],

            //功能
            "register": ["register"], //-->注册模块

        },
        shim: {
            // "register": {
            //     deps: ["css!../css/register"],
            // },
            "md5": {
                deps: ["jquery"],
            },
            "cookie": {
                deps: ["jquery"],
                // //非模块也暴露
                // exports:"cale",
            },
            "idcode": {
                deps: ["jquery"],
            },
            // "bootstrap": {
            //     deps: ["css!lib/bootstrap/css/bootstrap.css"],
            // }
        },
        map: {
            '*': {
                'css': ["lib/require/css"] //帮助我们导入 css.js文件
            }
        },
    })
})