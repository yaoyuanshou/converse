console.log("编译成功")

require.config({
    paths:{
        "jquery": "jquery-1.10.1.min",
        "index": "index",
        "tool":"tools",
        "login":"login"
    },
    shim:{

    }
})

require(["index","login"], function(index, login){
    // index.show();
    index.popping();
    index.navTab();
    index.livechat();
    index.wordBanner();
    index.banner();
    index.hotsale();
    index.newSale();
    login.code();
    login.reg();
    login.reg_check();
    login.login_check()
})