console.log("carts编译成功")

require.config({
    paths:{
        "jquery": "jquery-1.10.1.min",
        "index": "index",
        "tool":"tools",
        "goodsDetails":"goodsDetails",
        "goodsList":"goodsList",
        "login":"login",
        "carts":"carts",
        "cookie":"jquery.cookie"
    },
    shim:{
        "cookie":["jquery"]
    }
})

require(["index","login","carts"], function(index,login,carts){
    // index.show();
    index.popping();
    index.livechat();
    login.code();
    login.reg();
    login.reg_check();
    login.login_check();
    carts.isCont();
    carts.car();
    carts.isCheck();
    carts.shopNum();
    carts.deleteshop();
    carts.payAll();
})