console.log("goodsDetils编译成功")

require.config({
    paths:{
        "jquery": "jquery-1.10.1.min",
        "index": "index",
        "tool":"tools",
        "goodsDetails":"goodsDetails",
        "goodsList":"goodsList",
        "login":"login",
        "cookie":"jquery.cookie"
    },
    shim:{
        "cookie":["jquery"]
    }
})

require(["index","goodsDetails","goodsList","login"], function(index,goodsDetails,goodsList,login){
    // index.show();
    index.popping();
    goodsList.navTab();
    index.livechat();
    goodsDetails.magGlass();
    goodsDetails.buyNow();
    goodsDetails.goodsDetail();
    goodsDetails.carts();
    login.code();
    login.reg();
    login.reg_check();
    login.login_check()
})