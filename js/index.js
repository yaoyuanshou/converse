define(["jquery"], function($){
    /* function show(){
        alert(2);
    } */

   /*  return{
        show:show
    } */

    // top部分弹出界面
    function popping(){
        $("#top_login,.login_icon").click(function(){
            if($("#hidden_top_login").css("display") == "none"){
                $("#hidden_top_login").slideDown(800)
            }else{
                $("#hidden_top_login").slideUp(800)
            }
        })
        $("#top_reg").click(function(){
            if($(".register").css("display") == "none"){
                $(".register").slideDown(800)
            }else{
                $(".register").slideUp(800)
            }
        })
        $(".search_icon,.search_close").click(function(){
            if($(".search").css("display") == "none"){
                $(".search").slideDown(800)
            }else{
                $(".search").slideUp(800)
            }
        })

       
        
    }

    // nav选项卡
    function navTab(){
       $(".nav a").mouseenter(function(){
        $(".navlists").stop(true).fadeIn(330).mouseover(function(){
            $(this).stop();
        }).mouseout(function(){
            $(this).stop(true).fadeOut(330)
        })

        if($(this).html() == "男的"){
            $.ajax({
                type:"get",
                url:"data/nav.json",
                success:function(arr){
                    var arrBoy = arr[0].nav;
                    var str = "";
                    for(var i = 0;i < arrBoy.length;i++){
                        str += ` <dl>
                        <dt>
                            <img src="${arrBoy[i].img}">
                        </dt>
                        <dd>${arrBoy[i].info}</dd>
                    </dl>`
                    }
                    $(".navlists .cont").html(str)
                },
                error:function(msg){
                    console.log(msg)
                }
            })
        }
        if($(this).html() == "女的"){
            $.ajax({
                type:"get",
                url:"data/nav.json",
                success:function(arr){
                    var arrGirl = arr[1].nav;
                    var str = "";
                    for(var i = 0;i < arrGirl.length;i++){
                        str += ` <dl>
                        <dt>
                            <img src="${arrGirl[i].img}">
                        </dt>
                        <dd>${arrGirl[i].info}</dd>
                    </dl>`
                    }
                    $(".navlists .cont").html(str)
                },
                error:function(msg){
                    console.log(msg)
                }
            })
        }
        if($(this).html() == "儿童"){
            $.ajax({
                type:"get",
                url:"data/nav.json",
                success:function(arr){
                    var arrChild = arr[2].nav;
                    var str = "";
                    for(var i = 0;i < arrChild.length;i++){
                        str += ` <dl>
                        <dt>
                            <img src="${arrChild[i].img}">
                        </dt>
                        <dd>${arrChild[i].info}</dd>
                    </dl>`
                    }
                    $(".navlists .cont").html(str)
                },
                error:function(msg){
                    console.log(msg)
                }
            })
        }
        if($(this).html() == "联名合作款" || $(this).html() == "店铺分布"){
            $(".navlists").css("display", "none")
        }
       }).mouseleave(function(){
           $(".navlists").stop(true).fadeOut(330)
       })
    }

    // 聊天动画
    function liveChat(){
            window.onscroll = function(){
                startMove(getiTarget());
        }

         window.onresize = function(){
            startMove(getiTarget());
        }

        //动画函数
        var timer = null;
        function startMove(iTarget){
            var liveChat = document.getElementById("livechat");
            clearInterval(timer);
            timer = setInterval(function(){
                var speed = (iTarget - liveChat.offsetTop) / 7;
                speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);

                if(liveChat.offsetTop == iTarget){
                     clearInterval(timer);
                }else{
                    liveChat.style.top = liveChat.offsetTop + speed + "px";
                }
            },30)

        }
         //封装函数使div处于中间
         function getiTarget(){
            var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
            var windowHeight = document.documentElement.clientHeight || document.body.clientHeight;
            var liveChat = document.getElementById("livechat");

            var iH = scrollTop + (windowHeight - liveChat.offsetHeight) / 2;
            return parseInt(iH);
        }
        
    }

    //文字轮播
    function wordBanner(){
        var span = $(".bannertop span");
        var index = 0;
        setInterval(function(){
            index++;
            span.removeClass("wordnow").eq(index).addClass("wordnow");
            if(index == span.size()){
                index = 0;
                span.removeClass("wordnow").eq(0).addClass("wordnow")
            }
        },2000)
        
    }

    //轮播图
    function banner(){
        var iNow = 0;
        var timer = null;
        var img = null;
        //banner图的数据请求
       $.ajax({
           type:"get",
           url:'data/banner.json',
           success:function(arr){
               for(var i = 0; i < arr.length; i++){
                   $(`<img src="${arr[i].img}" alt="">`).appendTo(".banner .imgbox");
                   $(`<span>${arr[i].info}</span>`).appendTo(".bannerInfoBox .bannerInfo")
               }
            
           },
           error:function(msg){
            alert(msg)
           }
       })

       //定时器
       timer = setInterval(function(){
           iNow++;
           tab();
       },2000)

       //图片切换
       function tab(){
           if(!img){
               $(".banner").find("img");
           }
           if(iNow == 5){
               iNow = 0
           }

           $(".banner img").hide().css("opacity", 0.2).eq(iNow).show().animate({opacity:1},500)
           $(".bannerInfo span").removeClass("active").eq(iNow).addClass("active");
       }

       //鼠标移入移出
       $(".banner .imgbox").mouseenter(function(){
        clearInterval(timer)
    }).mouseleave(function(){
        timer = setInterval(function(){
            iNow++;
            tab();
        },2000)
    })

    //点击下排按钮出现相应图片
    $(".bannerInfo").on("click", "span", function(){
        iNow = $(this).index();
        tab();
    })
    //添加上一张下一张事件
    $(".bannerleft").click(function(){
        iNow--;
        if(iNow == 0){
            iNow = 5;
        }
        tab();
    })
    $(".bannerright").click(function(){
        iNow++;
        if(iNow == 5){
            iNow = 0;
        }
        tab();
    })
      

    }

    // 热卖单品数据下载
    function hotsale(){
        $.ajax({
            type:"get",
            url:"data/hotSale.json",
            success:function(arr){
                for(var i = 0; i < arr.length; i++){
                    var boyFoot = arr[0].child;
                    var girlFoot = arr[1].child;
                    var wear = arr[2].child;
                    var bag = arr[3].child;
                    $(`<a href="html/goodsList.html?id=${arr[i].id}"><div><span href="">${arr[i].title}</span><img src="${arr[i].img}" alt=""></div></a>`).appendTo($(".contnav"))
                }
                for(var j = 0; j < boyFoot.length;j++){
                    $(`<dl>
                    <dt>
                        <img src="${boyFoot[j].img}">
                    </dt>
                    <dd>${boyFoot[j].info}</dd>
                    <dd>${boyFoot[j].price}</dd>
                </dl>`).appendTo(".cont_list")
                }
                $(".cont .contnav").on("mouseenter", "a", function(){
                    var left = $(".brand_container .brand_bg").position().left;
                    $(".cont_list").empty()
                    if($(this).index() == 0){ 
                        for(var j = 0; j < boyFoot.length;j++){
                            $(`<a href="html/goodsDetails.html?id=${boyFoot[j].id}&index=${boyFoot[j].img}"><dl>
                            <dt>
                                <img src="${boyFoot[j].img}">
                            </dt>
                            <dd>${boyFoot[j].info}</dd>
                            <dd>${boyFoot[j].price}</dd>
                        </dl></a>`).fadeIn(500).appendTo(".cont_list")
                        } 
                        $(".cont_list_block").html("查看所有男的踩的最新商品<span>></span>").click(function(){
                            $(this).parent().attr("href","html/goodsList.html?id=0")
                        })
                        $(".brand_container .brand_bg").animate({left:130},500)
                    }
                    if($(this).index() == 1){
                        for(var j = 0; j < girlFoot.length;j++){
                            $(`<a href="html/goodsDetails.html?id=${girlFoot[j].id}&index=${girlFoot[j].img}"><dl>
                            <dt>
                                <img src="${girlFoot[j].img}">
                            </dt>
                            <dd>${girlFoot[j].info}</dd>
                            <dd>${girlFoot[j].price}</dd>
                        </dl></a>`).fadeIn(500).appendTo(".cont_list")
                        }
                       $(".cont_list_block").html("查看所有女的踩的最新商品<span>></span>").click(function(){
                        $(this).parent().attr("href","html/goodsList.html?id=1")
                       })
                       $(".brand_container .brand_bg").animate({left:400},500)
                    }
                    if($(this).index() == 2){
                        for(var j = 0; j < wear.length;j++){
                            $(`<a href="html/goodsDetails.html?id=${wear[j].id}&index=${wear[j].img}"><dl>
                            <dt>
                                <img src="${wear[j].img}">
                            </dt>
                            <dd>${wear[j].info}</dd>
                            <dd>${wear[j].price}</dd>
                        </dl></a>`).fadeIn(500).appendTo(".cont_list")
                        }
                        $(".cont_list_block").html("查看所有穿的最新商品<span>></span>").click(function(){
                            $(this).parent().attr("href","html/goodsList.html?id=2")
                        })
                        $(".brand_container .brand_bg").animate({left:670},500)
                    }
                    if($(this).index() == 3){
                        for(var j = 0; j < bag.length;j++){
                            $(`<a href="html/goodsDetails.html?id=${bag[j].id}&index=${bag[j].img}"><dl>
                            <dt>
                                <img src="${bag[j].img}">
                            </dt>
                            <dd>${bag[j].info}</dd>
                            <dd>${bag[j].price}</dd>
                        </dl></a>`).fadeIn(500).appendTo(".cont_list")
                        }
                        $(".cont_list_block").html("查看所有戴的最新商品<span>></span>").click(function(){
                            $(this).parent().attr("href","html/goodsList.html?id=3")
                        })
                        $(".brand_container .brand_bg").animate({left:950},500)
                    }
                })
            },
            error:function(msg){
                console.log(msg);
            }
        })
    }

    //新品热鉴数据加载
    function newSale(){
        $.ajax({
            type:"get",
            url:"data/indexList.json",
            success:function(arr){
                var newSale = arr[0].child;
                var stressArr = arr[1].child;
                var coolArr = arr[2].child;
                for(var i = 0; i < newSale.length; i++){
                    $(`<a href="html/goodsDetails.html?id=${newSale[i].id}&index=${newSale[i].img}"><dl>
                    <dt>
                        <img src="${newSale[i].img}">
                    </dt>
                    <dd>${newSale[i].info}</dd>
                    <dd>${newSale[i].price}</dd>
                </dl></a>`).appendTo(".newsale_list")
                } 
            },
            error:function(msg){
                console.log(msg);
            }
        })

    }
    

    return{
        popping:popping,
        navTab:navTab,
        livechat:liveChat,
        wordBanner:wordBanner,
        banner:banner,
        hotsale:hotsale,
        newSale:newSale
    }
})