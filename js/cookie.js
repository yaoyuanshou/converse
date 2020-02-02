/* 
cookie函数的用法
通过触发条件删除cookie
window.onload = function(){
                var btn = document.getElementsByTagName("button")[0];
                btn.onclick = function(){
                //只需要传入cookie名，后面必须写null
                    cookie("username", null);
                }
            } 
            //只写cookie名和cookie值
            cookie("username", "yys");
            创建一个有可选项的cookie，可选项写在对象里面
            cookie("username2", "yys2",{
                expires:7
            });
            通过cookie名取出cookie值
            alert(cookie("username"));
            alert(cookie("username2"));
    
*/
function cookie(name){
    switch(arguments.length){
        case 1:
            return getCookie(name);
            break;
        case 2:
            arguments[1] == null ?  removeCookie(name) :  setCookie(name, arguments[1], {});
            break;
        case 3:
            setCookie(name, arguments[1], arguments[2]);
            break;
        default:
            break;
    }
}




/* 
    设置cookie
    name为cookie名， value为cookie值
    expires为cookie有效时间
    path为路径
    domain为域名
    secure为安全方式
*/
function setCookie(name, value, { expires, path, domain, secure }) {
    var cookieStr = encodeURIComponent(name) + "=" + encodeURIComponent(value);
    if (expires) {
        cookieStr += ";expires=" + getDate(expires);
    }
    if (path) {
        cookieStr += ";path=" + path;
    }
    if (domain) {
        cookieStr += ";domain=" + domain;
    }
    if (secure) {
        cookieStr += ";secure=" + secure;
    }
    document.cookie = cookieStr;
}

/* 
    删除cookie
*/
function removeCookie(name) {
    document.cookie = encodeURIComponent(name) + "=;expires=" + new Date(0);
}

/* 
    获取cookie值
*/
function getCookie(name) {
    var cookieStr = decodeURIComponent(document.cookie);
    //查找第一次出现的位置
    var start = cookieStr.indexOf(name);
    if (start == -1) {
        return null;
    } else {
        //查找从传入name开始的，第一次结束的位置
        var end = cookieStr.indexOf(";", start);
        if (end == -1) {
            end = cookieStr.length;
        }
        //提取字符串
        var str = cookieStr.substring(start, end);
        var arr = str.split("=");
        return arr[1];
    }
}

//设置n天后的时间
function getDate(n) {
    var d = new Date();
    var day = d.getDate();
    d.setDate(day + n);
    return d;
}