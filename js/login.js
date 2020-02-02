define(["jquery"], function($){
   //验证码.
   function code(){
    function codeOfWord(n) {
        //n为生成的验证码位数
        var arr = [];
        for (var i = 0; i < n; i++) {
            var tmp = parseInt(Math.random() * 123);
            if (tmp >= 0 && tmp <= 9) {
                arr.push(tmp);
            } else if (tmp >= 97 && tmp <= 122 || tmp >= 65 && tmp <= 90) {
                arr.push(String.fromCharCode(tmp));
            } else {
                //没有用的数字
                i--;
            }
        }
        return arr.join("");
    }
    $(".login_right .codebox").html(codeOfWord(3));
    $(".reg_cen .codebox").html(codeOfWord(3));
    $(".login_right .codebox,.reg_cen .codebox").click(function(){
        $(".login_right .codebox,.reg_cen .codebox").html(codeOfWord(3))
    })

   }

   //登录转注册
   function reg(){
       $(".login_block").click(function(){
           $("#hidden_top_login").fadeOut(200);
           $(".register").fadeIn(200);
       })
   }
   //注册表单验证
   function reg_check(){
       //输入框清空
    if($(".register input").val()){
        $(".register input").focus(function(){
            $(this).val("")
        })
    }
    //手机号码
    $(".register .phone").blur(function(){
        if($(this).val().length != 11){
            $(".register .reg_phone_info").css({
                color:"red",
                display:"block"
            }).html("请输入正确的手机号码")
        }else{
            if(/^[1\d{10}]/.test($(this).val())){
                $(".register .reg_phone_info").css({
                    color:"#000",
                    display:"block"
                }).html("✔")
            }else{
                $(".register .reg_phone_info").css({
                    color:"red",
                    display:"block"
                }).html("请输入正确的手机号码")
            }
        }
    })
    //邮箱
    $(".reg_cen .email").blur(function(){
        if(/^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/.test($(this).val())){
            $(".reg_cen .reg_email_info").css({
                display:"block",
                color:"#000"
            }).html("✔")
        }else{
            $(".reg_cen .reg_email_info").css({
                display:"block",
                color:"red"
            }).html("请检查邮箱格式是否正确")
        }
    })
    //输入密码
    $(".reg_left .pwd").blur(function(){
        if($(this).val().length < 6 || $(this).val().length >20){
            $(".reg_left .reg_pwd_info").css({
                color:"red",
                display:"block"
            }).html("密码长度至少为6位")
        }else{
            $(".reg_left .reg_pwd_info").css({
                color:"#000",
                display:"block"
            }).html("✔")
        }
    })
    //确认密码
    $(".reg_cen .repwd").blur(function(){
        if($(this).val() != $(".reg_left .pwd").val() || $(this).val().length == 0){
            // alert(5)
            $(".reg_cen .reg_repwd_info").css({
                color:"red",
                display:"block"
            }).html("两次密码不一致")
        }else{
            $(".reg_cen .reg_repwd_info").css({
                display:"block",
                color:"#000"
            }).html("✔");
        }
    })
    //验证码
    $(".reg_cen .checkcode").blur(function(){
        if($(this).val() != $(".reg_cen .codebox").html()){
            $(".reg_cen .checkcode_info").css({
                display:"block",
                color:"red"
            }).html("验证码输入不正确");
           code();
        }else{
            $(".reg_cen .checkcode_info").css({
                display:"block",
                color:"#000"
            }).html("✔");
        }
    })
     
    //注册
    $(".reg_btn").click(function(){
       //协议
       if($("#check_rule").is(':checked') == false){
           $(".reg_btn_info").css({
               display:"block",
               color:"red"
           }).html("同意协议，立即注册")
           $(this).css({
            background:"#ccc"
        })
       }else{
        $(".reg_btn_info").css({
            display:"none"
        })
        $(this).css({
            background:"#000"
        })
        if($(".reg_cen .reg_email_info,.register .reg_phone_info,.reg_left .reg_pwd_info,.reg_cen .reg_repwd_info,.reg_cen .checkcode_info").html() == "✔"){
            $.ajax({
                type:"post",
                url:"html/register.php"? "html/register.php":"register.php",
                data:{
                    phone:$(".reg_left .phone").val(),
                    email:$(".reg_cen .email").val(),
                    password:$(".reg_left .pwd").val()
                },
                success:function(result){
                    alert(result);
                },
                error:function(msg){
                    console.log(msg)
                }
            })
        }else{
            alert("您的注册信息貌似并不完整，请检查")
        }
       }
    })
   
   }

   //登录
   function login_check(){
        //输入框清空
    if($(".login_right input").val()){
        $(".login input").focus(function(){
            $(this).val("")
        })
    }
    //表单验证
    //用户名
    $(".login_right .phone").blur(function(){
       if(/^[1\d{10}]/.test($(this).val()) || /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/.test($(this).val())){
           $(".login_right .login_phone_info").css("display","none")
       }else{
        $(".login_right .login_phone_info").css({
            display:"block",
            color:"red"
        }).html("用户名格式不正确")
       }
    })
    //密码
    $(".login_right .pwd").blur(function(){
        if($(this).val().length < 6){
            $(".login_right .login_pwd_info").css({
                display:"block",
                color:"red"
            }).html("密码格式不正确")
        }else{
            $(".login_right .login_pwd_info").css("display","none")
        }
    })
    //验证码
    $(".login_right .checkcode").blur(function(){
        if($(this).val() != $(".login_right .codebox").html()){
            $(".login_right .checkcode_info").css({
                display:"block",
                color:"red"
            }).html("验证码不正确");
            code();
        }else{
            $(".login_right .checkcode_info").css({
                display:"none"
            })
        }
    })

    //登录按钮
    $(".login_right #login_btn").click(function(){
       
            if($(".login_right .login_phone_info,.login_right .login_pwd_info,.login_right .checkcode_info").css("display") == "none" && $(".login_right input").val() != ""){
               $.ajax({
                   type:"post",
                   url:"html/login.php"?"html/login.php":"login.php",
                   data:{
                       username:$(".login_right .phone").val(),
                       password:$(".login_right .pwd").val()
                   },
                   success:function(res){
                    if(res == "登录成功"){
                        $(".top_right .login").html("匡威欢迎您")
                    }
                    alert(res);
                   },
                   error:function(msg){
                       console.log(msg)
                   }
               })
            }else{
                alert("您的登录信息好像不太完整")
            }
        
    })
   }

   return {
       code:code,
       reg:reg,
       reg_check:reg_check,
       login_check:login_check
   }
   
});