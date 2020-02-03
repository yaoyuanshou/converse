define(["jquery","cookie"],function($){
    //页面有无商品所加载出的内容
    function isCont(){
        if(!$.cookie("goods")){
            $(".cont .car_null").css("display","block")
            $(".cont .shopcont").css("display","none")
        }else{
            $(".cont .car_null").css("display","none")
            $(".cont .shopcont").css("display","block")
        }
    }
    //随机出现词语
    function randomWord(){
        var arr = ["白色","黑色","蓝色","绿色","彩色","红色","紫色","橙色",];
        var act =arr[Math.floor(Math.random()*arr.length)];
        return act;
    }

    //页面加载商品
    function car(){
        var cookieStr = $.cookie("goods");
        var cookieArr = JSON.parse(cookieStr);
        var str = "";
        for(var i = 0; i < cookieArr.length; i++){
            var src = "";
            if(cookieArr[i].imgSrc.substring(0,1) == "i"){
                src = "../" + cookieArr[i].imgSrc
            }else{
                src=cookieArr[i].imgSrc;
            }
            str += `<div class="cartbox">
            <input type="checkbox" id="" name="bechecked">
            <div class="imgbox"><img src="${src}" alt=""></div>
            <div class="infobox">
                <h3>${cookieArr[i].title}</h3>
                <p>型号：${parseInt(Math.random() * 100000)}</p>
                <p>颜色: ${randomWord()}</p>
                <p>尺码：${cookieArr[i].size}</p>
            </div>
            <div class="optionbox">
                <i class="iconfont">&#xe655;
                    <em>编辑</em></i><i class="iconfont delete">&#xe614;
                        <em>删除</em></i>
                        <p class="price">￥${cookieArr[i].price.substring(1,cookieArr[i].price.length)*cookieArr[i].num}.00</p>
                        <div class="numbox">
                            <span>数量</span>
                            <button class="btn">-</button>
                            <b>${cookieArr[i].num}</b>
                            <button class="btn">+</button>
                        </div>
            </div>
        </div>`
        }
        $(".shopcont .shops").html(str);
    }

    //复选框的点击效果
    function isCheck(){
        $("input").attr("checked",true);
        //全选效果
        $(".checkall").on("click","input",function(){
            if($(this).is(":checked")){
                $("input").each(function(){
                    $(this).prop({"checked":true,"name":"bechecked"});
                    // $(this).prop("checked",true);
                })
                
            }else{
                $("input").each(function(){
                    $(this).removeAttr("checked",false);
                    $(this).removeAttr("name","bechecked");
                })
            }
            totalPrice()
            checkLen();
            
        })
        //部分商品选择
        $(".shops").on("click","input",function(){
            if($(this).is(":checked")){
                $(this).prop({"checked":true,"name":"bechecked"});
            }else{
                $(this).removeAttr("checked",false);
                $(this).removeAttr("name","bechecked");
                $(".checkall input").prop("checked",false);
                totalPrice()
            }
            checkLen();
            totalPrice();
        })
       checkLen();
       totalPrice();
       
    }
    //选中的商品数
    function checkLen(){
       var len = $(".shops input[name='bechecked']").length
        $(".checkall p").find("em").html(len)
        if(len == 0){
            $(".checkall input").removeAttr("checked",false)
        }
        //购物车商品总数
        $(".shopcont h2").find("span").html($(".shops .cartbox").length)
        $(".top_right .shop_car_icon").html($(".shops .cartbox").length)
    }

    //计算商品总金额
    function totalPrice(){
            var sum = 0;
            var price;
            $(".shops input").each(function(){
                 if($(this).is(":checked")){
                    var pricenode = $(this).siblings(".optionbox").find(".price").html();
                price = Number(pricenode.substring(1,pricenode.length));
                sum += price;
                }
            })
            // alert(sum)
            $(".pricebox").find("span").html(sum+".00")
    }

    //商品加减
    function shopNum(){
       $(".shops").on("click",".btn",function(){
          var imgSrc = $(this).parent().parent().siblings(".imgbox").find("img").attr("src");
          var imgSrc2 = imgSrc.substring(3,imgSrc.length);
        //   alert(imgSrc)
        /* bug首页加载的会公用一个num刷新传递给第一个 */
        /* ../ 的图片没有问题，images开头的不可以 */
        /* 此bug已解决 */
          var cookieArr = JSON.parse($.cookie("goods"));
          var index = cookieArr.findIndex(item => item.imgSrc == imgSrc)
          if($(this).html() == "+"){
              cookieArr[index].num++;
          }else{
           
              cookieArr[index].num == 1? alert("数量不能再少了") : cookieArr[index].num--
          }
          $.cookie("goods",JSON.stringify(cookieArr),{
              expires:7
          })
          $(this).siblings("b").html(cookieArr[index].num);
          $(this).parent().siblings(".price").html("￥"+cookieArr[index].price.substring(1,cookieArr[index].price.length)*cookieArr[index].num+".00")
          totalPrice();
       })
    }

    //商品删除
    function deleteshop(){
        $(".shops").on("click",".iconfont",function(){
            if($(this).children("em").html() == "编辑"){
                alert("此功能暂未开发，敬请期待")
            }
            if($(this).children("em").html() == "删除"){
                
                var imgSrc = $(this).parent().siblings(".imgbox").find("img").remove().attr("src");
                // alert(imgSrc)
                var cookieArr = JSON.parse($.cookie("goods"));
                for(var i = 0; i < cookieArr.length;i++){
                    if(cookieArr[i].imgSrc == imgSrc){
                        cookieArr.splice(i,1);
                        $(this).parents(".cartbox").remove();
                        
                        break;
                    }
                }
                if(!cookieArr.length){
                    $.cookie("goods",null);
                    isCont()
                }else{
                    $.cookie("goods",JSON.stringify(cookieArr),{
                        expires:7
                    })
                    
                }
                // car()
                checkLen();
                totalPrice()
            }
        })
    }

    //商品结算
    function payAll(){
        $(".pricebox .pay").click(function(){
            if($(".top_right .login").html() == "匡威欢迎您"){
                if($(".shops input[name='bechecked']").length == 0){
                    alert("您还没有选择要付款的商品")
                }else{
                    alert("付款成功");
                    $(".shops input[name='bechecked']").each(function(){
                        var imgSrc = $(this).siblings(".imgbox").find("img").attr("src");
                        var cookieArr = JSON.parse($.cookie("goods"))
                        for(var i = 0; i < cookieArr.length;i++){
                                if(cookieArr[i].imgSrc == imgSrc){
                                cookieArr.splice(i,1);
                                $(this).parents(".cartbox").remove();
                               
                                break;  
                            }
                        }
                        if(!$.cookie("goods").length || JSON.parse($.cookie("goods")).length == 1){
                            $.cookie("goods",null)
                            isCont()
                        }else{
                            // alert(JSON.parse($.cookie("goods")).length)
                            $.cookie("goods",JSON.stringify(cookieArr),{expires:7})
                        }
                        // isCont();
                        checkLen()
                    })
    
                }
               
                totalPrice()
            }else{
                alert("您需要先登录才能付款哦")
            }
            
        })
    }
        
    

    return{
        isCont:isCont,
        car:car,
        isCheck:isCheck,
        shopNum:shopNum,
        deleteshop:deleteshop,
        payAll:payAll
    }
});