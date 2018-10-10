require(['config'], function () {
  (function () {
    let reg = /[\w]+\.html/  // 获取页面信息

    let visitor = reg.exec(location.href) == null ? 'index.html' : reg.exec(location.href)[0]

    if (visitor) {
      switch (visitor) {
        case 'index.html': 
          // 首页模块
          require(['index', 'islogin'], function (index, log) {
            index.index()
          })
          break
        case 'register.html': 
          // 注册模块
          require(['register'], function (obj) {
            obj.register() // 注册功能
          })
          break
        case 'login.html': 
          // 登录模块
          require(['login'], function (obj) {
            obj.login()
          })
          break
        case 'goods.html': 
          // 商品详情页
          require(['goods'], function (obj) {
            obj.goods()
          })
          break
        case 'cart.html': 
          // 购物车
          require(['cart'], function (obj) {
            obj.cart()
          })
          break
      }
    } else {
      console.log('403-->模块加载失败')
    }
  })()
})
