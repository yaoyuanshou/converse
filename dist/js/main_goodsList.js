console.log("goodsList执行成功")

require.config({
    paths:{
        "jquery": "jquery-1.10.1.min",
        "index": "index",
        "goodsList":"goodsList",
        "cookie":"jquery.cookie"
    },
    shim:{
        "cookie":["jquery"]
    }
})

require(["index","goodsList"], function(index,goodsList){
    index.popping();
    goodsList.navTab();
    index.livechat();
    goodsList.filter();
    goodsList.downloadList()
})