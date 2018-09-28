//注册页面入口
require(["config"], function () {
    require(["register"], function (res) {
        res.init()
    })
})

//登录页面入口