define(["index","jquery","cookie"],function(index,$){
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
                 url:"../data/nav2.json",
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
                 url:"../data/nav2.json",
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
                 url:"../data/nav2.json",
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
        // $(".top_right .shop_car_icon").html(JSON.parse($.cookie("goods")).length)
     }

     //筛选动态效果
     function filter(){
       
         //左边复选框的动态效果
       $(".condition .series").click(function(){
           if($(".series_condition").css("display") == "none"){
               $(".series_condition").slideDown(500);
               $(this).html("&#xe601;")
           }else{
            $(".series_condition").slideUp(500);
            $(this).html("&#xe600;")
           }
       })
       $(".condition .season").click(function(){
        if($(".season_condition").css("display") == "none"){
            $(".season_condition").slideDown(500);
            $(this).html("&#xe601;")
        }else{
         $(".season_condition").slideUp(500);
         $(this).html("&#xe600;")
        }
        })
        $(".condition .child").click(function(){
            if($(".child_condition").css("display") == "none"){
                $(".child_condition").slideDown(500);
                $(this).html("&#xe601;")
            }else{
             $(".child_condition").slideUp(500);
             $(this).html("&#xe600;")
            }
        })
        $(".condition .classify").click(function(){
            if($(".classify_condition").css("display") == "none"){
                $(".classify_condition").slideDown(500);
                $(this).html("&#xe601;")
            }else{
             $(".classify_condition").slideUp(500);
             $(this).html("&#xe600;")
            }
        })
        $(".condition .size").click(function(){
            if($(".size_condition").css("display") == "none"){
                $(".size_condition").slideDown(500);
                $(this).html("&#xe601;")
            }else{
             $(".size_condition").slideUp(500);
             $(this).html("&#xe600;")
            }
        })
        $(".condition .money").click(function(){
            if($(".money_condition").css("display") == "none"){
                $(".money_condition").slideDown(500);
                $(this).html("&#xe601;")
            }else{
             $(".money_condition").slideUp(500);
             $(this).html("&#xe600;")
            }
        })

        //右边头部效果
        $(".right_filter").on("click", ".click", function(){
            $(".right_filter .click").removeClass("active")
            $(this).addClass("active iconfont")
        })
     }

     function downloadList(){
        function getParam(name) {
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
            var r = window.location.search.substr(1).match(reg); //匹配目标参数
            if (r != null) return unescape(r[2]); return null;
        }
        var id = getParam("id");
        console.log(id);
        if(id == 0){
            $.ajax({
                type:"get",
                url:"../data/boygirl.json",
                success:function(arr){
                    for(var i = 0; i < arr.length; i++){
                        $(`<a href="goodsDetails.html?id=${arr[i].id}&list=${arr[i].img}">
                        <dl>
                            <dt>
                                <img src="${arr[i].img}" alt="">
                            </dt>
                            <dd>${arr[i].info}</dd>
                            <dd>${arr[i].price}</dd>
                        </dl>
                    </a>`).appendTo(".contright .goodsList")
                    }
                    $(".titlebox .title").find("em").html(arr.length)
                },
                error:function(msg){
                    console.log(msg);
                }
            })
        }
        if(id == 1){
            $.ajax({
                type:"get",
                url:"../data/boygirl.json",
                success:function(arr){
                    for(var i = 0; i < arr.length; i++){
                        $(`<a href="goodsDetails.html?id=${arr[i].id}&list=${arr[i].img}">
                        <dl>
                            <dt>
                                <img src="${arr[i].img}" alt="">
                            </dt>
                            <dd>${arr[i].info}</dd>
                            <dd>${arr[i].price}</dd>
                        </dl>
                    </a>`).appendTo(".contright .goodsList")
                    }
                    $(".titlebox .title").html(`女的 / 踩的 <em>${arr.length}</em>件商品`)
                },
                error:function(msg){
                    console.log(msg);
                }
            })
        }
        if(id == 2){
            $.ajax({
                type:"get",
                url:"../data/clothes.json",
                success:function(arr){
                    for(var i = 0; i < arr.length; i++){
                        $(`<a href="goodsDetails.html?id=${arr[i].id}&list=${arr[i].img}">
                        <dl>
                            <dt>
                                <img src="${arr[i].img}" alt="">
                            </dt>
                            <dd>${arr[i].info}</dd>
                            <dd>${arr[i].price}</dd>
                        </dl>
                    </a>`).appendTo(".contright .goodsList")
                    }
                    $(".titlebox .title").html(`穿的 <em>${arr.length}</em>件商品`)
                },
                error:function(msg){
                    console.log(msg);
                }
            })
        }
        if(id == 3){
            $.ajax({
                type:"get",
                url:"../data/bag.json",
                success:function(arr){
                    for(var i = 0; i < arr.length; i++){
                        $(`<a href="goodsDetails.html?id=${arr[i].id}&list=${arr[i].img}">
                        <dl>
                            <dt>
                                <img src="${arr[i].img}" alt="">
                            </dt>
                            <dd>${arr[i].info}</dd>
                            <dd>${arr[i].price}</dd>
                        </dl>
                    </a>`).appendTo(".contright .goodsList")
                    }
                    $(".titlebox .title").html(`戴的 <em>${arr.length}</em>件商品`)
                },
                error:function(msg){
                    console.log(msg);
                }
            })
        }
     }
 

    return{
        navTab:navTab,
        filter:filter,
        downloadList:downloadList
    }
});