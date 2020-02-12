define(["jquery","cookie"], function($){
    //放大镜效果
        function magGlass(){
            $(".conttop_cen .smallimg").mouseover(function(){
                $(".conttop_left .icon").css("display","none");
                $(".conttop_left .bigimg,.mark").css("display","block")
                $(".conttop_cen").css("marginLeft","205px");
                $(document).mousemove(function(e){
                    var offsetX = e.pageX-450;
                    var offsetY = e.pageY-330;
                    if(offsetX < 0){
                        offsetX = 0
                    }
                    if(offsetX > 379){
                        offsetX = 379
                    }
                    if(offsetY < 0){
                        offsetY = 0;
                    }
                    if(offsetY > 280){
                        offsetY = 280
                    }
                    $(".mark").css({
                        left:offsetX,
                        top:offsetY
                    })
                    $(".bigimg img").css({
                        left:-1.5 * offsetX,
                        top:-1.5*offsetY
                    })
                })
            }).mouseleave(function(){
                $(".conttop_left .icon").css("display","block");
                $(".conttop_left .bigimg,.mark").css("display","none")
                $(".conttop_cen").css("marginLeft","0")
            })
        }
    //点击购买
    function buyNow(){
        $(".buyNow").click(function(){
            alert("购买成功")
        })
    }

    //详情页的数据
    function goodsDetail(){
        function getParam(name) {
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
            var r = window.location.search.substr(1).match(reg); //匹配目标参数
            if (r != null) return unescape(r[2]); return null;
        }
        var id = getParam("id");
        var str = getParam("index")
        var list = getParam("list");
        console.log(id + list);
        console.log(id + str);
        //热卖单品的数据
       
        // console.log(str);
        $.ajax({
            type:"get",
            url:"../data/hotSale.json",
            success:function(arr){
                var boyFoot = arr[0].child;
                var girlFoot = arr[1].child;
                var clothes = arr[2].child;
                var bag = arr[3].child;
                for(var i = 0; i < boyFoot.length; i++){
                    // alert(boyFoot[i].img)
                    // alert(str === boyFoot[i].img)
                    if(id  == boyFoot[i].id && str === boyFoot[i].img){
                       $(`<img src="../${boyFoot[i].img}" alt="">`).appendTo(".smallimg,.bigimg");
                       $(`<h2 class="info">${boyFoot[i].info}</h2>
                       <h2 class="price">${boyFoot[i].price}</h2>`).insertBefore(".smallimg")
                    }
                }
                for(var i = 0; i < girlFoot.length; i++){
                    if(id + str == girlFoot[i].id + girlFoot[i].img){
                       $(`<img src="../${girlFoot[i].img}" alt="">`).appendTo(".smallimg,.bigimg");
                       $(`<h2 class="info">${girlFoot[i].info}</h2>
                       <h2 class="price">${girlFoot[i].price}</h2>`).insertBefore(".smallimg")
                    }
                }
                for(var i = 0; i < clothes.length; i++){
                    if(id + str == clothes[i].id + clothes[i].img){
                       $(`<img src="../${clothes[i].img}" alt="">`).appendTo(".smallimg,.bigimg");
                       $(`<h2 class="info">${clothes[i].info}</h2>
                       <h2 class="price">${clothes[i].price}</h2>`).insertBefore(".smallimg")
                    }
                }
                for(var i = 0; i < bag.length; i++){
                    if(id + str == bag[i].id + bag[i].img){
                       $(`<img src="../${bag[i].img}" alt="">`).appendTo(".smallimg,.bigimg");
                       $(`<h2 class="info">${bag[i].info}</h2>
                       <h2 class="price">${bag[i].price}</h2>`).insertBefore(".smallimg")
                    }
                }
            },
            error:function(msg){
                console.log(msg);
            }
        })
        //新品热鉴数据
        $.ajax({
            type:"get",
            url:"../data/indexList.json",
            success:function(arr){
                var newArr = arr[0].child;
                for(var i = 0; i < newArr.length; i++){
                    if(id + str == newArr[i].id + newArr[i].img){
                        // alert(5)
                        $(`<img src="../${newArr[i].img}" alt="">`).appendTo(".smallimg,.bigimg");
                        $(`<h2 class="info">${newArr[i].info}</h2>
                        <h2 class="price">${newArr[i].price}</h2>`).insertBefore(".smallimg")
                    }
                }
            },
            error:function(msg){
                console.log(msg);
            }
        })
        //商品列表页数据加载
        //商品列表页男女鞋数据加载
        $.ajax({
            type:"get",
            url:"../data/boygirl.json",
            success:function(arr){
               for(var i = 0; i < arr.length; i++){
                   if(id + list == arr[i].id + arr[i].img){
                    $(`<img src="${arr[i].img}" alt="">`).appendTo(".smallimg,.bigimg");
                    $(`<h2 class="info">${arr[i].info}</h2>
                    <h2 class="price">${arr[i].price}</h2>`).insertBefore(".smallimg")
                   }
               }
            },
            error:function(msg){
                console.log(msg);
            }
        })
        //穿的数据加载
        $.ajax({
            type:"get",
            url:"../data/clothes.json",
            success:function(arr){
                for(var i = 0; i < arr.length; i++){
                    if(id + list == arr[i].id + arr[i].img){
                        $(`<img src="${arr[i].img}" alt="">`).appendTo(".smallimg,.bigimg");
                    $(`<h2 class="info">${arr[i].info}</h2>
                    <h2 class="price">${arr[i].price}</h2>`).insertBefore(".smallimg")
                    }
                }
            },
            error:function(msg){
                console.log(msg);
            }
        })
        //戴的数据加载
        $.ajax({
            type:"get",
            url:"../data/bag.json",
            success:function(arr){
                for(var i = 0; i < arr.length; i++){
                    if(id + list == arr[i].id + arr[i].img){
                        $(`<img src="${arr[i].img}" alt="">`).appendTo(".smallimg,.bigimg");
                    $(`<h2 class="info">${arr[i].info}</h2>
                    <h2 class="price">${arr[i].price}</h2>`).insertBefore(".smallimg")
                    }
                }
            },
            error:function(msg){
                console.log(msg);
            }
        })

    }

    //购物车
    function carts(){
        function getParam(name) {
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
            var r = window.location.search.substr(1).match(reg); //匹配目标参数
            if (r != null) return unescape(r[2]); return null;
        }
      /*  alert(getParam("index"))
       alert($(".conttop_right aside:first-of-type  select option:checked").text()) */
       $(".add_carts").click(function(){
           alert('购物车等您哦')
           //获取商品的一些信息
           var imgSrc = getParam('index')?getParam('index'):getParam('list');
           var src;
           if(imgSrc.substring(0,1) == "i"){
               src = "../" + imgSrc;
           }else{
               src = imgSrc;
           }
           var title = $(".conttop_cen h2").html()
           var price = $(".conttop_cen .price").html();
           var size = Number($(".conttop_right aside:first-of-type  select option:checked").text());
           var num = Number($(".conttop_right aside:nth-of-type(2)  select option:checked").text());
        //    alert(imgSrc+title+price+size+num)
        //判断是否是第一次添加
        var first = $.cookie("goods") == null ? true : false;
        if(first){
           
            var arr = [{imgSrc:src,title:title,price:price,size:size,num:num}];
            $.cookie("goods",JSON.stringify(arr),{
                expires:7
            })
        }else{
            //假设没有添加过
            var same = false;
            //不是第一次添加，判断之前是否添加过
            var cookieStr = $.cookie("goods");
            var cookieArr = JSON.parse(cookieStr);
            for(var i = 0; i < cookieArr.length; i++){
                if(cookieArr[i].imgSrc == src){
                    cookieArr[i].num += num;
                    same = true;
                    break;
                } 
            }
            if(!same){
                //如果没有添加过，新增商品数据
                var obj = {imgSrc:src,title:title,price:price,size:size,num:num};
                cookieArr.push(obj);
            }
             //存回cookie
             $.cookie("goods",JSON.stringify(cookieArr),{
                expires:7
            })
            $(".top_right .shop_car_icon").html(JSON.parse($.cookie("goods")).length)
        }
       })
       $(".top_right .shop_car_icon").html(JSON.parse($.cookie("goods")).length)
    //    alert($.cookie("goods"))
      
    }

    return{
        magGlass:magGlass,
        buyNow:buyNow,
        goodsDetail:goodsDetail,
        carts:carts
    }
});